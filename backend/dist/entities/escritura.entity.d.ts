import { FichaVenta } from './ficha-venta.entity';
export declare class Escritura {
    id: number;
    fichaId: number;
    fichaVenta: FichaVenta;
    estado: string;
    notaria: string;
    repertorio: string;
    fechaFirma: Date;
    fechaInscripcion: Date;
    observaciones: string;
    createdAt: Date;
    updatedAt: Date;
}
