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
            });
            if (!unidad) {
                throw new common_1.BadRequestException('Unidad no encontrada');
            }
            if (unidad.estado !== 'Disponible') {
                throw new common_1.BadRequestException('La unidad ya no está disponible');
            }
            unidad.estado = 'Reservada';
            await queryRunner.manager.save(unidad);
            const ficha = new ficha_venta_entity_1.FichaVenta();
            ficha.folio = `F-${Date.now()}`;
            ficha.estadoFicha = 'Borrador';
            ficha.unidad = unidad;
            ficha.agenteId = userId;
            ficha.valorTotalUf = unidad.valorUf;
            ficha.bonoPie = false;
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
            plan.montoTotal = unidad.valorUf;
            plan.montoPie = data.pieMonto || 0;
            plan.montoReserva = data.reservaMonto || 0;
            plan.saldoAPagar = plan.montoTotal - plan.montoPie - plan.montoReserva;
            plan.tipoPlan = 'Crédito Directo';
            plan.numeroCuotas = data.cuotas ? data.cuotas.length : 1;
            const savedPlan = await queryRunner.manager.save(plan_pago_entity_1.PlanPago, plan);
            if (data.cuotas && Array.isArray(data.cuotas)) {
                for (const c of data.cuotas) {
                    const cuota = new cuota_entity_1.Cuota();
                    cuota.planPago = savedPlan;
                    cuota.numeroCuota = c.numero;
                    cuota.montoCuota = c.monto;
                    cuota.fechaVencimiento = new Date(c.fechaVencimiento);
                    cuota.estado = 'Pendiente';
                    await queryRunner.manager.save(cuota_entity_1.Cuota, cuota);
                }
            }
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
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SalesService);
//# sourceMappingURL=sales.service.js.map