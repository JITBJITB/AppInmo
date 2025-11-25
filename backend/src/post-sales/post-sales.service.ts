import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Escritura } from '../entities/escritura.entity';
import { Entrega } from '../entities/entrega.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { GuaranteedRentBenefit } from '../entities/guaranteed-rent-benefit.entity';
import { Task } from '../entities/task.entity';

@Injectable()
export class PostSalesService {
    private readonly logger = new Logger(PostSalesService.name);

    constructor(
        @InjectRepository(Escritura)
        private escrituraRepository: Repository<Escritura>,
        @InjectRepository(Entrega)
        private entregaRepository: Repository<Entrega>,
        @InjectRepository(FichaVenta)
        private fichaRepository: Repository<FichaVenta>,
        @InjectRepository(GuaranteedRentBenefit)
        private benefitRepository: Repository<GuaranteedRentBenefit>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async checkGuaranteedRents() {
        this.logger.debug('Checking guaranteed rent benefits...');
        const today = new Date();

        // Find active benefits where today is within the range
        const activeBenefits = await this.benefitRepository.find({
            where: {
                active: true,
                startDate: LessThanOrEqual(today),
                endDate: MoreThanOrEqual(today),
            },
            relations: ['fichaVenta', 'fichaVenta.unidad'],
        });

        for (const benefit of activeBenefits) {
            // Check if payment is due today (e.g., same day of month as start date)
            if (today.getDate() === benefit.startDate.getDate()) {
                await this.createPaymentTask(benefit);
            }
        }
    }

    private async createPaymentTask(benefit: GuaranteedRentBenefit) {
        const task = new Task();
        task.title = `Pago Arriendo Garantizado - Ficha ${benefit.fichaVenta.folio} `;
        task.description = `Realizar pago de $${benefit.monthlyAmount} por unidad ${benefit.fichaVenta.unidad.nombre}.`;
        task.status = 'Pendiente';
        task.assignedRole = 'Contabilidad';
        task.relatedEntityId = benefit.id;
        task.relatedEntityType = 'GuaranteedRentBenefit';

        await this.taskRepository.save(task);
        this.logger.log(`Created payment task for benefit ${benefit.id}`);
    }

    // Escritura Methods
    async createEscritura(fichaId: number, data: Partial<Escritura>): Promise<Escritura> {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha) throw new NotFoundException('Ficha no encontrada');

        const existing = await this.escrituraRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
        if (existing) throw new BadRequestException('Ya existe una escritura para esta venta');

        const escritura = this.escrituraRepository.create({ ...data, fichaVenta: ficha });
        return this.escrituraRepository.save(escritura);
    }

    async updateEscritura(id: number, data: Partial<Escritura>): Promise<Escritura | null> {
        await this.escrituraRepository.update(id, data);
        return this.escrituraRepository.findOne({ where: { id } });
    }

    async getEscrituraByFicha(fichaId: number): Promise<Escritura | null> {
        return this.escrituraRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
    }

    // Entrega Methods
    async scheduleEntrega(fichaId: number, date: Date): Promise<Entrega> {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha) throw new NotFoundException('Ficha no encontrada');

        let entrega = await this.entregaRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
        if (!entrega) {
            entrega = this.entregaRepository.create({ fichaVenta: ficha });
        }

        entrega.fechaProgramada = date;
        return this.entregaRepository.save(entrega);
    }

    async completeEntrega(id: number, observations: string): Promise<Entrega> {
        const entrega = await this.entregaRepository.findOne({ where: { id } });
        if (!entrega) throw new NotFoundException('Entrega no encontrada');

        entrega.fechaReal = new Date();
        entrega.observaciones = observations;
        entrega.firmada = true;
        return this.entregaRepository.save(entrega);
    }

    async getEntregaByFicha(fichaId: number): Promise<Entrega | null> {
        return this.entregaRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
    }
}
