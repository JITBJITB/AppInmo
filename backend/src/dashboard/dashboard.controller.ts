import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/roles.enum';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('kpis')
    @Roles(UserRole.GERENCIA, UserRole.ADMIN)
    async getKPIs() {
        return this.dashboardService.getKPIs();
    }

    @Get('sales-by-broker')
    @Roles(UserRole.GERENCIA, UserRole.ADMIN)
    async getSalesByBroker() {
        return this.dashboardService.getSalesByBroker();
    }
}
