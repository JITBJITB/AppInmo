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
exports.PlanPago = void 0;
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("./ficha-venta.entity");
const cuota_entity_1 = require("./cuota.entity");
let PlanPago = class PlanPago {
    id;
    fichaVentaId;
    fichaVenta;
    tipoPlan;
    montoTotal;
    montoPie;
    montoReserva;
    saldoAPagar;
    numeroCuotas;
    createdAt;
    cuotas;
};
exports.PlanPago = PlanPago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlanPago.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ficha_venta_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], PlanPago.prototype, "fichaVentaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ficha_venta_entity_1.FichaVenta, (fv) => fv.planesPago, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ficha_venta_id' }),
    __metadata("design:type", ficha_venta_entity_1.FichaVenta)
], PlanPago.prototype, "fichaVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_plan' }),
    __metadata("design:type", String)
], PlanPago.prototype, "tipoPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_total', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PlanPago.prototype, "montoTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_pie', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PlanPago.prototype, "montoPie", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_reserva', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PlanPago.prototype, "montoReserva", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'saldo_a_pagar', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PlanPago.prototype, "saldoAPagar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_cuotas' }),
    __metadata("design:type", Number)
], PlanPago.prototype, "numeroCuotas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PlanPago.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cuota_entity_1.Cuota, (cuota) => cuota.planPago),
    __metadata("design:type", Array)
], PlanPago.prototype, "cuotas", void 0);
exports.PlanPago = PlanPago = __decorate([
    (0, typeorm_1.Entity)('planes_pago')
], PlanPago);
//# sourceMappingURL=plan-pago.entity.js.map