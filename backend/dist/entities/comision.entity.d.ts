import { FichaVenta } from './ficha-venta.entity';
import { Usuario } from './usuario.entity';
export declare class Comision {
    id: number;
    fichaVenta: FichaVenta;
    broker: Usuario;
    monto: number;
    porcentaje: number;
    estado: string;
    fechaPago: Date;
    createdAt: Date;
    updatedAt: Date;
}
