import { Proyecto } from './proyecto.entity';
export declare class Unidad {
    id: number;
    proyectoId: number;
    proyecto: Proyecto;
    nombre: string;
    tipologia: string;
    metrosCuadrados: number;
    piso: number;
    valorUf: number;
    estado: string;
    reservaExpiraEn: Date;
    createdAt: Date;
}
