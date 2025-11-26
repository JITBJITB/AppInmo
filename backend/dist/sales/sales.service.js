"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("../entities/ficha-venta.entity");
const unidad_entity_1 = require("../entities/unidad.entity");
const cliente_entity_1 = require("../entities/cliente.entity");
const ficha_cliente_entity_1 = require("../entities/ficha-cliente.entity");
const plan_pago_entity_1 = require("../entities/plan-pago.entity");
const cuota_entity_1 = require("../entities/cuota.entity");
const estado_ficha_enum_1 = require("./enums/estado-ficha.enum");
const adicional_entity_1 = require("../entities/adicional.entity");
let SalesService = class SalesService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createFicha(data, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const unidad = await queryRunner.manager.findOne(unidad_entity_1.Unidad, {
                where: { id: data.unidadId },
                lock: { mode: 'pessimistic_write' },
                relations: ['proyecto']
            });
            if (!unidad) {
                throw new common_1.BadRequestException('Unidad no encontrada');
            }
            if (unidad.estado !== 'Disponible') {
                throw new common_1.BadRequestException('La unidad ya no está disponible');
            }
            const valorBase = Number(unidad.valorUf);
            let descuentoMonto = 0;
            if (data.descuentoPorcentaje && data.descuentoPorcentaje > 0) {
                descuentoMonto = valorBase * (data.descuentoPorcentaje / 100);
            }
            const valorConDescuento = valorBase - descuentoMonto;
            let valorEstacionamiento = 0;
            let valorBodega = 0;
            if (data.incluyeEstacionamiento) {
                const estacionamiento = await queryRunner.manager.findOne(adicional_entity_1.Adicional, {
                    where: { proyectoId: unidad.proyectoId, tipo: 'Estacionamiento', estado: 'Disponible' }
                });
                if (estacionamiento) {
                    valorEstacionamiento = Number(estacionamiento.valorUf);
                }
            }
            if (data.incluyeBodega) {
                const bodega = await queryRunner.manager.findOne(adicional_entity_1.Adicional, {
                    where: { proyectoId: unidad.proyectoId, tipo: 'Bodega', estado: 'Disponible' }
                });
                if (bodega) {
                    valorBodega = Number(bodega.valorUf);
                }
            }
            const subtotal = valorConDescuento + valorEstacionamiento + valorBodega;
            let aporteMonto = 0;
            if (data.usaAporteInmobiliaria) {
                aporteMonto = subtotal * 0.10;
            }
            const valorTotal = subtotal + aporteMonto;
            const formaPagoSum = Number(data.formaPago.reserva) +
                Number(data.formaPago.ahorro) +
                Number(data.formaPago.aporteInmobiliario) +
                Number(data.formaPago.creditoFundit) +
                Number(data.formaPago.creditoHipotecario);
            if (Math.abs(formaPagoSum - valorTotal) > 0.01) {
                throw new common_1.BadRequestException(`La suma de la forma de pago (${formaPagoSum}) no coincide con el valor total (${valorTotal})`);
            }
            unidad.estado = 'Reservada';
            await queryRunner.manager.save(unidad);
            const ficha = new ficha_venta_entity_1.FichaVenta();
            ficha.folio = `F-${Date.now()}`;
            ficha.estadoFicha = estado_ficha_enum_1.EstadoFicha.BORRADOR;
            ficha.unidad = unidad;
            ficha.agenteId = userId;
            ficha.valorTotalUf = valorTotal;
            ficha.descuentoPorcentaje = data.descuentoPorcentaje || 0;
            ficha.valorDescuentoUf = descuentoMonto;
            ficha.bonoPie = data.usaAporteInmobiliaria;
            ficha.hasFundit = data.formaPago.creditoFundit > 0;
            ficha.creditoFunditMonto = data.formaPago.creditoFundit;
            ficha.montoHipotecario = data.formaPago.creditoHipotecario;
            const savedFicha = await queryRunner.manager.save(ficha_venta_entity_1.FichaVenta, ficha);
            const cliente = await queryRunner.manager.findOne(cliente_entity_1.Cliente, { where: { id: data.clienteId } });
            if (!cliente)
                throw new common_1.BadRequestException('Cliente no encontrado');
            const fichaCliente = new ficha_cliente_entity_1.FichaCliente();
            fichaCliente.fichaVenta = savedFicha;
            fichaCliente.cliente = cliente;
            fichaCliente.rol = 'Principal';
            await queryRunner.manager.save(ficha_cliente_entity_1.FichaCliente, fichaCliente);
            const plan = new plan_pago_entity_1.PlanPago();
            plan.fichaVenta = savedFicha;
            plan.montoTotal = valorTotal;
            plan.montoPie = data.formaPago.ahorro;
            plan.montoReserva = data.formaPago.reserva;
            plan.saldoAPagar = valorTotal - plan.montoPie - plan.montoReserva;
            plan.tipoPlan = 'Mixto';
            plan.numeroCuotas = 1;
            await queryRunner.manager.save(plan_pago_entity_1.PlanPago, plan);
            await queryRunner.commitTransaction();
            return savedFicha;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async generateCotizacion(data) {
        const unidad = await this.dataSource.getRepository(unidad_entity_1.Unidad).findOne({
            where: { id: data.unidadId },
            relations: ['proyecto']
        });
        if (!unidad)
            throw new common_1.BadRequestException('Unidad no encontrada');
        const cliente = await this.dataSource.getRepository(cliente_entity_1.Cliente).findOne({ where: { id: data.clienteId } });
        if (!cliente)
            throw new common_1.BadRequestException('Cliente no encontrado');
        const valorBase = Number(unidad.valorUf);
        let descuentoMonto = 0;
        if (data.descuentoPorcentaje && data.descuentoPorcentaje > 0) {
            descuentoMonto = valorBase * (data.descuentoPorcentaje / 100);
        }
        const valorConDescuento = valorBase - descuentoMonto;
        let valorEstacionamiento = 0;
        if (data.incluyeEstacionamiento) {
            const est = await this.dataSource.getRepository(adicional_entity_1.Adicional).findOne({ where: { proyectoId: unidad.proyectoId, tipo: 'Estacionamiento' } });
            if (est)
                valorEstacionamiento = Number(est.valorUf);
        }
        let valorBodega = 0;
        if (data.incluyeBodega) {
            const bod = await this.dataSource.getRepository(adicional_entity_1.Adicional).findOne({ where: { proyectoId: unidad.proyectoId, tipo: 'Bodega' } });
            if (bod)
                valorBodega = Number(bod.valorUf);
        }
        const subtotal = valorConDescuento + valorEstacionamiento + valorBodega;
        let aporteMonto = 0;
        if (data.usaAporteInmobiliaria) {
            aporteMonto = subtotal * 0.10;
        }
        const valorTotal = subtotal + aporteMonto;
        return {
            clienteNombre: cliente.nombreCompleto || `${cliente.nombre1} ${cliente.apellido1}`,
            clienteRut: cliente.rut,
            proyectoNombre: unidad.proyecto.nombre,
            unidadNumero: unidad.nombre,
            unidadTipo: unidad.tipologia,
            valorBaseUf: valorBase,
            descuentoPorcentaje: data.descuentoPorcentaje,
            valorDescuentoUf: descuentoMonto,
            valorConDescuentoUf: valorConDescuento,
            valorEstacionamientoUf: valorEstacionamiento,
            valorBodegaUf: valorBodega,
            subtotalUf: subtotal,
            valorAporteInmobiliariaUf: aporteMonto,
            valorTotalUf: valorTotal,
            formaPago: data.formaPago,
            fechaCotizacion: new Date()
        };
    }
    async findAll() {
        return this.dataSource.getRepository(ficha_venta_entity_1.FichaVenta).find({
            relations: ['unidad', 'clientes', 'clientes.cliente']
        });
    }
    async findOne(id) {
        const ficha = await this.dataSource.getRepository(ficha_venta_entity_1.FichaVenta).findOne({
            where: { id },
            relations: ['unidad', 'clientes', 'clientes.cliente', 'planesPago', 'planesPago.cuotas']
        });
        if (!ficha)
            throw new common_1.NotFoundException('Venta no encontrada');
        return ficha;
    }
    async approveFicha(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const ficha = await queryRunner.manager.findOne(ficha_venta_entity_1.FichaVenta, { where: { id } });
            if (!ficha)
                throw new common_1.NotFoundException('Venta no encontrada');
            ficha.estadoFicha = estado_ficha_enum_1.EstadoFicha.PROMESA;
            await queryRunner.manager.save(ficha_venta_entity_1.FichaVenta, ficha);
            if (ficha.hasFundit) {
                const plan = new plan_pago_entity_1.PlanPago();
                plan.fichaVenta = ficha;
                plan.tipoPlan = 'Fundit';
                plan.montoTotal = ficha.creditoFunditMonto;
                plan.numeroCuotas = 60;
                plan.saldoAPagar = ficha.creditoFunditMonto;
                plan.montoPie = 0;
                plan.montoReserva = 0;
                const savedPlan = await queryRunner.manager.save(plan_pago_entity_1.PlanPago, plan);
                const cuotaValue = ficha.creditoFunditMonto / 60;
                const today = new Date();
                for (let i = 1; i <= 60; i++) {
                    const cuota = new cuota_entity_1.Cuota();
                    cuota.planPago = savedPlan;
                    cuota.numeroCuota = i;
                    cuota.montoCuota = cuotaValue;
                    const vencimiento = new Date(today);
                    vencimiento.setMonth(vencimiento.getMonth() + i);
                    cuota.fechaVencimiento = vencimiento;
                    cuota.estado = 'Pendiente';
                    await queryRunner.manager.save(cuota_entity_1.Cuota, cuota);
                }
            }
            await queryRunner.commitTransaction();
            return ficha;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SalesService);
//# sourceMappingURL=sales.service.js.map