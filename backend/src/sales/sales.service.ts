import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Unidad } from '../entities/unidad.entity';
import { Cliente } from '../entities/cliente.entity';
import { FichaCliente } from '../entities/ficha-cliente.entity';
import { PlanPago } from '../entities/plan-pago.entity';
import { Cuota } from '../entities/cuota.entity';

@Injectable()
export class SalesService {
    constructor(private dataSource: DataSource) { }

    async createFicha(data: any, userId: number): Promise<FichaVenta> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Verificar y Bloquear Unidad
            const unidad = await queryRunner.manager.findOne(Unidad, {
                where: { id: data.unidadId },
                lock: { mode: 'pessimistic_write' },
            });

            if (!unidad) {
                throw new BadRequestException('Unidad no encontrada');
            }

            if (unidad.estado !== 'Disponible') {
                throw new BadRequestException('La unidad ya no está disponible');
            }

            unidad.estado = 'Reservada';
            await queryRunner.manager.save(unidad);

            // 2. Crear Ficha Venta
            const ficha = new FichaVenta();
            ficha.folio = `F-${Date.now()}`;
            ficha.estadoFicha = 'Borrador';
            ficha.unidad = unidad;
            ficha.agenteId = userId;
            ficha.valorTotalUf = unidad.valorUf;
            ficha.bonoPie = false;

            const savedFicha = await queryRunner.manager.save(FichaVenta, ficha);

            // 3. Asociar Cliente (FichaCliente)
            const cliente = await queryRunner.manager.findOne(Cliente, { where: { id: data.clienteId } });
            if (!cliente) throw new BadRequestException('Cliente no encontrado');

            const fichaCliente = new FichaCliente();
            fichaCliente.fichaVenta = savedFicha;
            fichaCliente.cliente = cliente;
            fichaCliente.rol = 'Principal';
            await queryRunner.manager.save(FichaCliente, fichaCliente);

            // 4. Crear Plan de Pago
            const plan = new PlanPago();
            plan.fichaVenta = savedFicha;
            plan.montoTotal = unidad.valorUf;
            plan.montoPie = data.pieMonto || 0;
            plan.montoReserva = data.reservaMonto || 0;
            plan.saldoAPagar = plan.montoTotal - plan.montoPie - plan.montoReserva;
            plan.tipoPlan = 'Crédito Directo';
            plan.numeroCuotas = data.cuotas ? data.cuotas.length : 1;

            const savedPlan = await queryRunner.manager.save(PlanPago, plan);

            // 5. Crear Cuotas
            if (data.cuotas && Array.isArray(data.cuotas)) {
                for (const c of data.cuotas) {
                    const cuota = new Cuota();
                    cuota.planPago = savedPlan;
                    cuota.numeroCuota = c.numero;
                    cuota.montoCuota = c.monto;
                    cuota.fechaVencimiento = new Date(c.fechaVencimiento);
                    cuota.estado = 'Pendiente';
                    await queryRunner.manager.save(Cuota, cuota);
                }
            }

            await queryRunner.commitTransaction();
            return savedFicha;

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(err.message);
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(): Promise<FichaVenta[]> {
        return this.dataSource.getRepository(FichaVenta).find({
            relations: ['unidad', 'clientes', 'clientes.cliente']
        });
    }

    async findOne(id: number): Promise<FichaVenta> {
        const ficha = await this.dataSource.getRepository(FichaVenta).findOne({
            where: { id },
            relations: ['unidad', 'clientes', 'clientes.cliente', 'planesPago', 'planesPago.cuotas']
        });
        if (!ficha) throw new NotFoundException('Venta no encontrada');
        return ficha;
    }
}
