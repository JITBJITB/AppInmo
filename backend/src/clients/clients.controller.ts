import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    @Roles('Agente', 'Broker', 'Admin')
    create(@Body() createClientDto: any) {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    @Roles('Agente', 'Broker', 'Admin')
    findAll(@Query('search') search: string) {
        return this.clientsService.findAll(search);
    }

    @Get(':id')
    @Roles('Agente', 'Broker', 'Admin')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(+id);
    }

    @Patch(':id')
    @Roles('Agente', 'Broker', 'Admin')
    update(@Param('id') id: string, @Body() updateClientDto: any) {
        return this.clientsService.update(+id, updateClientDto);
    }

    @Post(':id/documents')
    @Roles('Agente', 'Broker', 'Admin')
    addDocument(@Param('id') id: string, @Body() documentDto: any) {
        return this.clientsService.addDocument(+id, documentDto);
    }
}
