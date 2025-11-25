import { Repository } from 'typeorm';
import { PlanPago } from '../entities/plan-pago.entity';
import { Cuota } from '../entities/cuota.entity';
export declare class FinanceService {
    private planPagoRepository;
    private cuotaRepository;
    constructor(planPagoRepository: Repository<PlanPago>, cuotaRepository: Repository<Cuota>);
    getPlanByFicha(fichaId: number): Promise<PlanPago>;
    markCuotaAsPaid(cuotaId: number): Promise<Cuota>;
    recalculateDebt(fichaId: number): Promise<{
        totalDeuda: number;
        cuotasPendientes: number;
    }>;
}
