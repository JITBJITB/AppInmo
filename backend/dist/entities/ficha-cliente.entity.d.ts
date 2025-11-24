import { FichaVenta } from './ficha-venta.entity';
import { Cliente } from './cliente.entity';
export declare class FichaCliente {
    id: number;
    fichaVentaId: number;
    fichaVenta: FichaVenta;
    clienteId: number;
    cliente: Cliente;
    rol: string;
}
