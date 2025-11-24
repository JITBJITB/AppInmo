import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Post()
    @Roles('Agente', 'Broker', 'Admin')
    create(@Body() createFichaDto: any, @Request() req) {
        return this.salesService.createFicha(createFichaDto, req.user.userId);
    }

    @Get()
    @Roles('Agente', 'Broker', 'Admin')
    findAll() {
        return this.salesService.findAll();
    }

    @Get(':id')
    @Roles('Agente', 'Broker', 'Admin', 'Contabilidad')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(+id);
    }
}
