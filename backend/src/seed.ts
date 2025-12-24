import 'dotenv/config';
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
import { EstadoFicha } from './sales/enums/estado-ficha.enum';
import * as fs from 'fs';
import * as path from 'path';
import { Departamento } from './projects/entities/departamento.entity';

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
    const departamentoRepo = app.get<Repository<Departamento>>(getRepositoryToken(Departamento));

    console.log('Starting seed...');

    // ---------------------------------------------------------
    // 1. SETUP BÁSICO (Empresa y Broker)
    // ---------------------------------------------------------
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

    const brokerEmail = 'contacto@vistasanmartin.cl';
    let brokerUser = await usuarioRepo.findOne({ where: { email: brokerEmail } });
    if (!brokerUser) {
        console.log('Creating Broker User...');
        brokerUser = await usuarioRepo.save({
            nombre: 'Vendedor Vista San Martin',
            email: brokerEmail,
            passwordHash: 'password123',
            rol: UserRole.BROKER_EXTERNO,
            brokerCompany: brokerCompany
        });
    }

    // ---------------------------------------------------------
    // 2. PROYECTO: Edificio Teatinos 750
    // ---------------------------------------------------------
    const projectName = "Edificio Teatinos 750";
    let proyecto = await proyectoRepo.findOne({ where: { nombre: projectName } });

    if (!proyecto) {
        console.log(`Creating Project: ${projectName}...`);
        proyecto = await proyectoRepo.save({
            nombre: projectName,
            direccion: "Teatinos 750, Santiago",
            comuna: "Santiago",
            imagenPrincipalUrl: "/uploads/teatinos-750.jpg"
            // Nota: El estado 'entrega_inmediata' no existe en la entidad Proyecto, se omite.
        });

        // Asignar broker al proyecto
        await brokerProyectoRepo.save({
            broker: brokerUser,
            proyecto: proyecto
        });
    } else {
        console.log(`Project ${projectName} already exists.`);
    }

    // ---------------------------------------------------------
    // 3. CARGA DE DATOS DESDE JSON NO HARDCODEADO
    // ---------------------------------------------------------
    const jsonPath = path.join(__dirname, 'seed', 'data', 'teatinos.json');

    if (fs.existsSync(jsonPath)) {
        console.log(`Reading data from ${jsonPath}...`);
        const jsonContent = fs.readFileSync(jsonPath, 'utf8');
        const teatinosData = JSON.parse(jsonContent);

        for (const item of teatinosData) {
            // console.log(`Processing departamento ${item.depto}...`);

            // Parseo de Piso logic (reused for robustness)
            let pisoNum = 0;
            if (!item.piso || item.piso.toString().trim() === '') {
                const match = item.depto.match(/D-S?(\d+)/);
                if (match) {
                    const deptoNumber = match[1];
                    if (deptoNumber.length >= 3) {
                        pisoNum = parseInt(deptoNumber.substring(0, 2));
                    } else {
                        pisoNum = parseInt(deptoNumber.charAt(0));
                    }
                }
            } else if (item.piso.toString().startsWith('S')) {
                pisoNum = parseInt(item.piso.substring(1));
            } else {
                pisoNum = parseInt(item.piso);
            }

            // --- A. Crear Departamento (NUEVO) ---
            let departamento = await departamentoRepo.findOne({
                where: { depto: item.depto, proyecto: { id: proyecto.id } }
            });

            if (!departamento) {
                departamento = new Departamento();
                departamento.depto = item.depto;
                departamento.estado = item.estado;
                departamento.piso = pisoNum;
                departamento.precio = parseFloat(item.precio); // Convert to decimal/float
                departamento.cliente = item.cliente || null;
                departamento.proyecto = proyecto;

                await departamentoRepo.save(departamento);
            } else {
                // Optional: update values if needed
                departamento.estado = item.estado;
                departamento.precio = parseFloat(item.precio);
                departamento.cliente = item.cliente || null;
                await departamentoRepo.save(departamento);
            }

            // --- B. Crear Unidad (LEGACY - Para compatibilidad Frontend) ---

            // Determinar tipología basándose en el nombre
            let tipologia = 'DEPTO'; // Valor por defecto
            if (item.depto.includes('-S')) {
                tipologia = 'STUDIO';
            }

            // Mapeo de Estados para Unidad
            let estadoDb = 'Disponible';
            if (item.estado === 'VENTA') {
                estadoDb = 'Disponible';
            } else if (item.estado === 'OFERTA' || item.estado === 'BLOQUEADO') {
                estadoDb = 'Reservada';
            }

            let unidad = await unidadRepo.findOne({ where: { nombre: item.depto, proyecto: { id: proyecto.id } } });

            if (!unidad) {
                unidad = await unidadRepo.save({
                    proyecto: proyecto,
                    nombre: item.depto,
                    tipologia: tipologia,
                    valorUf: item.precio,
                    piso: pisoNum,
                    estado: estadoDb,
                    metrosCuadrados: 45 // Valor por defecto
                });
            } else {
                unidad.estado = estadoDb;
                unidad.valorUf = item.precio;
                unidad.piso = pisoNum;
                unidad.tipologia = tipologia;
                await unidadRepo.save(unidad);
            }
        }
    } else {
        console.warn(`JSON file not found at ${jsonPath}`);
    }

    console.log('Seed for Edificio Teatinos 750 (Departamentos & Unidades) completed successfully.');
    await app.close();
}
bootstrap();
