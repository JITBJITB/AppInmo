import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class CommissionsService {
    constructor(
        @InjectRepository(FichaVenta)
        private fichaRepository: Repository<FichaVenta>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async calculateCommission(fichaId: number): Promise<FichaVenta> {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha) throw new NotFoundException('Ficha no encontrada');

        const agent = await this.usuarioRepository.findOne({ where: { id: ficha.agenteId } });
        if (!agent || agent.rol !== 'Broker') {
            // If not a broker, we might still want to set commission to 0 or handle differently.
            // For now, we just return the ficha without changes if not a broker.
            return ficha;
        }

        // Fixed 2% commission for Brokers
        const porcentaje = 2.0;
        const monto = (ficha.valorTotalUf * porcentaje) / 100;

        ficha.comisionBrokerMonto = monto;
        ficha.estadoComisionBroker = 'Pendiente';

        return this.fichaRepository.save(ficha);
    }

    async updateCommissionStatus(fichaId: number, status: string): Promise<FichaVenta> {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha) throw new NotFoundException('Ficha no encontrada');

        const validStatuses = ['Pendiente', 'Solicitar Factura', 'Factura Recibida', 'Pagada'];
        if (!validStatuses.includes(status)) {
            throw new BadRequestException('Estado de comisión inválido');
        }

        ficha.estadoComisionBroker = status;
        return this.fichaRepository.save(ficha);
    }

    async getCommissions(brokerId?: number): Promise<FichaVenta[]> {
        const query = this.fichaRepository.createQueryBuilder('ficha')
            .leftJoinAndSelect('ficha.unidad', 'unidad')
            .leftJoinAndSelect('ficha.agente', 'agente')
            .where('ficha.comisionBrokerMonto > 0');

        if (brokerId) {
            query.andWhere('ficha.agenteId = :brokerId', { brokerId });
        }

        return query.getMany();
    }
}
