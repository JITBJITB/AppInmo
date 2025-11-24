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
exports.DocumentoCliente = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("./cliente.entity");
let DocumentoCliente = class DocumentoCliente {
    id;
    clienteId;
    cliente;
    tipoDocumento;
    urlS3;
    estadoValidacion;
    observacionRechazo;
    createdAt;
};
exports.DocumentoCliente = DocumentoCliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentoCliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], DocumentoCliente.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, (cliente) => cliente.documentos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], DocumentoCliente.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_documento' }),
    __metadata("design:type", String)
], DocumentoCliente.prototype, "tipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url_s3', type: 'text' }),
    __metadata("design:type", String)
], DocumentoCliente.prototype, "urlS3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_validacion', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocumentoCliente.prototype, "estadoValidacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observacion_rechazo', type: 'text', nullable: true }),
    __metadata("design:type", String)
], DocumentoCliente.prototype, "observacionRechazo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DocumentoCliente.prototype, "createdAt", void 0);
exports.DocumentoCliente = DocumentoCliente = __decorate([
    (0, typeorm_1.Entity)('documentos_cliente')
], DocumentoCliente);
//# sourceMappingURL=documento-cliente.entity.js.map