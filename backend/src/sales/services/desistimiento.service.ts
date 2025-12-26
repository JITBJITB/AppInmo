import { Injectable } from '@nestjs/common';
import { EstadoTransitionService, TransicionEstadoDto } from './estado-transition.service';
import { EstadoFicha } from '../enums/estado-ficha.enum';

export interface DesistimientoDto {
    fichaVentaId: number;
    usuarioId: number;
    motivo: string;
    observaciones?: string;
}

@Injectable()
export class DesistimientoService {
    constructor(
        private estadoTransitionService: EstadoTransitionService,
    ) { }

    /**
     * Procesar desistimiento de una venta
     * - Cambia estado de FichaVenta a DESISTIDA
     * - Libera automáticamente la Unidad (DISPONIBLE)
     * - Registra motivo en historial
     */
    async procesarDesistimiento(dto: DesistimientoDto): Promise<void> {
        await this.estadoTransitionService.transicionarEstado({
            fichaVentaId: dto.fichaVentaId,
            nuevoEstado: EstadoFicha.DESISTIDA,
            usuarioId: dto.usuarioId,
            motivoDesistimiento: dto.motivo,
            observaciones: dto.observaciones,
        });

        // La unidad se libera automáticamente en ejecutarAccionesAutomaticas()
        // No se hace soft delete, se mantiene el registro histórico
    }
}
