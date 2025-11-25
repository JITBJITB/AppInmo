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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const documento_cliente_entity_1 = require("./documento-cliente.entity");
const ficha_cliente_entity_1 = require("./ficha-cliente.entity");
let Cliente = class Cliente {
    id;
    nombre1;
    nombre2;
    apellido1;
    apellido2;
    nombreCompleto;
    rut;
    email;
    telefono;
    fechaNacimiento;
    estadoCivil;
    profesion;
    renta;
    nacionalidad;
    direccionCalle;
    direccionNumero;
    direccionComuna;
    direccionCiudad;
    direccionRegion;
    direccionPais;
    createdAt;
    documentos;
    fichasAsociadas;
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_1', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_2', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido_1', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido_2', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_completo', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombreCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Cliente.prototype, "rut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Cliente.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_civil', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "estadoCivil", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "profesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Cliente.prototype, "renta", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nacionalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_calle', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccionCalle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_numero', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccionNumero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_comuna', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccionComuna", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_ciudad', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccionCiudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_region', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccionRegion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_pais', default: 'Chile', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccionPais", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Cliente.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documento_cliente_entity_1.DocumentoCliente, (doc) => doc.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "documentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ficha_cliente_entity_1.FichaCliente, (fc) => fc.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "fichasAsociadas", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)('clientes')
], Cliente);
//# sourceMappingURL=cliente.entity.js.map