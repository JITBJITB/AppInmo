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
exports.Proyecto = void 0;
const typeorm_1 = require("typeorm");
const unidad_entity_1 = require("./unidad.entity");
const adicional_entity_1 = require("./adicional.entity");
const broker_proyecto_entity_1 = require("./broker-proyecto.entity");
let Proyecto = class Proyecto {
    id;
    nombre;
    direccion;
    comuna;
    imagenPrincipalUrl;
    createdAt;
    unidades;
    adicionales;
    brokersAsignados;
};
exports.Proyecto = Proyecto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Proyecto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "comuna", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imagen_principal_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "imagenPrincipalUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Proyecto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => unidad_entity_1.Unidad, (unidad) => unidad.proyecto),
    __metadata("design:type", Array)
], Proyecto.prototype, "unidades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => adicional_entity_1.Adicional, (adicional) => adicional.proyecto),
    __metadata("design:type", Array)
], Proyecto.prototype, "adicionales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => broker_proyecto_entity_1.BrokerProyecto, (bp) => bp.proyecto),
    __metadata("design:type", Array)
], Proyecto.prototype, "brokersAsignados", void 0);
exports.Proyecto = Proyecto = __decorate([
    (0, typeorm_1.Entity)('proyectos')
], Proyecto);
//# sourceMappingURL=proyecto.entity.js.map