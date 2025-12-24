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
    const teatinosData = [
        { "depto": "D-201", "estado": "OFERTA", "piso": "2", "precio": 2511.02, "cliente": "RAMIREZ CANCHICA RODHELLY KARINNA" },
        { "depto": "D-202", "estado": "BLOQUEADO", "piso": "2", "precio": 2654.88, "cliente": null },
        { "depto": "D-204", "estado": "BLOQUEADO", "piso": "2", "precio": 3273.96, "cliente": null },
        { "depto": "D-205", "estado": "BLOQUEADO", "piso": "2", "precio": 3447.53, "cliente": null },
        { "depto": "D-206", "estado": "BLOQUEADO", "piso": "2", "precio": 3324.01, "cliente": null },
        { "depto": "D-207", "estado": "BLOQUEADO", "piso": "2", "precio": 3263.31, "cliente": null },
        { "depto": "D-208", "estado": "BLOQUEADO", "piso": "2", "precio": 3246.29, "cliente": null },
        { "depto": "D-209", "estado": "OFERTA", "piso": "2", "precio": 3174.30, "cliente": "MARTINEZ MOLINA ESTEBAN ISRAEL" },
        { "depto": "D-210", "estado": "VENTA", "piso": "2", "precio": 3239.90, "cliente": null },
        { "depto": "D-211", "estado": "VENTA", "piso": "2", "precio": 3239.90, "cliente": null },
        { "depto": "D-212", "estado": "VENTA", "piso": "2", "precio": 3236.80, "cliente": null },
        { "depto": "D-304", "estado": "VENTA", "piso": "3", "precio": 3304.01, "cliente": null },
        { "depto": "D-305", "estado": "OFERTA", "piso": "3", "precio": 3435.52, "cliente": "ESCALONA ORDENES SEBASTIAN MATIAS" },
        { "depto": "D-306", "estado": "VENTA", "piso": "3", "precio": 3355.23, "cliente": null },
        { "depto": "D-307", "estado": "BLOQUEADO", "piso": "3", "precio": 3215.88, "cliente": null },
        { "depto": "D-308", "estado": "OFERTA", "piso": "3", "precio": 3117.70, "cliente": "RETAMAL BARAHONA MACARENA ISIDORA" },
        { "depto": "D-309", "estado": "OFERTA", "piso": "3", "precio": 3255.00, "cliente": "MARTINEZ MOLINA ESTEBAN ISRAEL" },
        { "depto": "D-310", "estado": "VENTA", "piso": "3", "precio": 3318.08, "cliente": null },
        { "depto": "D-311", "estado": "OFERTA", "piso": "3", "precio": 3673.42, "cliente": "PEREIRA GARRETON CRISTOBAL ROBERTO" },
        { "depto": "D-312", "estado": "OFERTA", "piso": "3", "precio": 3666.64, "cliente": "MEWES ACHONDO MARTIN LUIS" },
        { "depto": "D-404", "estado": "OFERTA", "piso": "4", "precio": 3243.90, "cliente": "TAPIA VASQUEZ FERNANDO PATRICIO" },
        { "depto": "D-405", "estado": "BLOQUEADO", "piso": "4", "precio": 3479.60, "cliente": null },
        { "depto": "D-406", "estado": "VENTA", "piso": "4", "precio": 3355.23, "cliente": null },
        { "depto": "D-407", "estado": "OFERTA", "piso": "4", "precio": 3338.98, "cliente": "GONZALEZ WOLF NATASCHA ALEJANDRA" },
        { "depto": "D-408", "estado": "BLOQUEADO", "piso": "4", "precio": 3324.53, "cliente": null },
        { "depto": "D-409", "estado": "OFERTA", "piso": "4", "precio": 3579.44, "cliente": "MAZO MEZA VALENTIN JOSE" },
        { "depto": "D-410", "estado": "OFERTA", "piso": "4", "precio": 2972.06, "cliente": "ROSENKRANZ MARTIN MARIA JESUS" },
        { "depto": "D-411", "estado": "OFERTA", "piso": "4", "precio": 3111.66, "cliente": "RETAMAL BARAHONA MACARENA ISIDORA" },
        { "depto": "D-412", "estado": "OFERTA", "piso": "4", "precio": 3311.44, "cliente": "MENDEZ MEDINA NOHELANY" },
        { "depto": "D-504", "estado": "BLOQUEADO", "piso": "5", "precio": 3334.87, "cliente": null },
        { "depto": "D-505", "estado": "OFERTA", "piso": "5", "precio": 3431.37, "cliente": "PAREDES ARANCIBIA CARLOS ALBERTO" },
        { "depto": "D-506", "estado": "VENTA", "piso": "5", "precio": 3386.44, "cliente": null },
        { "depto": "D-507", "estado": "BLOQUEADO", "piso": "5", "precio": 3369.80, "cliente": null },
        { "depto": "D-508", "estado": "OFERTA", "piso": "5", "precio": 3209.34, "cliente": "ALIAGA GODOY MACARENA FERNANDA" },
        { "depto": "D-509", "estado": "OFERTA", "piso": "5", "precio": 3553.89, "cliente": "PEREZ MALDONADO EDUARDO ANDRES" },
        { "depto": "D-510", "estado": "VENTA", "piso": "5", "precio": 3348.66, "cliente": null },
        { "depto": "D-511", "estado": "OFERTA", "piso": "5", "precio": 3684.36, "cliente": "UROCUR SOCIEDAD MEDICA LIMITADA" },
        { "depto": "D-512", "estado": "OFERTA", "piso": "5", "precio": 3730.84, "cliente": "OSSA OLLARZU MANUEL ALBERTO" },
        { "depto": "D-604", "estado": "OFERTA", "piso": "6", "precio": 3484.69, "cliente": "FIGUEROA TOLOSA LORETO ALEJANDRA" },
        { "depto": "D-605", "estado": "BLOQUEADO", "piso": "6", "precio": 3511.67, "cliente": null },
        { "depto": "D-606", "estado": "BLOQUEADO", "piso": "6", "precio": 3386.44, "cliente": null },
        { "depto": "D-607", "estado": "OFERTA", "piso": "6", "precio": 3369.74, "cliente": "BRICEÑO MOYA JAVIERA PAZ" },
        { "depto": "D-608", "estado": "OFERTA", "piso": "6", "precio": 3711.29, "cliente": "ARANCIBIA FUENTES ROCIO MANUELA" },
        { "depto": "D-609", "estado": "OFERTA", "piso": "6", "precio": 3165.00, "cliente": "NEME ABUD JACQUELINE ANDREA" },
        { "depto": "D-610", "estado": "BLOQUEADO", "piso": "6", "precio": 3348.66, "cliente": null },
        { "depto": "D-611", "estado": "OFERTA", "piso": "6", "precio": 3649.29, "cliente": "SAAVEDRA ARIAS LEONARDO OCTAVIO" },
        { "depto": "D-612", "estado": "OFERTA", "piso": "6", "precio": 3398.56, "cliente": "MUÑOZ DEL PINO DIEGO JAVIER" },
        { "depto": "D-704", "estado": "OFERTA", "piso": "7", "precio": 3302.29, "cliente": "GONZALEZ CALFUQUEO DAVID ESTEBAN" },
        { "depto": "D-705", "estado": "BLOQUEADO", "piso": "7", "precio": 3511.67, "cliente": null },
        { "depto": "D-706", "estado": "BLOQUEADO", "piso": "7", "precio": 3386.44, "cliente": null },
        { "depto": "D-707", "estado": "BLOQUEADO", "piso": "7", "precio": 3369.75, "cliente": null },
        { "depto": "D-708", "estado": "VENTA", "piso": "7", "precio": 3355.17, "cliente": null },
        { "depto": "D-709", "estado": "OFERTA", "piso": "7", "precio": 3165.00, "cliente": "LAGOS SOZA JOSE AGUSTIN" },
        { "depto": "D-710", "estado": "VENTA", "piso": "7", "precio": 3348.66, "cliente": null },
        { "depto": "D-711", "estado": "BLOQUEADO", "piso": "7", "precio": 3348.66, "cliente": null },
        { "depto": "D-712", "estado": "OFERTA", "piso": "7", "precio": 3309.12, "cliente": "ZUÑIGA BAUMANN MARCO ANTONIO" },
        { "depto": "D-804", "estado": "VENTA", "piso": "8", "precio": 3365.32, "cliente": null },
        { "depto": "D-805", "estado": "OFERTA", "piso": "8", "precio": 3900.64, "cliente": "FERNANDEZ FELLAY DOMINGO" },
        { "depto": "D-806", "estado": "VENTA", "piso": "8", "precio": 3417.65, "cliente": null },
        { "depto": "D-807", "estado": "OFERTA", "piso": "8", "precio": 3459.51, "cliente": "MUÑOZ DEL PINO DIEGO JAVIER" },
        { "depto": "D-808", "estado": "VENTA", "piso": "8", "precio": 3385.81, "cliente": null },
        { "depto": "D-809", "estado": "VENTA", "piso": "8", "precio": 3315.00, "cliente": null },
        { "depto": "D-810", "estado": "VENTA", "piso": "8", "precio": 3379.24, "cliente": null },
        { "depto": "D-811", "estado": "VENTA", "piso": "8", "precio": 3379.24, "cliente": null },
        { "depto": "D-812", "estado": "VENTA", "piso": "8", "precio": 3372.48, "cliente": null },
        { "depto": "D-904", "estado": "OFERTA", "piso": "9", "precio": 3000.24, "cliente": "RAMIREZ CANCHICA RODHELLY KARINNA" },
        { "depto": "D-905", "estado": "OFERTA", "piso": "9", "precio": 3510.58, "cliente": "FERNANDEZ FELLAY ERNESTO" },
        { "depto": "D-906", "estado": "VENTA", "piso": "9", "precio": 3417.65, "cliente": null },
        { "depto": "D-907", "estado": "OFERTA", "piso": "9", "precio": 3048.85, "cliente": "MELLADO MUÑOZ FRANCISCO JAVIER" },
        { "depto": "D-908", "estado": "OFERTA", "piso": "9", "precio": 3760.91, "cliente": "BLASCHKE VILLALOBOS ERWIN IGNACIO" },
        { "depto": "D-909", "estado": "OFERTA", "piso": "9", "precio": 3195.00, "cliente": "LABBE BASCUÑAN TOBIAS GUILLERMO" },
        { "depto": "D-910", "estado": "VENTA", "piso": "9", "precio": 3379.24, "cliente": null },
        { "depto": "D-911", "estado": "VENTA", "piso": "9", "precio": 3379.24, "cliente": null },
        { "depto": "D-912", "estado": "VENTA", "piso": "9", "precio": 3372.48, "cliente": null },
        { "depto": "D-1004", "estado": "VENTA", "piso": "10", "precio": 3365.32, "cliente": null },
        { "depto": "D-1005", "estado": "VENTA", "piso": "10", "precio": 3543.74, "cliente": null },
        { "depto": "D-1006", "estado": "VENTA", "piso": "10", "precio": 3417.65, "cliente": null },
        { "depto": "D-1007", "estado": "OFERTA", "piso": "10", "precio": 2949.69, "cliente": "CALDERON VELASCO GONZALO JOSE" },
        { "depto": "D-1008", "estado": "VENTA", "piso": "10", "precio": 3385.81, "cliente": null },
        { "depto": "D-1009", "estado": "OFERTA", "piso": "10", "precio": 3315.00, "cliente": "MARTINEZ MOLINA ESTEBAN ISRAEL" },
        { "depto": "D-1010", "estado": "VENTA", "piso": "10", "precio": 3379.24, "cliente": null },
        { "depto": "D-1011", "estado": "OFERTA", "piso": "10", "precio": 3329.30, "cliente": "BARAHONA CABEZAS FRANCISCA ALEJANDRA" },
        { "depto": "D-1012", "estado": "VENTA", "piso": "10", "precio": 3372.48, "cliente": null },
        { "depto": "D-1104", "estado": "OFERTA", "piso": "11", "precio": 3387.66, "cliente": "DONOSO SERRANO CATALINA" },
        { "depto": "D-1105", "estado": "VENTA", "piso": "11", "precio": 3543.74, "cliente": null },
        { "depto": "D-1106", "estado": "VENTA", "piso": "11", "precio": 3417.65, "cliente": null },
        { "depto": "D-1107", "estado": "OFERTA", "piso": "11", "precio": 3721.88, "cliente": "CAMPONOVO FERRARI ANTONIO OSCAR" },
        { "depto": "D-1108", "estado": "OFERTA", "piso": "11", "precio": 3353.90, "cliente": "BRANDT NAVARRO JUAN CARLOS" },
        { "depto": "D-1109", "estado": "OFERTA", "piso": "11", "precio": 3639.44, "cliente": "VICUÑA SUTIL HERNAN" },
        { "depto": "D-1110", "estado": "OFERTA", "piso": "11", "precio": 3329.30, "cliente": "BARAHONA CABEZAS FRANCISCA ALEJANDRA" },
        { "depto": "D-1111", "estado": "OFERTA", "piso": "11", "precio": 3412.65, "cliente": "SOLAR DE LA BARRERA CRISTOBAL MATIAS" },
        { "depto": "D-1112", "estado": "VENTA", "piso": "11", "precio": 3372.48, "cliente": null },
        { "depto": "D-1204", "estado": "VENTA", "piso": "12", "precio": 3365.32, "cliente": null },
        { "depto": "D-1205", "estado": "OFERTA", "piso": "12", "precio": 3550.63, "cliente": "RODRIGUEZ CHAPARRO CESAR MAURICIO" },
        { "depto": "D-1206", "estado": "VENTA", "piso": "12", "precio": 3417.65, "cliente": null },
        { "depto": "D-1207", "estado": "VENTA", "piso": "12", "precio": 3400.53, "cliente": null },
        { "depto": "D-1208", "estado": "BLOQUEADO", "piso": "12", "precio": 3385.81, "cliente": null },
        { "depto": "D-1209", "estado": "OFERTA", "piso": "12", "precio": 3703.88, "cliente": "MARTINEZ MOLINA ESTEBAN ISRAEL" },
        { "depto": "D-1210", "estado": "OFERTA", "piso": "12", "precio": 3680.72, "cliente": "TAPIA AGUILAR RODRIGO MARCELO" },
        { "depto": "D-1211", "estado": "VENTA", "piso": "12", "precio": 3379.24, "cliente": null },
        { "depto": "D-1212", "estado": "BLOQUEADO", "piso": "12", "precio": 3372.48, "cliente": null },
        { "depto": "D-1304", "estado": "VENTA", "piso": "13", "precio": 3365.32, "cliente": null },
        { "depto": "D-1305", "estado": "VENTA", "piso": "13", "precio": 3543.74, "cliente": null },
        { "depto": "D-1306", "estado": "VENTA", "piso": "13", "precio": 3417.65, "cliente": null },
        { "depto": "D-1307", "estado": "VENTA", "piso": "13", "precio": 3400.53, "cliente": null },
        { "depto": "D-1308", "estado": "OFERTA", "piso": "13", "precio": 3299.51, "cliente": "ARAYA MARTINEZ JOSE ESTEBAN" },
        { "depto": "D-1309", "estado": "VENTA", "piso": "13", "precio": 3315.00, "cliente": null },
        { "depto": "D-1310", "estado": "VENTA", "piso": "13", "precio": 3379.24, "cliente": null },
        { "depto": "D-1311", "estado": "VENTA", "piso": "13", "precio": 3379.24, "cliente": null },
        { "depto": "D-1312", "estado": "VENTA", "piso": "13", "precio": 3372.48, "cliente": null },
        { "depto": "D-1404", "estado": "VENTA", "piso": "14", "precio": 3365.32, "cliente": null },
        { "depto": "D-1405", "estado": "VENTA", "piso": "14", "precio": 3543.74, "cliente": null },
        { "depto": "D-1406", "estado": "VENTA", "piso": "14", "precio": 3417.65, "cliente": null },
        { "depto": "D-1407", "estado": "OFERTA", "piso": "14", "precio": 3060.48, "cliente": "LINARES ESPITIA CINDY CAROLAYN" },
        { "depto": "D-1408", "estado": "VENTA", "piso": "14", "precio": 2969.56, "cliente": null },
        { "depto": "D-1409", "estado": "VENTA", "piso": "14", "precio": 3315.00, "cliente": null },
        { "depto": "D-1410", "estado": "OFERTA", "piso": "14", "precio": 3736.28, "cliente": "PRUDENCIO FLAÑO SIMON" },
        { "depto": "D-1411", "estado": "VENTA", "piso": "14", "precio": 3379.24, "cliente": null },
        { "depto": "D-1412", "estado": "OFERTA", "piso": "14", "precio": 3729.38, "cliente": "GREGO PARRA KRISTIAN JURAJ" },
        { "depto": "D-1504", "estado": "OFERTA", "piso": "15", "precio": 3423.69, "cliente": "AMENABAR MANCILLA JOAQUIN ALFONSO" },
        { "depto": "D-1505", "estado": "OFERTA", "piso": "15", "precio": 3144.57, "cliente": "GALVEZ HERRERA MAURICIO ANDRES" },
        { "depto": "D-1506", "estado": "VENTA", "piso": "15", "precio": 3417.65, "cliente": null },
        { "depto": "D-1507", "estado": "OFERTA", "piso": "15", "precio": 3163.56, "cliente": "LEDEZMA FUENTEALBA CARLOS LUIS" },
        { "depto": "D-1508", "estado": "OFERTA", "piso": "15", "precio": 3779.04, "cliente": "RIVAS VESCO JORGE ENRIQUE" },
        { "depto": "D-1509", "estado": "VENTA", "piso": "15", "precio": 3315.00, "cliente": null },
        { "depto": "D-1510", "estado": "OFERTA", "piso": "15", "precio": 3736.28, "cliente": "AMENABAR MORENO EMILIO JOSE" },
        { "depto": "D-1511", "estado": "VENTA", "piso": "15", "precio": 3379.24, "cliente": null },
        { "depto": "D-1512", "estado": "BLOQUEADO", "piso": "15", "precio": 3372.48, "cliente": null },
        { "depto": "D-1604", "estado": "BLOQUEADO", "piso": "16", "precio": 3273.96, "cliente": null },
        { "depto": "D-1605", "estado": "VENTA", "piso": "16", "precio": 3447.50, "cliente": null },
        { "depto": "D-1606", "estado": "VENTA", "piso": "16", "precio": 3324.01, "cliente": null },
        { "depto": "D-1607", "estado": "OFERTA", "piso": "16", "precio": 3273.59, "cliente": "DE LA CERDA BASULTO LUCAS" },
        { "depto": "D-1608", "estado": "OFERTA", "piso": "16", "precio": 3257.29, "cliente": "GARIN SCHMID SERGIO ANTONIO" },
        { "depto": "D-1609", "estado": "VENTA", "piso": "16", "precio": 3225.00, "cliente": null },
        { "depto": "D-1610", "estado": "OFERTA", "piso": "16", "precio": 3697.53, "cliente": "ZANDEE MEDOVIC DIRK DUSAN" },
        { "depto": "D-1611", "estado": "OFERTA", "piso": "16", "precio": 3250.97, "cliente": "GARIN SCHMID SERGIO ANTONIO" },
        { "depto": "D-1612", "estado": "OFERTA", "piso": "16", "precio": 2921.75, "cliente": "ESPINOLA SOLAR LUIS EDUARDO" },
        { "depto": "D-S203", "estado": "OFERTA", "piso": "S2", "precio": 2324.91, "cliente": "MALUENDA SERRANO KATHERINE TESS" },
        { "depto": "D-S213", "estado": "BLOQUEADO", "piso": "S2", "precio": 2529.19, "cliente": null },
        { "depto": "D-S214", "estado": "OFERTA", "piso": "S2", "precio": 1938.22, "cliente": "HAYDEN OFFERMANN EDUARDO ANDRES" },
        { "depto": "D-S215", "estado": "OFERTA", "piso": "S2", "precio": 1943.24, "cliente": "VILLAVICENCIO CORREA PRISCILLA ANDREA" },
        { "depto": "D-S301", "estado": "OFERTA", "piso": "S3", "precio": 2838.88, "cliente": "PEREZ DIAZ SIMON IGNACIO" },
        { "depto": "D-S302", "estado": "OFERTA", "piso": "S3", "precio": 2733.08, "cliente": "JURI CASTILLO DIEGO EDUARDO" },
        { "depto": "D-S303", "estado": "BLOQUEADO", "piso": "S3", "precio": 2485.45, "cliente": null },
        { "depto": "D-S313", "estado": "OFERTA", "piso": "S3", "precio": 2303.72, "cliente": "LEDDIHN HERNANDEZ CARMEN GLORIA" },
        { "depto": "D-S314", "estado": "VENTA", "piso": "S3", "precio": 2491.23, "cliente": null },
        { "depto": "D-S315", "estado": "VENTA", "piso": "S3", "precio": 2488.50, "cliente": null },
        { "depto": "D-S401", "estado": "OFERTA", "piso": "S4", "precio": 2423.79, "cliente": "GUTIERREZ ARIAS IVAN NICOLAS" },
        { "depto": "D-S402", "estado": "OFERTA", "piso": "S4", "precio": 2733.08, "cliente": "CARRASCO SEARLE BENJAMIN MAURICIO" },
        { "depto": "D-S403", "estado": "OFERTA", "piso": "S4", "precio": 2078.74, "cliente": "ROSENKRANZ MARTIN MARIA JESUS" },
        { "depto": "D-S413", "estado": "OFERTA", "piso": "S4", "precio": 2166.18, "cliente": "MAZO MEZA VALENTIN JOSE" },
        { "depto": "D-S414", "estado": "OFERTA", "piso": "S4", "precio": 2175.22, "cliente": "MAZO MEZA VALENTIN JOSE" },
        { "depto": "D-S415", "estado": "VENTA", "piso": "S4", "precio": 2488.50, "cliente": null },
        { "depto": "D-S501", "estado": "OFERTA", "piso": "S5", "precio": 2446.44, "cliente": "CALDERON GALAZ HUGO CESAR" },
        { "depto": "D-S502", "estado": "OFERTA", "piso": "S5", "precio": 2130.26, "cliente": "RODRIGUEZ CHAPARRO CESAR MAURICIO" },
        { "depto": "D-S503", "estado": "OFERTA", "piso": "S5", "precio": 2382.50, "cliente": "TAPIA JULIO CRISTIAN ADRIAN" },
        { "depto": "D-S513", "estado": "BLOQUEADO", "piso": "S5", "precio": 2572.24, "cliente": null },
        { "depto": "D-S514", "estado": "OFERTA", "piso": "S5", "precio": 2327.18, "cliente": "ARAVENA BUSTOS ESTEBAN PABLO" },
        { "depto": "D-S515", "estado": "VENTA", "piso": "S5", "precio": 2509.50, "cliente": null },
        { "depto": "D-S601", "estado": "OFERTA", "piso": "S6", "precio": 2446.44, "cliente": "LEON LOPEZ PAULINA ANDREA" },
        { "depto": "D-S602", "estado": "OFERTA", "piso": "S6", "precio": 2781.43, "cliente": "BLANCO CABRERA MIGUEL ANGEL" },
        { "depto": "D-S603", "estado": "OFERTA", "piso": "S6", "precio": 2733.37, "cliente": "FARIAS PAVEZ JORGE ANDRES" },
        { "depto": "D-S613", "estado": "OFERTA", "piso": "S6", "precio": 2248.50, "cliente": "MUÑOZ JARA GUILLERMO ANGEL" },
        { "depto": "D-S614", "estado": "OFERTA", "piso": "S6", "precio": 2327.18, "cliente": "QUIJADA JARA JONATHAN ALEJANDRO" },
        { "depto": "D-S615", "estado": "VENTA", "piso": "S6", "precio": 2509.50, "cliente": null },
        { "depto": "D-S701", "estado": "OFERTA", "piso": "S7", "precio": 2497.19, "cliente": "CLAVIJO MATURANA BRIAN EDUARDO" },
        { "depto": "D-S702", "estado": "OFERTA", "piso": "S7", "precio": 2153.29, "cliente": "SILVA PODADERA CRISTOBAL ISAAC" },
        { "depto": "D-S703", "estado": "OFERTA", "piso": "S7", "precio": 2357.16, "cliente": "SILVA JONES JAVIERA PAZ" },
        { "depto": "D-S713", "estado": "BLOQUEADO", "piso": "S7", "precio": 2572.24, "cliente": null },
        { "depto": "D-S714", "estado": "OFERTA", "piso": "S7", "precio": 2327.18, "cliente": "ARAVENA BUSTOS ESTEBAN PABLO" },
        { "depto": "D-S715", "estado": "VENTA", "piso": "S7", "precio": 2509.50, "cliente": null },
        { "depto": "D-S801", "estado": "OFERTA", "piso": "S8", "precio": 2469.08, "cliente": "ZUÑIGA BAUMANN MARCO ANTONIO" },
        { "depto": "D-S802", "estado": "OFERTA", "piso": "S8", "precio": 2723.04, "cliente": "TAPIA AGUILAR RODRIGO MARCELO" },
        { "depto": "D-S803", "estado": "OFERTA", "piso": "S8", "precio": 2302.74, "cliente": "GOMEZ PRIETO REINALDO MIGUEL" },
        { "depto": "D-S813", "estado": "OFERTA", "piso": "S8", "precio": 2209.28, "cliente": "RODRIGUEZ GUTIERREZ DIEGO EDUARDO" },
        { "depto": "D-S814", "estado": "VENTA", "piso": "S8", "precio": 2533.27, "cliente": null },
        { "depto": "D-S815", "estado": "OFERTA", "piso": "S8", "precio": 2272.08, "cliente": "VALENZUELA SEPULVEDA BENJAMIN IGNACIO" },
        { "depto": "D-S901", "estado": "OFERTA", "piso": "S9", "precio": 2222.18, "cliente": "ORELLANA CASTILLO FERNANDO IGNACIO" },
        { "depto": "D-S902", "estado": "OFERTA", "piso": "S9", "precio": 2288.41, "cliente": "SANDOVAL RIOS RODRIGO IVAN" },
        { "depto": "D-S903", "estado": "OFERTA", "piso": "S9", "precio": 2422.47, "cliente": "ALARCON BARBE MARTIN ANTONIO" },
        { "depto": "D-S913", "estado": "BLOQUEADO", "piso": "S9", "precio": 2593.76, "cliente": null },
        { "depto": "D-S914", "estado": "VENTA", "piso": "S9", "precio": 2533.27, "cliente": null },
        { "depto": "D-S915", "estado": "OFERTA", "piso": "S9", "precio": 2152.50, "cliente": "BOLUMBURU PEREZ IGNACIO" },
        { "depto": "D-S1001", "estado": "OFERTA", "piso": "", "precio": 2402.36, "cliente": "JIMENEZ PALMA GUILLERMO IGNACIO" },
        { "depto": "D-S1002", "estado": "OFERTA", "piso": "", "precio": 2092.61, "cliente": "CALDERON VELASCO GONZALO JOSE" },
        { "depto": "D-S1003", "estado": "OFERTA", "piso": "", "precio": 2302.74, "cliente": "LABBE BASCUÑAN TOBIAS GUILLERMO" },
        { "depto": "D-S1013", "estado": "OFERTA", "piso": "", "precio": 2160.25, "cliente": "LEDEZMA FUENTEALBA CARLOS LUIS" },
        { "depto": "D-S1014", "estado": "OFERTA", "piso": "", "precio": 2066.20, "cliente": "GONZALEZ FONTAINE PEDRO PABLO" },
        { "depto": "D-S1015", "estado": "OFERTA", "piso": "", "precio": 2215.50, "cliente": "OJEDA TORREBLANCA MARIA JAVIERA" },
        { "depto": "D-S1101", "estado": "VENTA", "piso": "", "precio": 2796.67, "cliente": null },
        { "depto": "D-S1102", "estado": "OFERTA", "piso": "", "precio": 3167.49, "cliente": "CATALAN RODRIGUEZ CARLOS ALFREDO" },
        { "depto": "D-S1103", "estado": "OFERTA", "piso": "", "precio": 2691.63, "cliente": "IRIARTE GALDAMES MARIA JESUS" },
        { "depto": "D-S1113", "estado": "BLOQUEADO", "piso": "", "precio": 2658.34, "cliente": null },
        { "depto": "D-S1114", "estado": "OFERTA", "piso": "", "precio": 2055.09, "cliente": "QUEZADA VIANCOS CAMILA ANDREA" },
        { "depto": "D-S1115", "estado": "OFERTA", "piso": "", "precio": 2215.50, "cliente": "CASTRO BARROS CRISTIAN" },
        { "depto": "D-S1201", "estado": "OFERTA", "piso": "", "precio": 2469.09, "cliente": "OLGUIN CACERES ANGEL FERNANDO" },
        { "depto": "D-S1202", "estado": "OFERTA", "piso": "", "precio": 2549.38, "cliente": "ZAPATA BUSTOS JOSE JAVIER" },
        { "depto": "D-S1203", "estado": "OFERTA", "piso": "", "precio": 2302.74, "cliente": "NEUMANN CORRAL CAMILA" },
        { "depto": "D-S1213", "estado": "BLOQUEADO", "piso": "", "precio": 2658.34, "cliente": null },
        { "depto": "D-S1214", "estado": "OFERTA", "piso": "", "precio": 2555.05, "cliente": "COVARRUBIAS ROSS ALBERTO" },
        { "depto": "D-S1215", "estado": "OFERTA", "piso": "", "precio": 2215.50, "cliente": "LAGOS VALDIVIESO IGNACIO" },
        { "depto": "D-S1301", "estado": "OFERTA", "piso": "", "precio": 2509.13, "cliente": "MIRANDA ROJAS JONATHAN ALEXI" },
        { "depto": "D-S1302", "estado": "VENTA", "piso": "", "precio": 2721.25, "cliente": null },
        { "depto": "D-S1303", "estado": "OFERTA", "piso": "", "precio": 2480.03, "cliente": "CAMPOS GUEVARA CAROLINA ANDREA" },
        { "depto": "D-S1313", "estado": "OFERTA", "piso": "", "precio": 2103.40, "cliente": "SOTELO PEREIRA ANDRES ANTONIO" },
        { "depto": "D-S1314", "estado": "VENTA", "piso": "", "precio": 2596.34, "cliente": null },
        { "depto": "D-S1315", "estado": "OFERTA", "piso": "", "precio": 2215.50, "cliente": "FALCONE SAID PIERO" },
        { "depto": "D-S1401", "estado": "OFERTA", "piso": "", "precio": 2913.53, "cliente": "REYES TRONCOSO ISIDORA FRANCISCA" },
        { "depto": "D-S1402", "estado": "OFERTA", "piso": "", "precio": 2092.61, "cliente": "ARAYA PAQUAY JUAN VICENTE" },
        { "depto": "D-S1403", "estado": "OFERTA", "piso": "", "precio": 2302.74, "cliente": "NEUMANN CORRAL CAMILA" },
        { "depto": "D-S1413", "estado": "OFERTA", "piso": "", "precio": 2362.38, "cliente": "PALMA SANCHEZ FRANCISCO IGNACIO" },
        { "depto": "D-S1414", "estado": "OFERTA", "piso": "", "precio": 2221.72, "cliente": "ZUÑIGA ZUÑIGA JOSE ANDRES" },
        { "depto": "D-S1415", "estado": "VENTA", "piso": "", "precio": 2593.50, "cliente": null },
        { "depto": "D-S1501", "estado": "VENTA", "piso": "", "precio": 2796.67, "cliente": null },
        { "depto": "D-S1502", "estado": "OFERTA", "piso": "", "precio": 2428.46, "cliente": "RODRIGUEZ CHAPARRO CESAR MAURICIO" },
        { "depto": "D-S1503", "estado": "OFERTA", "piso": "", "precio": 2689.45, "cliente": "BALDOVINO SCHWENKE MAXIMILIANO GUILLERMO" },
        { "depto": "D-S1513", "estado": "OFERTA", "piso": "", "precio": 3047.23, "cliente": "ASTRAIN RAMIREZ JAVIER ANDRES" },
        { "depto": "D-S1514", "estado": "OFERTA", "piso": "", "precio": 2077.31, "cliente": "ARANGUIZ MERCADO FERNANDA LORETO" },
        { "depto": "D-S1515", "estado": "OFERTA", "piso": "", "precio": 2215.50, "cliente": "BENADO ALBAGLI VALENTINA" },
        { "depto": "D-S1601", "estado": "OFERTA", "piso": "", "precio": 2336.24, "cliente": "MUÑOZ COFRE CRISTIAN BERNARDO" },
        { "depto": "D-S1602", "estado": "OFERTA", "piso": "", "precio": 2321.43, "cliente": "BOSAGNA URIBE PABLO ALBERTO SEBASTIAN" },
        { "depto": "D-S1603", "estado": "OFERTA", "piso": "", "precio": 2178.99, "cliente": "DONOSO ALLIENDE JUAN CRISTOBAL" },
        { "depto": "D-S1613", "estado": "OFERTA", "piso": "", "precio": 2065.69, "cliente": "RODRIGUEZ PEREZ CRISTIAN MANUEL" },
        { "depto": "D-S1614", "estado": "OFERTA", "piso": "", "precio": 1996.66, "cliente": "ESPINOLA SOLAR LUIS EDUARDO" },
        { "depto": "D-S1615", "estado": "OFERTA", "piso": "", "precio": 2212.29, "cliente": "BRANDT NAVARRO JUAN CARLOS" }
    ];
    for (const item of teatinosData) {
        console.log(`Processing unit ${item.depto}...`);
        let pisoNum = 0;
        if (!item.piso || item.piso.trim() === '') {
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
        else if (item.piso.startsWith('S')) {
            pisoNum = parseInt(item.piso.substring(1));
        }
        else {
            pisoNum = parseInt(item.piso);
        }
        let tipologia = 'DEPTO';
        if (item.depto.includes('-S')) {
            tipologia = 'STUDIO';
        }
        let estadoDb = 'Disponible';
        let clientNameForFicha = null;
        if (item.estado === 'VENTA') {
            estadoDb = 'Disponible';
        }
        else if (item.estado === 'OFERTA') {
            estadoDb = 'Reservada';
            clientNameForFicha = item.cliente;
        }
        else if (item.estado === 'BLOQUEADO') {
            estadoDb = 'Reservada';
            clientNameForFicha = 'Reservado Interno';
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
        if (estadoDb === 'Reservada' || estadoDb === 'Vendida') {
            if (clientNameForFicha) {
                const safeName = clientNameForFicha.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                const clientEmail = `${safeName}@import.cl`;
                let cliente = await clienteRepo.findOne({ where: { email: clientEmail } });
                if (!cliente) {
                    const randomRut = `${Math.floor(Math.random() * 90000000)}-${Math.floor(Math.random() * 9)}`;
                    cliente = await clienteRepo.save({
                        nombreCompleto: clientNameForFicha,
                        rut: randomRut,
                        email: clientEmail,
                        telefono: '+56900000000'
                    });
                }
                const fichaExistente = await fichaVentaRepo.findOne({
                    where: { unidad: { id: unidad.id } }
                });
                if (!fichaExistente) {
                    console.log(`Creating FichaVenta for ${item.depto} - Client: ${clientNameForFicha}`);
                    const nuevaFicha = await fichaVentaRepo.save({
                        unidad: unidad,
                        agente: brokerUser,
                        estadoFicha: estado_ficha_enum_1.EstadoFicha.RESERVA,
                        valorTotalUf: unidad.valorUf,
                        folio: `FV-${unidad.nombre}-${Date.now()}`,
                        createdAt: new Date()
                    });
                    await fichaClienteRepo.save({
                        fichaVenta: nuevaFicha,
                        cliente: cliente,
                        rol: 'Principal'
                    });
                }
            }
        }
    }
    console.log('Seed for Edificio Teatinos 750 completed successfully.');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map