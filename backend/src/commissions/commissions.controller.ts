import { Controller, Get, Post, Patch, Param, UseGuards, Request, Body } from '@nestjs/common';
import { CommissionsService } from './commissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('commissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommissionsController {
    constructor(private readonly commissionsService: CommissionsService) { }

    @Post('calculate/:fichaId')
    @Roles('Admin', 'Contabilidad')
    calculate(@Param('fichaId') fichaId: string) {
        return this.commissionsService.calculateCommission(+fichaId);
    }

    @Patch(':fichaId/status')
    @Roles('Admin', 'Contabilidad')
    updateStatus(@Param('fichaId') fichaId: string, @Body('status') status: string) {
        return this.commissionsService.updateCommissionStatus(+fichaId, status);
    }

    @Get('my')
    @Roles('Broker')
    getMyCommissions(@Request() req) {
        return this.commissionsService.getCommissions(req.user.userId);
    }

    @Get('all')
    @Roles('Admin', 'Contabilidad')
    getAll() {
        return this.commissionsService.getCommissions();
    }
}
