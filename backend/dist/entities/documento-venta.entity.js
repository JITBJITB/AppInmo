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
exports.DocumentoVenta = void 0;
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("./ficha-venta.entity");
let DocumentoVenta = class DocumentoVenta {
    id;
    fichaVentaId;
    fichaVenta;
    tipoDocumento;
    urlS3;
    createdAt;
};
exports.DocumentoVenta = DocumentoVenta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentoVenta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ficha_venta_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], DocumentoVenta.prototype, "fichaVentaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ficha_venta_entity_1.FichaVenta, (fv) => fv.documentos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ficha_venta_id' }),
    __metadata("design:type", ficha_venta_entity_1.FichaVenta)
], DocumentoVenta.prototype, "fichaVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_documento' }),
    __metadata("design:type", String)
], DocumentoVenta.prototype, "tipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url_s3', type: 'text' }),
    __metadata("design:type", String)
], DocumentoVenta.prototype, "urlS3", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DocumentoVenta.prototype, "createdAt", void 0);
exports.DocumentoVenta = DocumentoVenta = __decorate([
    (0, typeorm_1.Entity)('documentos_venta')
], DocumentoVenta);
//# sourceMappingURL=documento-venta.entity.js.map