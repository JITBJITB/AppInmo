import { FichaVenta } from './ficha-venta.entity';
import { Cuota } from './cuota.entity';
export declare class PlanPago {
    id: number;
    fichaVentaId: number;
    fichaVenta: FichaVenta;
    tipoPlan: string;
    montoTotal: number;
    montoPie: number;
    montoReserva: number;
    saldoAPagar: number;
    numeroCuotas: number;
    createdAt: Date;
    cuotas: Cuota[];
}
