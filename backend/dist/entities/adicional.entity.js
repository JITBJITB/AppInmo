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
exports.Adicional = void 0;
const typeorm_1 = require("typeorm");
const proyecto_entity_1 = require("./proyecto.entity");
let Adicional = class Adicional {
    id;
    proyectoId;
    proyecto;
    tipo;
    nombre;
    valorUf;
    estado;
    createdAt;
};
exports.Adicional = Adicional;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Adicional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proyecto_id' }),
    __metadata("design:type", Number)
], Adicional.prototype, "proyectoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.adicionales, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'proyecto_id' }),
    __metadata("design:type", proyecto_entity_1.Proyecto)
], Adicional.prototype, "proyecto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adicional.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adicional.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_uf', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Adicional.prototype, "valorUf", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Disponible' }),
    __metadata("design:type", String)
], Adicional.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Adicional.prototype, "createdAt", void 0);
exports.Adicional = Adicional = __decorate([
    (0, typeorm_1.Entity)('adicionales'),
    (0, typeorm_1.Index)(['proyecto', 'tipo', 'nombre'], { unique: true })
], Adicional);
//# sourceMappingURL=adicional.entity.js.map