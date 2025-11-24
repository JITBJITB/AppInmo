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
exports.Entrega = void 0;
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("./ficha-venta.entity");
let Entrega = class Entrega {
    id;
    fichaId;
    fichaVenta;
    fechaProgramada;
    fechaReal;
    firmada;
    observaciones;
    createdAt;
    updatedAt;
};
exports.Entrega = Entrega;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Entrega.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ficha_id' }),
    __metadata("design:type", Number)
], Entrega.prototype, "fichaId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ficha_venta_entity_1.FichaVenta),
    (0, typeorm_1.JoinColumn)({ name: 'ficha_id' }),
    __metadata("design:type", ficha_venta_entity_1.FichaVenta)
], Entrega.prototype, "fichaVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_programada', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Entrega.prototype, "fechaProgramada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_real', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Entrega.prototype, "fechaReal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Entrega.prototype, "firmada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Entrega.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Entrega.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Entrega.prototype, "updatedAt", void 0);
exports.Entrega = Entrega = __decorate([
    (0, typeorm_1.Entity)('entregas')
], Entrega);
//# sourceMappingURL=entrega.entity.js.map