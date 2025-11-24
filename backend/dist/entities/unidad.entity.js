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
exports.Unidad = void 0;
const typeorm_1 = require("typeorm");
const proyecto_entity_1 = require("./proyecto.entity");
let Unidad = class Unidad {
    id;
    proyectoId;
    proyecto;
    nombre;
    tipologia;
    metrosCuadrados;
    piso;
    valorUf;
    estado;
    reservaExpiraEn;
    createdAt;
};
exports.Unidad = Unidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Unidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proyecto_id' }),
    __metadata("design:type", Number)
], Unidad.prototype, "proyectoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.unidades, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'proyecto_id' }),
    __metadata("design:type", proyecto_entity_1.Proyecto)
], Unidad.prototype, "proyecto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unidad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unidad.prototype, "tipologia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metros_cuadrados', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Unidad.prototype, "metrosCuadrados", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Unidad.prototype, "piso", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_uf', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Unidad.prototype, "valorUf", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Disponible' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Unidad.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reserva_expira_en', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Unidad.prototype, "reservaExpiraEn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Unidad.prototype, "createdAt", void 0);
exports.Unidad = Unidad = __decorate([
    (0, typeorm_1.Entity)('unidades'),
    (0, typeorm_1.Index)(['proyecto', 'nombre'], { unique: true })
], Unidad);
//# sourceMappingURL=unidad.entity.js.map