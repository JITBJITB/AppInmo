import { Unidad } from './unidad.entity';
import { Adicional } from './adicional.entity';
import { BrokerProyecto } from './broker-proyecto.entity';
export declare class Proyecto {
    id: number;
    nombre: string;
    direccion: string;
    comuna: string;
    imagenPrincipalUrl: string;
    createdAt: Date;
    unidades: Unidad[];
    adicionales: Adicional[];
    brokersAsignados: BrokerProyecto[];
}
