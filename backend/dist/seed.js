"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const projects_service_1 = require("./projects/projects.service");
const clients_service_1 = require("./clients/clients.service");
const sales_service_1 = require("./sales/sales.service");
const typeorm_1 = require("@nestjs/typeorm");
const unidad_entity_1 = require("./entities/unidad.entity");
const ficha_venta_entity_1 = require("./entities/ficha-venta.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const projectsService = app.get(projects_service_1.ProjectsService);
    const clientsService = app.get(clients_service_1.ClientsService);
    const salesService = app.get(sales_service_1.SalesService);
    const unidadRepo = app.get((0, typeorm_1.getRepositoryToken)(unidad_entity_1.Unidad));
    const fichaRepo = app.get((0, typeorm_1.getRepositoryToken)(ficha_venta_entity_1.FichaVenta));
    console.log('Starting seed...');
    const adminEmail = 'admin@inmoapp.cl';
    let admin = await usersService.findOne(adminEmail);
    if (!admin) {
        console.log('Creating Admin...');
        admin = await usersService.create({ nombre: 'Admin User', email: adminEmail, passwordHash: 'admin123', rol: 'Admin' });
    }
    const brokerEmail = 'broker@inmoapp.cl';
    let broker = await usersService.findOne(brokerEmail);
    if (!broker) {
        console.log('Creating Broker...');
        broker = await usersService.create({ nombre: 'Juan Broker', email: brokerEmail, passwordHash: 'broker123', rol: 'Broker' });
    }
    const projectsData = [
        { name: 'Edificio Centro', address: 'Alameda 123', units: 50 },
        { name: 'Altos del Parque', address: 'Av. Kennedy 5000', units: 30 }
    ];
    for (const pData of projectsData) {
        let project = (await projectsService.findAll()).find(p => p.nombre === pData.name);
        if (!project) {
            console.log(`Creating Project ${pData.name}...`);
            project = await projectsService.create({
                nombre: pData.name,
                direccion: pData.address,
                comuna: 'Santiago',
                imagenPrincipalUrl: 'https://via.placeholder.com/800x600'
            });
            const tipologias = ['1D1B', '2D2B', 'Studio'];
            for (let i = 1; i <= pData.units; i++) {
                const tipo = tipologias[i % 3];
                const price = 2000 + (i * 100);
                await unidadRepo.save({
                    proyecto: project,
                    nombre: `Depto ${100 + i}`,
                    tipologia: tipo,
                    metrosCuadrados: 40 + (i % 10),
                    piso: Math.floor(i / 10) + 1,
                    valorUf: price,
                    estado: 'Disponible'
                });
            }
        }
    }
    const clientData = {
        nombreCompleto: 'Cliente Ejemplo',
        rut: '12345678-9',
        email: 'cliente@example.com',
        telefono: '+56912345678'
    };
    let client = (await clientsService.findAll()).find(c => c.rut === clientData.rut);
    if (!client) {
        console.log('Creating Client...');
        client = await clientsService.create(clientData);
    }
    const units = await unidadRepo.find({ where: { estado: 'Disponible' }, take: 2 });
    if (units.length >= 2 && broker) {
        console.log('Creating Sales...');
        await salesService.createFicha({
            unidadId: units[0].id,
            clienteId: client.id,
            pieMonto: 0,
            reservaMonto: 0,
            cuotas: []
        }, broker.id);
        const ficha2 = fichaRepo.create({
            unidad: units[1],
            agente: broker,
            estadoFicha: 'Aprobada',
            valorTotalUf: units[1].valorUf,
            folio: `FV-${Date.now()}`,
            comisionBrokerMonto: units[1].valorUf * 0.02,
            estadoComisionBroker: 'Pendiente'
        });
        await fichaRepo.save(ficha2);
        units[1].estado = 'Vendida';
        await unidadRepo.save(units[1]);
    }
    console.log('Seed completed successfully.');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map