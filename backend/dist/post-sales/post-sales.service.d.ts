import { Repository } from 'typeorm';
import { Escritura } from '../entities/escritura.entity';
import { Entrega } from '../entities/entrega.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { GuaranteedRentBenefit } from '../entities/guaranteed-rent-benefit.entity';
import { Task } from '../entities/task.entity';
export declare class PostSalesService {
    private escrituraRepository;
    private entregaRepository;
    private fichaRepository;
    private benefitRepository;
    private taskRepository;
    private readonly logger;
    constructor(escrituraRepository: Repository<Escritura>, entregaRepository: Repository<Entrega>, fichaRepository: Repository<FichaVenta>, benefitRepository: Repository<GuaranteedRentBenefit>, taskRepository: Repository<Task>);
    checkGuaranteedRents(): Promise<void>;
    private createPaymentTask;
    createEscritura(fichaId: number, data: Partial<Escritura>): Promise<Escritura>;
    updateEscritura(id: number, data: Partial<Escritura>): Promise<Escritura | null>;
    getEscrituraByFicha(fichaId: number): Promise<Escritura | null>;
    scheduleEntrega(fichaId: number, date: Date): Promise<Entrega>;
    completeEntrega(id: number, observations: string): Promise<Entrega>;
    getEntregaByFicha(fichaId: number): Promise<Entrega | null>;
}
