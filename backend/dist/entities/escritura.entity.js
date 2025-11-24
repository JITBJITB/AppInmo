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
exports.Escritura = void 0;
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("./ficha-venta.entity");
let Escritura = class Escritura {
    id;
    fichaId;
    fichaVenta;
    estado;
    notaria;
    repertorio;
    fechaFirma;
    fechaInscripcion;
    observaciones;
    createdAt;
    updatedAt;
};
exports.Escritura = Escritura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Escritura.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ficha_id' }),
    __metadata("design:type", Number)
], Escritura.prototype, "fichaId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ficha_venta_entity_1.FichaVenta),
    (0, typeorm_1.JoinColumn)({ name: 'ficha_id' }),
    __metadata("design:type", ficha_venta_entity_1.FichaVenta)
], Escritura.prototype, "fichaVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'En Redacción' }),
    __metadata("design:type", String)
], Escritura.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Escritura.prototype, "notaria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repertorio', nullable: true }),
    __metadata("design:type", String)
], Escritura.prototype, "repertorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_firma', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Escritura.prototype, "fechaFirma", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inscripcion', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Escritura.prototype, "fechaInscripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Escritura.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Escritura.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Escritura.prototype, "updatedAt", void 0);
exports.Escritura = Escritura = __decorate([
    (0, typeorm_1.Entity)('escrituras')
], Escritura);
//# sourceMappingURL=escritura.entity.js.map