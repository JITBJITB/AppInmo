import { Repository } from 'typeorm';
import { Unidad } from '../entities/unidad.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';
export declare class TasksService {
    private unidadRepository;
    private fichaVentaRepository;
    private readonly logger;
    constructor(unidadRepository: Repository<Unidad>, fichaVentaRepository: Repository<FichaVenta>);
    handleCron(): Promise<void>;
}
