import { FichaVenta } from './ficha-venta.entity';
export declare class DocumentoVenta {
    id: number;
    fichaVentaId: number;
    fichaVenta: FichaVenta;
    tipoDocumento: string;
    urlS3: string;
    createdAt: Date;
}
