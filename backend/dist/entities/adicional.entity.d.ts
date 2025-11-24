import { Proyecto } from './proyecto.entity';
export declare class Adicional {
    id: number;
    proyectoId: number;
    proyecto: Proyecto;
    tipo: string;
    nombre: string;
    valorUf: number;
    estado: string;
    createdAt: Date;
}
