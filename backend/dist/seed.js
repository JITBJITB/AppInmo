"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("@nestjs/typeorm");
const unidad_entity_1 = require("./entities/unidad.entity");
const ficha_venta_entity_1 = require("./entities/ficha-venta.entity");
const broker_company_entity_1 = require("./entities/broker-company.entity");
const proyecto_entity_1 = require("./entities/proyecto.entity");
const adicional_entity_1 = require("./entities/adicional.entity");
const cliente_entity_1 = require("./entities/cliente.entity");
const ficha_cliente_entity_1 = require("./entities/ficha-cliente.entity");
const ficha_adicional_entity_1 = require("./entities/ficha-adicional.entity");
const usuario_entity_1 = require("./entities/usuario.entity");
const broker_proyecto_entity_1 = require("./entities/broker-proyecto.entity");
const roles_enum_1 = require("./auth/roles.enum");
const estado_ficha_enum_1 = require("./sales/enums/estado-ficha.enum");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const brokerCompanyRepo = app.get((0, typeorm_1.getRepositoryToken)(broker_company_entity_1.BrokerCompany));
    const proyectoRepo = app.get((0, typeorm_1.getRepositoryToken)(proyecto_entity_1.Proyecto));
    const unidadRepo = app.get((0, typeorm_1.getRepositoryToken)(unidad_entity_1.Unidad));
    const adicionalRepo = app.get((0, typeorm_1.getRepositoryToken)(adicional_entity_1.Adicional));
    const clienteRepo = app.get((0, typeorm_1.getRepositoryToken)(cliente_entity_1.Cliente));
    const fichaVentaRepo = app.get((0, typeorm_1.getRepositoryToken)(ficha_venta_entity_1.FichaVenta));
    const fichaClienteRepo = app.get((0, typeorm_1.getRepositoryToken)(ficha_cliente_entity_1.FichaCliente));
    const fichaAdicionalRepo = app.get((0, typeorm_1.getRepositoryToken)(ficha_adicional_entity_1.FichaAdicional));
    const usuarioRepo = app.get((0, typeorm_1.getRepositoryToken)(usuario_entity_1.Usuario));
    const brokerProyectoRepo = app.get((0, typeorm_1.getRepositoryToken)(broker_proyecto_entity_1.BrokerProyecto));
    console.log('Starting seed...');
    const companyRut = '77.077.181-0';
    let brokerCompany = await brokerCompanyRepo.findOne({ where: { rut: companyRut } });
    if (!brokerCompany) {
        console.log('Creating BrokerCompany...');
        brokerCompany = await brokerCompanyRepo.save({
            nombre: 'Inmobiliaria Vista San Martin SPA',
            rut: companyRut,
            direccion: 'San Martin (Referencial)',
            contacto_nombre: 'Contacto Inmobiliaria'
        });
    }
    else {
        console.log('BrokerCompany already exists.');
    }
    const brokerEmail = 'contacto@vistasanmartin.cl';
    let brokerUser = await usuarioRepo.findOne({ where: { email: brokerEmail } });
    if (!brokerUser) {
        console.log('Creating Broker User for Company...');
        brokerUser = await usuarioRepo.save({
            nombre: 'Vendedor Vista San Martin',
            email: brokerEmail,
            passwordHash: 'password123',
            rol: roles_enum_1.UserRole.BROKER_EXTERNO,
            brokerCompany: brokerCompany
        });
    }
    const fictitiousClientRut = '12.345.678-9';
    let fictitiousClient = await clienteRepo.findOne({ where: { rut: fictitiousClientRut } });
    if (!fictitiousClient) {
        console.log('Creating Fictitious Client Juan Perez...');
        fictitiousClient = await clienteRepo.save({
            nombre1: 'Juan',
            nombre2: 'Andres',
            apellido1: 'Perez',
            apellido2: 'Gonzalez',
            nombreCompleto: 'Juan Andres Perez Gonzalez',
            rut: fictitiousClientRut,
            email: 'juan.perez@example.com',
            telefono: '+56912345678',
            fechaNacimiento: new Date('1985-05-15'),
            estadoCivil: 'Casado',
            profesion: 'Ingeniero',
            renta: 1500000,
            nacionalidad: 'Chilena',
            direccionCalle: 'Av. Libertador',
            direccionNumero: '1234',
            direccionComuna: 'Santiago',
            direccionCiudad: 'Santiago',
            direccionRegion: 'Metropolitana',
            direccionPais: 'Chile'
        });
    }
    else {
        console.log('Fictitious Client already exists.');
    }
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
        await brokerProyectoRepo.save({
            broker: brokerUser,
            proyecto: proyecto
        });
    }
    else {
        console.log('Proyecto already exists.');
    }
    const data = [
        { depto: "201", estado: "OFERTA", estac: "12", bod: "4", precio: 2850, cliente: "Roberto Diaz", fechaReserva: "2024-01-15" },
        { depto: "305", estado: "VENTA", estac: null, bod: null, precio: 3100, cliente: null, fechaReserva: null },
        { depto: "401", estado: "BLOQUEADO", estac: "15", bod: null, precio: 2900, cliente: "Maria Jose", fechaReserva: "2024-02-20" }
    ];
    for (const item of data) {
        console.log(`Processing unit ${item.depto}...`);
        let unidad = await unidadRepo.findOne({ where: { nombre: item.depto, proyecto: { id: proyecto.id } } });
        let estadoDb = 'Disponible';
        if (item.estado === 'OFERTA')
            estadoDb = 'Vendida';
        else if (item.estado === 'BLOQUEADO')
            estadoDb = 'Reservada';
        else if (item.estado === 'VENTA')
            estadoDb = 'Disponible';
        if (!unidad) {
            const piso = item.depto.length === 3 ? parseInt(item.depto.substring(0, 1)) : parseInt(item.depto.substring(0, 2));
            unidad = await unidadRepo.save({
                proyecto: proyecto,
                nombre: item.depto,
                tipologia: 'DEPTO',
                valorUf: item.precio,
                piso: piso,
                estado: estadoDb,
                metrosCuadrados: 50
            });
        }
        else {
            if (unidad.estado !== estadoDb) {
                unidad.estado = estadoDb;
                await unidadRepo.save(unidad);
            }
        }
        if (estadoDb === 'Vendida' || estadoDb === 'Reservada') {
            let cliente = null;
            if (item.cliente) {
                const clientEmail = `${item.cliente.toLowerCase().replace(' ', '.')}@test.com`;
                cliente = await clienteRepo.findOne({ where: { email: clientEmail } });
                if (!cliente) {
                    console.log(`Creating Client ${item.cliente}...`);
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
                let ficha = await fichaVentaRepo.findOne({
                    where: { unidad: { id: unidad.id }, estadoFicha: estadoDb === 'Vendida' ? estado_ficha_enum_1.EstadoFicha.PROMESA : estado_ficha_enum_1.EstadoFicha.RESERVA }
                });
                if (!ficha) {
                    console.log(`Creating FichaVenta for ${item.depto}...`);
                    ficha = await fichaVentaRepo.save({
                        unidad: unidad,
                        agente: brokerUser,
                        estadoFicha: estadoDb === 'Vendida' ? estado_ficha_enum_1.EstadoFicha.PROMESA : estado_ficha_enum_1.EstadoFicha.RESERVA,
                        valorTotalUf: unidad.valorUf,
                        folio: `FV-${unidad.nombre}-${Date.now()}`,
                        createdAt: item.fechaReserva ? new Date(item.fechaReserva) : new Date()
                    });
                    await fichaClienteRepo.save({
                        fichaVenta: ficha,
                        cliente: cliente,
                        rol: 'Principal'
                    });
                }
                if (item.estac) {
                    const estacName = `E-${item.estac}`;
                    let estac = await adicionalRepo.findOne({ where: { nombre: estacName, proyecto: { id: proyecto.id }, tipo: 'Estacionamiento' } });
                    if (!estac) {
                        estac = await adicionalRepo.save({
                            proyecto: proyecto,
                            tipo: 'Estacionamiento',
                            nombre: estacName,
                            valorUf: 350,
                            estado: 'Asignado'
                        });
                    }
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
                            valorUf: 100,
                            estado: 'Asignado'
                        });
                    }
                    const existingLink = await fichaAdicionalRepo.findOne({ where: { fichaVenta: { id: ficha.id }, adicional: { id: bod.id } } });
                    if (!existingLink) {
                        await fichaAdicionalRepo.save({
                            fichaVenta: ficha,
                            adicional: bod
                        });
                    }
                }
            }
        }
        else {
        }
    }
    console.log('Seed completed successfully.');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map