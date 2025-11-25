import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';
import { FichaVenta } from './entities/ficha-venta.entity';
import { BrokerCompany } from './entities/broker-company.entity';
import { Proyecto } from './entities/proyecto.entity';
import { Adicional } from './entities/adicional.entity';
import { Cliente } from './entities/cliente.entity';
import { FichaCliente } from './entities/ficha-cliente.entity';
import { FichaAdicional } from './entities/ficha-adicional.entity';
import { Usuario } from './entities/usuario.entity';
import { BrokerProyecto } from './entities/broker-proyecto.entity';
import { UserRole } from './auth/roles.enum';
import { Repository } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    // Inject Repositories
    const brokerCompanyRepo = app.get<Repository<BrokerCompany>>(getRepositoryToken(BrokerCompany));
    const proyectoRepo = app.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
    const unidadRepo = app.get<Repository<Unidad>>(getRepositoryToken(Unidad));
    const adicionalRepo = app.get<Repository<Adicional>>(getRepositoryToken(Adicional));
    const clienteRepo = app.get<Repository<Cliente>>(getRepositoryToken(Cliente));
    const fichaVentaRepo = app.get<Repository<FichaVenta>>(getRepositoryToken(FichaVenta));
    const fichaClienteRepo = app.get<Repository<FichaCliente>>(getRepositoryToken(FichaCliente));
    const fichaAdicionalRepo = app.get<Repository<FichaAdicional>>(getRepositoryToken(FichaAdicional));
    const usuarioRepo = app.get<Repository<Usuario>>(getRepositoryToken(Usuario));
    const brokerProyectoRepo = app.get<Repository<BrokerProyecto>>(getRepositoryToken(BrokerProyecto));

    console.log('Starting seed...');

    // PASO 1: Crear Empresa (BrokerCompany)
    const companyRut = '77.077.181-0';
    let brokerCompany = await brokerCompanyRepo.findOne({ where: { rut: companyRut } });
    if (!brokerCompany) {
        console.log('Creating BrokerCompany...');
        brokerCompany = await brokerCompanyRepo.save({
            nombre: 'Inmobiliaria Vista San Martin SPA',
            rut: companyRut,
            direccion: 'San Martin (Referencial)', // Using project address as company address for now or generic
            contacto_nombre: 'Contacto Inmobiliaria'
        });
    } else {
        console.log('BrokerCompany already exists.');
    }

    // Create a dummy Broker User for this company to link to Project
    const brokerEmail = 'contacto@vistasanmartin.cl';
    let brokerUser = await usuarioRepo.findOne({ where: { email: brokerEmail } });
    if (!brokerUser) {
        console.log('Creating Broker User for Company...');
        brokerUser = await usuarioRepo.save({
            nombre: 'Vendedor Vista San Martin',
            email: brokerEmail,
            passwordHash: 'password123', // Dummy password
            rol: UserRole.BROKER_EXTERNO, // Assuming this role fits
            brokerCompany: brokerCompany
        });
    }

    // PASO 2: Crear Proyecto
    const projectName = 'Edificio Vista San Martin';
    let proyecto = await proyectoRepo.findOne({ where: { nombre: projectName } });
    if (!proyecto) {
        console.log('Creating Proyecto...');
        proyecto = await proyectoRepo.save({
            nombre: projectName,
            direccion: 'San Martin (Referencial)',
            comuna: 'Santiago',
            imagenPrincipalUrl: 'https://via.placeholder.com/800x600'
        });

        // Link Project to Company via BrokerProyecto
        await brokerProyectoRepo.save({
            broker: brokerUser,
            proyecto: proyecto
        });
    } else {
        console.log('Proyecto already exists.');
    }

    // PASO 3: Lógica de Importación de Unidades
    const data = [
        { depto: "201", estado: "OFERTA", estac: "12", bod: "4", precio: 2850, cliente: "Roberto Diaz", fechaReserva: "2024-01-15" },
        { depto: "305", estado: "VENTA", estac: null, bod: null, precio: 3100, cliente: null, fechaReserva: null },
        { depto: "401", estado: "BLOQUEADO", estac: "15", bod: null, precio: 2900, cliente: "Maria Jose", fechaReserva: "2024-02-20" }
    ];

    for (const item of data) {
        console.log(`Processing unit ${item.depto}...`);

        // A. PROPIEDADES DE LA UNIDAD
        let unidad = await unidadRepo.findOne({ where: { nombre: item.depto, proyecto: { id: proyecto.id } } });

        // B. MAPEO DE ESTADOS
        // Transformación de "OFERTA" a "Vendida", "BLOQUEADO" a "Reservada", "VENTA" a "Disponible"
        let estadoDb = 'Disponible';
        if (item.estado === 'OFERTA') estadoDb = 'Vendida';
        else if (item.estado === 'BLOQUEADO') estadoDb = 'Reservada';
        else if (item.estado === 'VENTA') estadoDb = 'Disponible';

        if (!unidad) {
            const piso = item.depto.length === 3 ? parseInt(item.depto.substring(0, 1)) : parseInt(item.depto.substring(0, 2));

            unidad = await unidadRepo.save({
                proyecto: proyecto,
                nombre: item.depto,
                tipologia: 'DEPTO',
                valorUf: item.precio,
                piso: piso,
                estado: estadoDb,
                metrosCuadrados: 50 // Default value as it's not in JSON
            });
        } else {
            // Update state if needed
            if (unidad.estado !== estadoDb) {
                unidad.estado = estadoDb;
                await unidadRepo.save(unidad);
            }
        }

        // C. ADICIONALES & D. CLIENTES (Only if Sold or Reserved)
        if (estadoDb === 'Vendida' || estadoDb === 'Reservada') {

            // Find or Create Client
            let cliente: Cliente | null = null;
            if (item.cliente) {
                const clientEmail = `${item.cliente.toLowerCase().replace(' ', '.')}@test.com`;
                cliente = await clienteRepo.findOne({ where: { email: clientEmail } });
                if (!cliente) {
                    console.log(`Creating Client ${item.cliente}...`);
                    // Generate a pseudo-random RUT to avoid unique constraint violations
                    const randomRut = `${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 9)}`;
                    cliente = await clienteRepo.save({
                        nombreCompleto: item.cliente,
                        rut: randomRut,
                        email: clientEmail,
                        telefono: '+56900000000'
                    });
                }
            }

            if (cliente) {
                // Check if FichaVenta exists
                let ficha = await fichaVentaRepo.findOne({
                    where: { unidad: { id: unidad.id }, estadoFicha: estadoDb === 'Vendida' ? 'Promesa' : 'Reserva' } // Mapping DB state to Ficha state roughly
                });

                if (!ficha) {
                    console.log(`Creating FichaVenta for ${item.depto}...`);
                    ficha = await fichaVentaRepo.save({
                        unidad: unidad,
                        agente: brokerUser,
                        estadoFicha: estadoDb === 'Vendida' ? 'Promesa' : 'Reserva', // Mapping logic
                        valorTotalUf: unidad.valorUf,
                        folio: `FV-${unidad.nombre}-${Date.now()}`,
                        createdAt: item.fechaReserva ? new Date(item.fechaReserva) : new Date()
                    });

                    // Link Client to Ficha
                    await fichaClienteRepo.save({
                        fichaVenta: ficha,
                        cliente: cliente,
                        rol: 'Principal'
                    });
                }

                // C. ADICIONALES (Linked via Ficha)
                if (item.estac) {
                    const estacName = `E-${item.estac}`;
                    let estac = await adicionalRepo.findOne({ where: { nombre: estacName, proyecto: { id: proyecto.id }, tipo: 'Estacionamiento' } });
                    if (!estac) {
                        estac = await adicionalRepo.save({
                            proyecto: proyecto,
                            tipo: 'Estacionamiento',
                            nombre: estacName,
                            valorUf: 350, // Default price
                            estado: 'Asignado'
                        });
                    }

                    // Link to Ficha
                    const existingLink = await fichaAdicionalRepo.findOne({ where: { fichaVenta: { id: ficha.id }, adicional: { id: estac.id } } });
                    if (!existingLink) {
                        await fichaAdicionalRepo.save({
                            fichaVenta: ficha,
                            adicional: estac
                        });
                    }
                }

                if (item.bod) {
                    const bodName = `B-${item.bod}`;
                    let bod = await adicionalRepo.findOne({ where: { nombre: bodName, proyecto: { id: proyecto.id }, tipo: 'Bodega' } });
                    if (!bod) {
                        bod = await adicionalRepo.save({
                            proyecto: proyecto,
                            tipo: 'Bodega',
                            nombre: bodName,
                            valorUf: 100, // Default price
                            estado: 'Asignado'
                        });
                    }

                    // Link to Ficha
                    const existingLink = await fichaAdicionalRepo.findOne({ where: { fichaVenta: { id: ficha.id }, adicional: { id: bod.id } } });
                    if (!existingLink) {
                        await fichaAdicionalRepo.save({
                            fichaVenta: ficha,
                            adicional: bod
                        });
                    }
                }
            }
        } else {
            // For "Disponible" units, we might still want to create the additionals if they exist in the row, 
            // but we can't link them to the unit directly as discussed. 
            // However, the provided "VENTA" example has null parking/storage, so we are safe for now.
            // If we needed to, we would just create the Adicional entity with state 'Disponible'.
        }
    }

    console.log('Seed completed successfully.');
    await app.close();
}
bootstrap();
