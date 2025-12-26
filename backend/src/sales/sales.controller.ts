import { Controller, Post, Body, UseGuards, Request, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateFichaVentaDto } from './dto/create-ficha-venta.dto';
import { CotizacionDto } from './dto/cotizacion.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Post()
    @Roles('Agente', 'Broker', 'Admin')
    create(@Body() createFichaDto: CreateFichaVentaDto, @Request() req) {
        return this.salesService.createFicha(createFichaDto, req.user.userId);
    }

    @Post('cotizacion')
    @Roles('Agente', 'Broker', 'Admin')
    generateCotizacion(@Body() createFichaDto: CreateFichaVentaDto): Promise<CotizacionDto> {
        return this.salesService.generateCotizacion(createFichaDto);
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

    @Post(':id/approve')
    @Roles('Gerencia', 'Admin')
    approve(@Param('id') id: string) {
        return this.salesService.approveFicha(+id);
    }

    @Get('guaranteed-rent')
    @Roles('Agente', 'Broker', 'Admin', 'Contabilidad')
    getGuaranteedRentReport() {
        return this.salesService.getGuaranteedRentReport();
    }

    @Get('guaranteed-rent/csv')
    @Roles('Agente', 'Broker', 'Admin', 'Contabilidad')
    async downloadGuaranteedRentCsv(@Res() res: Response) {
        const csv = await this.salesService.generateGuaranteedRentCsv();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=nomina_arriendo_garantizado.csv');
        res.send(csv);
    }
}
