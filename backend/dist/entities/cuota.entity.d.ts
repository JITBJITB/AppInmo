import { PlanPago } from './plan-pago.entity';
export declare class Cuota {
    id: number;
    planPagoId: number;
    planPago: PlanPago;
    numeroCuota: number;
    montoCuota: number;
    fechaVencimiento: Date;
    estado: string;
    fechaPago: Date;
    createdAt: Date;
}
