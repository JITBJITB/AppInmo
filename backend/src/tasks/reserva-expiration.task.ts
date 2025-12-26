import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Unidad } from '../entities/unidad.entity';
import { EstadoHistorial } from '../entities/estado-historial.entity';
import { EstadoFicha } from '../sales/enums/estado-ficha.enum';
import { EstadoUnidad } from '../entities/enums/estado-unidad.enum';

@Injectable()
export class ReservaExpirationTask {
    private readonly logger = new Logger(ReservaExpirationTask.name);

    constructor(
        @InjectRepository(FichaVenta)
        private fichaVentaRepo: Repository<FichaVenta>,
        @InjectRepository(Unidad)
        private unidadRepo: Repository<Unidad>,
        @InjectRepository(EstadoHistorial)
        private historialRepo: Repository<EstadoHistorial>,
    ) { }

    /**
     * Tarea programada que se ejecuta cada hora para verificar reservas expiradas
     */
    @Cron(CronExpression.EVERY_HOUR)
    async checkExpiredReservas() {
        const now = new Date();

        this.logger.log('Verificando reservas expiradas...');

        // Buscar unidades con reserva expirada
        const unidadesExpiradas = await this.unidadRepo.find({
            where: {
                estado: EstadoUnidad.RESERVADA,
                reservaExpiraEn: LessThan(now),
            },
        });

        if (unidadesExpiradas.length === 0) {
            this.logger.log('No hay reservas expiradas');
            return;
        }

        this.logger.log(`Encontradas ${unidadesExpiradas.length} reservas expiradas`);

        for (const unidad of unidadesExpiradas) {
            try {
                // Buscar ficha de venta activa
                const ficha = await this.fichaVentaRepo.findOne({
                    where: {
                        unidadId: unidad.id,
                        estadoFicha: EstadoFicha.RESERVA,
                    },
                });

                if (ficha) {
                    // Cambiar a VENCIDA
                    const estadoAnterior = ficha.estadoFicha;
                    ficha.estadoFicha = EstadoFicha.VENCIDA;
                    await this.fichaVentaRepo.save(ficha);

                    // Registrar en historial
                    const historial = this.historialRepo.create({
                        fichaVentaId: ficha.id,
                        estadoAnterior: estadoAnterior,
                        estadoNuevo: EstadoFicha.VENCIDA,
                        usuarioId: 1, // Sistema
                        observaciones: 'Reserva vencida automáticamente por timeout',
                    });
                    await this.historialRepo.save(historial);

                    // Liberar unidad
                    unidad.estado = EstadoUnidad.DISPONIBLE;
                    unidad.reservaExpiraEn = null as any;
                    await this.unidadRepo.save(unidad);

                    this.logger.log(`Reserva vencida: Ficha ${ficha.folio}, Unidad ${unidad.nombre}`);
                }
            } catch (error) {
                this.logger.error(`Error procesando unidad ${unidad.id}:`, error);
            }
        }

        this.logger.log('Verificación de reservas expiradas completada');
    }
}
