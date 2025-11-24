import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanPago } from '../entities/plan-pago.entity';
import { Cuota } from '../entities/cuota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanPago, Cuota])],
  providers: [FinanceService],
  controllers: [FinanceController]
})
export class FinanceModule { }
