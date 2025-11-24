import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Cuota } from '../entities/cuota.entity';
import { GuaranteedRentBenefit } from '../entities/guaranteed-rent-benefit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FichaVenta, Cuota, GuaranteedRentBenefit])],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }
