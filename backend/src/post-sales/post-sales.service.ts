import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escritura } from '../entities/escritura.entity';
import { Entrega } from '../entities/entrega.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';

@Injectable()
export class PostSalesService {
    constructor(
        @InjectRepository(Escritura)
        private escrituraRepository: Repository<Escritura>,
        @InjectRepository(Entrega)
        private entregaRepository: Repository<Entrega>,
        @InjectRepository(FichaVenta)
        private fichaRepository: Repository<FichaVenta>,
    ) { }

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
