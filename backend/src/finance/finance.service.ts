import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanPago } from '../entities/plan-pago.entity';
import { Cuota } from '../entities/cuota.entity';

@Injectable()
export class FinanceService {
    constructor(
        @InjectRepository(PlanPago)
        private planPagoRepository: Repository<PlanPago>,
        @InjectRepository(Cuota)
        private cuotaRepository: Repository<Cuota>,
    ) { }

    async getPlanByFicha(fichaId: number): Promise<PlanPago> {
        const plan = await this.planPagoRepository.findOne({
            where: { fichaVentaId: fichaId },
            relations: ['cuotas'],
            order: {
                cuotas: {
                    numeroCuota: 'ASC'
                }
            }
        });
        if (!plan) throw new NotFoundException('Plan de pago no encontrado');
        return plan;
    }

    async markCuotaAsPaid(cuotaId: number): Promise<Cuota> {
        const cuota = await this.cuotaRepository.findOne({ where: { id: cuotaId } });
        if (!cuota) throw new NotFoundException('Cuota no encontrada');

        cuota.estado = 'Pagada';
        cuota.fechaPago = new Date();
        return this.cuotaRepository.save(cuota);
    }
    async recalculateDebt(fichaId: number): Promise<{ totalDeuda: number, cuotasPendientes: number }> {
        const plan = await this.planPagoRepository.findOne({
            where: { fichaVentaId: fichaId },
            relations: ['cuotas']
        });

        if (!plan) throw new NotFoundException('Plan de pago no encontrado');

        const cuotasPendientes = plan.cuotas.filter(c => c.estado === 'Pendiente');
        const totalDeuda = cuotasPendientes.reduce((sum, c) => sum + Number(c.montoCuota), 0);

        // Update plan saldo
        plan.saldoAPagar = totalDeuda;
        await this.planPagoRepository.save(plan);

        return {
            totalDeuda,
            cuotasPendientes: cuotasPendientes.length
        };
    }
}
