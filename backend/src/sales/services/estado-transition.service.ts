import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { FichaVenta } from '../../entities/ficha-venta.entity';
import { EstadoHistorial } from '../../entities/estado-historial.entity';
import { Unidad } from '../../entities/unidad.entity';
import { Comision } from '../../entities/comision.entity';
import { Usuario } from '../../entities/usuario.entity';
import { EstadoFicha } from '../enums/estado-ficha.enum';
import { EstadoUnidad } from '../../entities/enums/estado-unidad.enum';
import { TipoDocumentoCliente } from '../../entities/enums/tipo-documento-cliente.enum';

export interface TransicionEstadoDto {
    fichaVentaId: number;
    nuevoEstado: EstadoFicha;
    usuarioId: number;
    motivoDesistimiento?: string;
    observaciones?: string;
}

@Injectable()
export class EstadoTransitionService {
    constructor(
        @InjectRepository(FichaVenta)
        private fichaVentaRepo: Repository<FichaVenta>,
        @InjectRepository(EstadoHistorial)
        private historialRepo: Repository<EstadoHistorial>,
        @InjectRepository(Unidad)
        private unidadRepo: Repository<Unidad>,
        @InjectRepository(Comision)
        private comisionRepo: Repository<Comision>,
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
        private dataSource: DataSource,
    ) { }

    /**
     * Transición de estado con validación y acciones automáticas
     */
    async transicionarEstado(dto: TransicionEstadoDto): Promise<FichaVenta> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Obtener ficha actual
            const ficha = await this.fichaVentaRepo.findOne({
                where: { id: dto.fichaVentaId },
                relations: ['unidad', 'agente'],
            });

            if (!ficha) {
                throw new BadRequestException('Ficha de venta no encontrada');
            }

            const estadoAnterior = ficha.estadoFicha;

            // 2. Validar transición permitida
            this.validarTransicion(estadoAnterior, dto.nuevoEstado);

            // 3. Validar condiciones específicas
            await this.validarCondiciones(ficha, dto.nuevoEstado);

            // 4. Actualizar estado de la ficha
            ficha.estadoFicha = dto.nuevoEstado;
            await queryRunner.manager.save(ficha);

            // 5. Registrar en historial (AUDIT LOG)
            const historial = this.historialRepo.create({
                fichaVentaId: ficha.id,
                estadoAnterior: estadoAnterior,
                estadoNuevo: dto.nuevoEstado,
                usuarioId: dto.usuarioId,
                motivoDesistimiento: dto.motivoDesistimiento,
                observaciones: dto.observaciones,
            });
            await queryRunner.manager.save(historial);

            // 6. Ejecutar acciones automáticas según nuevo estado
            await this.ejecutarAccionesAutomaticas(
                queryRunner,
                ficha,
                dto.nuevoEstado,
                estadoAnterior,
            );

            await queryRunner.commitTransaction();
            return ficha;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Validar que la transición sea permitida
     */
    private validarTransicion(estadoActual: EstadoFicha, nuevoEstado: EstadoFicha): void {
        const transicionesPermitidas: Record<EstadoFicha, EstadoFicha[]> = {
            [EstadoFicha.BORRADOR]: [EstadoFicha.RESERVA, EstadoFicha.DESISTIDA],
            [EstadoFicha.RESERVA]: [EstadoFicha.PROMESA, EstadoFicha.DESISTIDA, EstadoFicha.VENCIDA],
            [EstadoFicha.PROMESA]: [EstadoFicha.ESCRITURADO, EstadoFicha.DESISTIDA],
            [EstadoFicha.ESCRITURADO]: [],
            [EstadoFicha.VENCIDA]: [],
            [EstadoFicha.DESISTIDA]: [],
        };

        const permitidas = transicionesPermitidas[estadoActual] || [];

        if (!permitidas.includes(nuevoEstado)) {
            throw new ForbiddenException(
                `No se puede cambiar de ${estadoActual} a ${nuevoEstado}`
            );
        }
    }

    /**
     * Validar condiciones específicas para cada transición
     */
    private async validarCondiciones(ficha: FichaVenta, nuevoEstado: EstadoFicha): Promise<void> {
        switch (nuevoEstado) {
            case EstadoFicha.RESERVA:
                // Validar que la unidad esté disponible
                if (ficha.unidad.estado !== EstadoUnidad.DISPONIBLE) {
                    throw new BadRequestException('La unidad no está disponible');
                }
                break;

            case EstadoFicha.PROMESA:
                // Validar que todos los documentos del cliente estén completos
                const docsCompletos = await this.validarDocumentosCompletos(ficha);
                if (!docsCompletos) {
                    throw new BadRequestException('Documentos del cliente incompletos');
                }
                break;

            case EstadoFicha.ESCRITURADO:
                // Validar que exista fecha de firma de escritura
                if (!ficha.fechaFirmaEscrituraCliente) {
                    throw new BadRequestException('Falta fecha de firma de escritura');
                }
                break;

            case EstadoFicha.DESISTIDA:
                // No requiere validaciones adicionales
                break;
        }
    }

