import { Repository } from 'typeorm';
import { Escritura } from '../entities/escritura.entity';
import { Entrega } from '../entities/entrega.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';
export declare class PostSalesService {
    private escrituraRepository;
    private entregaRepository;
    private fichaRepository;
    constructor(escrituraRepository: Repository<Escritura>, entregaRepository: Repository<Entrega>, fichaRepository: Repository<FichaVenta>);
    createEscritura(fichaId: number, data: Partial<Escritura>): Promise<Escritura>;
    updateEscritura(id: number, data: Partial<Escritura>): Promise<Escritura | null>;
    getEscrituraByFicha(fichaId: number): Promise<Escritura | null>;
    scheduleEntrega(fichaId: number, date: Date): Promise<Entrega>;
    completeEntrega(id: number, observations: string): Promise<Entrega>;
    getEntregaByFicha(fichaId: number): Promise<Entrega | null>;
}
