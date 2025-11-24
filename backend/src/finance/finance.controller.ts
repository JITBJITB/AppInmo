import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('finance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinanceController {
    constructor(private readonly financeService: FinanceService) { }

    @Get('fichas/:id/plan')
    @Roles('Admin', 'Contabilidad', 'Broker', 'Agente')
    getPlan(@Param('id') id: string) {
        return this.financeService.getPlanByFicha(+id);
    }

    @Patch('cuotas/:id/pay')
    @Roles('Admin', 'Contabilidad')
    markAsPaid(@Param('id') id: string) {
        return this.financeService.markCuotaAsPaid(+id);
    }
}
