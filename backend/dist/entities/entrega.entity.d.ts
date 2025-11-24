import { FichaVenta } from './ficha-venta.entity';
export declare class Entrega {
    id: number;
    fichaId: number;
    fichaVenta: FichaVenta;
    fechaProgramada: Date;
    fechaReal: Date;
    firmada: boolean;
    observaciones: string;
    createdAt: Date;
    updatedAt: Date;
}
