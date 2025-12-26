"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const departamento_entity_1 = require("./projects/entities/departamento.entity");
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
    const departamentoRepo = app.get((0, typeorm_1.getRepositoryToken)(departamento_entity_1.Departamento));
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
    const brokerEmail = 'contacto@vistasanmartin.cl';
    let brokerUser = await usuarioRepo.findOne({ where: { email: brokerEmail } });
    if (!brokerUser) {
        console.log('Creating Broker User...');
        brokerUser = await usuarioRepo.save({
            nombre: 'Vendedor Vista San Martin',
            email: brokerEmail,
            passwordHash: 'password123',
            rol: roles_enum_1.UserRole.BROKER_EXTERNO,
            brokerCompany: brokerCompany
        });
    }
    const projectName = "Edificio Teatinos 750";
    let proyecto = await proyectoRepo.findOne({ where: { nombre: projectName } });
    if (!proyecto) {
        console.log(`Creating Project: ${projectName}...`);
        proyecto = await proyectoRepo.save({
            nombre: projectName,
            direccion: "Teatinos 750, Santiago",
            comuna: "Santiago",
            imagenPrincipalUrl: "/uploads/teatinos-750.jpg"
        });
        await brokerProyectoRepo.save({
            broker: brokerUser,
            proyecto: proyecto
        });
    }
    else {
        console.log(`Project ${projectName} already exists.`);
    }
    const jsonPath = path.join(__dirname, 'seed', 'data', 'teatinos.json');
    if (fs.existsSync(jsonPath)) {
        console.log(`Reading data from ${jsonPath}...`);
        const jsonContent = fs.readFileSync(jsonPath, 'utf8');
        const teatinosData = JSON.parse(jsonContent);
        for (const item of teatinosData) {
            let pisoNum = 0;
            if (!item.piso || item.piso.toString().trim() === '') {
                const match = item.depto.match(/D-S?(\d+)/);
                if (match) {
                    const deptoNumber = match[1];
                    if (deptoNumber.length >= 3) {
                        pisoNum = parseInt(deptoNumber.substring(0, 2));
                    }
                    else {
                        pisoNum = parseInt(deptoNumber.charAt(0));
                    }
                }
            }
            else if (item.piso.toString().startsWith('S')) {
                pisoNum = parseInt(item.piso.substring(1));
            }
            else {
                pisoNum = parseInt(item.piso);
            }
            let departamento = await departamentoRepo.findOne({
                where: { depto: item.depto, proyecto: { id: proyecto.id } }
            });
            if (!departamento) {
                departamento = new departamento_entity_1.Departamento();
                departamento.depto = item.depto;
                departamento.estado = item.estado;
                departamento.piso = pisoNum;
                departamento.precio = parseFloat(item.precio);
                departamento.cliente = item.cliente || null;
                departamento.proyecto = proyecto;
                await departamentoRepo.save(departamento);
            }
            else {
                departamento.estado = item.estado;
                departamento.precio = parseFloat(item.precio);
                departamento.cliente = item.cliente || null;
                await departamentoRepo.save(departamento);
            }
            let tipologia = 'DEPTO';
            if (item.depto.includes('-S')) {
                tipologia = 'STUDIO';
            }
            let estadoDb = 'Disponible';
            if (item.estado === 'VENTA') {
                estadoDb = 'Disponible';
            }
            else if (item.estado === 'OFERTA' || item.estado === 'BLOQUEADO') {
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
                    metrosCuadrados: 45
                });
            }
            else {
                unidad.estado = estadoDb;
                unidad.valorUf = item.precio;
                unidad.piso = pisoNum;
                unidad.tipologia = tipologia;
                await unidadRepo.save(unidad);
            }
        }
    }
    else {
        console.warn(`JSON file not found at ${jsonPath}`);
    }
    console.log('Seed for Edificio Teatinos 750 (Departamentos & Unidades) completed successfully.');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map