import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Unidad } from '../entities/unidad.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { EstadoFicha } from '../sales/enums/estado-ficha.enum';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        @InjectRepository(Unidad)
        private unidadRepository: Repository<Unidad>,
        @InjectRepository(FichaVenta)
        private fichaVentaRepository: Repository<FichaVenta>,
    ) { }

    @Cron(CronExpression.EVERY_HOUR)
    async handleCron() {
        this.logger.debug('Checking for expired reservations...');

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() - 48);

        const expiredFichas = await this.fichaVentaRepository.find({
            where: {
                estadoFicha: EstadoFicha.BORRADOR,
                createdAt: LessThan(expirationDate),
            },
            relations: ['unidad'],
        });

        if (expiredFichas.length === 0) {
            this.logger.debug('No expired reservations found.');
            return;
        }

        this.logger.log(`Found ${expiredFichas.length} expired reservations. Processing...`);

        for (const ficha of expiredFichas) {
            // Update Ficha status
            ficha.estadoFicha = EstadoFicha.VENCIDA;
            await this.fichaVentaRepository.save(ficha);

            // Release Unit
            if (ficha.unidad) {
                ficha.unidad.estado = 'Disponible';
                await this.unidadRepository.save(ficha.unidad);
                this.logger.log(`Released unit ${ficha.unidad.nombre} from ficha ${ficha.folio}`);
            }
        }
    }
}
