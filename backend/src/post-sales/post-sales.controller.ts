import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { PostSalesService } from './post-sales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('post-sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostSalesController {
    constructor(private readonly postSalesService: PostSalesService) { }

    // Escritura Endpoints
    @Post('escrituras/:fichaId')
    @Roles('Admin', 'Contabilidad', 'Agente')
    createEscritura(@Param('fichaId') fichaId: string, @Body() data: any) {
        return this.postSalesService.createEscritura(+fichaId, data);
    }

    @Patch('escrituras/:id')
    @Roles('Admin', 'Contabilidad')
    updateEscritura(@Param('id') id: string, @Body() data: any) {
        return this.postSalesService.updateEscritura(+id, data);
    }

    @Get('escrituras/ficha/:fichaId')
    @Roles('Admin', 'Contabilidad', 'Agente', 'Broker')
    getEscritura(@Param('fichaId') fichaId: string) {
        return this.postSalesService.getEscrituraByFicha(+fichaId);
    }

    // Entrega Endpoints
    @Post('entregas/:fichaId/schedule')
    @Roles('Admin', 'Agente')
    scheduleEntrega(@Param('fichaId') fichaId: string, @Body('date') date: string) {
        return this.postSalesService.scheduleEntrega(+fichaId, new Date(date));
    }

    @Patch('entregas/:id/complete')
    @Roles('Admin', 'Agente')
    completeEntrega(@Param('id') id: string, @Body('observations') observations: string) {
        return this.postSalesService.completeEntrega(+id, observations);
    }

    @Get('entregas/ficha/:fichaId')
    @Roles('Admin', 'Agente', 'Broker')
    getEntrega(@Param('fichaId') fichaId: string) {
        return this.postSalesService.getEntregaByFicha(+fichaId);
    }
}
