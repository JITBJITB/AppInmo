import { FichaVenta } from './ficha-venta.entity';
import { Adicional } from './adicional.entity';
export declare class FichaAdicional {
    id: number;
    fichaVentaId: number;
    fichaVenta: FichaVenta;
    adicionalId: number;
    adicional: Adicional;
}
