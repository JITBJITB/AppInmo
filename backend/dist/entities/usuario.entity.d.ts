import { BrokerProyecto } from './broker-proyecto.entity';
export declare class Usuario {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    rol: string;
    createdAt: Date;
    proyectosAsignados: BrokerProyecto[];
}