    /**
     * Ejecutar acciones automáticas según el nuevo estado
     */
    private async ejecutarAccionesAutomaticas(
        queryRunner: any,
        ficha: FichaVenta,
        nuevoEstado: EstadoFicha,
        estadoAnterior: EstadoFicha,
    ): Promise<void> {
        const unidad = await this.unidadRepo.findOne({ where: { id: ficha.unidadId } });

        if (!unidad) {
            throw new BadRequestException('Unidad no encontrada');
        }

        switch (nuevoEstado) {
            case EstadoFicha.RESERVA:
                // Cambiar unidad a RESERVADA
                unidad.estado = EstadoUnidad.RESERVADA;
                // Establecer timer de expiración (30 días)
                const expiracion = new Date();
                expiracion.setDate(expiracion.getDate() + 30);
                unidad.reservaExpiraEn = expiracion;
                await queryRunner.manager.save(unidad);
                break;

            case EstadoFicha.ESCRITURADO:
                // Cambiar unidad a VENDIDA
                unidad.estado = EstadoUnidad.VENDIDA;
                unidad.reservaExpiraEn = null as any;
                await queryRunner.manager.save(unidad);

                // Generar comisión automáticamente
                await this.generarComision(queryRunner, ficha);
                break;

            case EstadoFicha.DESISTIDA:
            case EstadoFicha.VENCIDA:
                // Liberar unidad (volver a DISPONIBLE)
                unidad.estado = EstadoUnidad.DISPONIBLE;
                unidad.reservaExpiraEn = null as any;
                await queryRunner.manager.save(unidad);
                break;
        }
    }

    /**
     * Generar comisión al escriturar
     */
    private async generarComision(queryRunner: any, ficha: FichaVenta): Promise<void> {
        // Obtener datos bancarios del broker para obtener % comisión
        const broker = await this.usuarioRepo.findOne({
            where: { id: ficha.agenteId },
            relations: ['datosBancarios'],
        });

        if (!broker) {
            throw new BadRequestException('Broker no encontrado');
        }

        const porcentaje = broker['datosBancarios']?.comisionPorcentaje || 2.5; // Default 2.5%
        const montoFijo = broker['datosBancarios']?.comisionMontoFijo || 0;

        const montoComision = montoFijo > 0
            ? montoFijo
            : (Number(ficha.valorTotalUf) * porcentaje) / 100;

        const comision = this.comisionRepo.create({
            broker: broker,
            monto: montoComision,
            porcentaje: porcentaje,
            estado: 'Pendiente',
        } as any);

        await queryRunner.manager.save(comision);

        // Actualizar campos en ficha
        ficha.comisionBrokerMonto = montoComision;
        ficha.estadoComisionBroker = 'Pendiente';
        await queryRunner.manager.save(ficha);
    }

    /**
     * Validar que documentos del cliente estén completos
     */
    private async validarDocumentosCompletos(ficha: FichaVenta): Promise<boolean> {
        // Obtener clientes asociados a la ficha
        const fichaConClientes = await this.fichaVentaRepo.findOne({
            where: { id: ficha.id },
            relations: ['clientes', 'clientes.cliente', 'clientes.cliente.documentos'],
        });

        if (!fichaConClientes?.clientes?.length) {
            return false;
        }

        for (const fichaCliente of fichaConClientes.clientes) {
            const docs = fichaCliente.cliente.documentos;

            // Validar documentos requeridos
            const tiposRequeridos = [
                TipoDocumentoCliente.CARNET,
                TipoDocumentoCliente.APROBACION_BANCARIA,
                TipoDocumentoCliente.CMF,
                TipoDocumentoCliente.AHORRO,
                TipoDocumentoCliente.CARPETA_TRIBUTARIA,
            ];

            for (const tipo of tiposRequeridos) {
                const existe = docs.some(d => d.tipoDocumento === tipo);
                if (!existe) return false;
            }

            // Validar 6 liquidaciones
            const liquidaciones = docs.filter(d => d.tipoDocumento === TipoDocumentoCliente.LIQUIDACION_SUELDO);
            if (liquidaciones.length < 6) return false;
        }

        return true;
    }

    /**
     * Obtener historial de cambios de estado de una ficha
     */
    async obtenerHistorial(fichaVentaId: number): Promise<EstadoHistorial[]> {
        return this.historialRepo.find({
            where: { fichaVentaId },
            relations: ['usuario'],
            order: { fechaCambio: 'DESC' },
        });
    }
}
