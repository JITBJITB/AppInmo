import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { ProjectsService } from './projects/projects.service';
import { ClientsService } from './clients/clients.service';
import { SalesService } from './sales/sales.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';
import { FichaVenta } from './entities/ficha-venta.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);
    const projectsService = app.get(ProjectsService);
    const clientsService = app.get(ClientsService);
    const salesService = app.get(SalesService);
    const unidadRepo = app.get(getRepositoryToken(Unidad));
    const fichaRepo = app.get(getRepositoryToken(FichaVenta));

    console.log('Starting seed...');

    // 1. Users
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

    // 2. Projects & Units
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

            // Create Units
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

    // 3. Clients
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

    // 4. Sales (Fichas)
    const units = await unidadRepo.find({ where: { estado: 'Disponible' }, take: 2 });
    if (units.length >= 2 && broker) {
        console.log('Creating Sales...');

        // Sale 1: Borrador
        await salesService.createFicha({
            unidadId: units[0].id,
            clienteId: client.id,
            pieMonto: 0,
            reservaMonto: 0,
            cuotas: []
        }, broker.id);

        // Sale 2: Promesa (Mocking manually for speed)
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
