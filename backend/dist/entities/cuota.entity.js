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
exports.Cuota = void 0;
const typeorm_1 = require("typeorm");
const plan_pago_entity_1 = require("./plan-pago.entity");
let Cuota = class Cuota {
    id;
    planPagoId;
    planPago;
    numeroCuota;
    montoCuota;
    fechaVencimiento;
    estado;
    fechaPago;
    comprobantePagoUrl;
    createdAt;
};
exports.Cuota = Cuota;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cuota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_pago_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Cuota.prototype, "planPagoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_pago_entity_1.PlanPago, (pp) => pp.cuotas, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_pago_id' }),
    __metadata("design:type", plan_pago_entity_1.PlanPago)
], Cuota.prototype, "planPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_cuota' }),
    __metadata("design:type", Number)
], Cuota.prototype, "numeroCuota", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_cuota', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Cuota.prototype, "montoCuota", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_vencimiento', type: 'date' }),
    __metadata("design:type", Date)
], Cuota.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Pendiente' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Cuota.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_pago', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Cuota.prototype, "fechaPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comprobante_pago_url', nullable: true }),
    __metadata("design:type", String)
], Cuota.prototype, "comprobantePagoUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Cuota.prototype, "createdAt", void 0);
exports.Cuota = Cuota = __decorate([
    (0, typeorm_1.Entity)('cuotas')
], Cuota);
//# sourceMappingURL=cuota.entity.js.map