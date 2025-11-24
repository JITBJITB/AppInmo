import { Usuario } from './usuario.entity';
import { Proyecto } from './proyecto.entity';
export declare class BrokerProyecto {
    id: number;
    brokerId: number;
    broker: Usuario;
    proyectoId: number;
    proyecto: Proyecto;
}
