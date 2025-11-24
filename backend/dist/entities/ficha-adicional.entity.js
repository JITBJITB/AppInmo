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
exports.FichaAdicional = void 0;
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("./ficha-venta.entity");
const adicional_entity_1 = require("./adicional.entity");
let FichaAdicional = class FichaAdicional {
    id;
    fichaVentaId;
    fichaVenta;
    adicionalId;
    adicional;
};
exports.FichaAdicional = FichaAdicional;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FichaAdicional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ficha_venta_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FichaAdicional.prototype, "fichaVentaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ficha_venta_entity_1.FichaVenta, (fv) => fv.adicionales, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ficha_venta_id' }),
    __metadata("design:type", ficha_venta_entity_1.FichaVenta)
], FichaAdicional.prototype, "fichaVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'adicional_id' }),
    __metadata("design:type", Number)
], FichaAdicional.prototype, "adicionalId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => adicional_entity_1.Adicional, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'adicional_id' }),
    __metadata("design:type", adicional_entity_1.Adicional)
], FichaAdicional.prototype, "adicional", void 0);
exports.FichaAdicional = FichaAdicional = __decorate([
    (0, typeorm_1.Entity)('ficha_adicionales'),
    (0, typeorm_1.Index)(['fichaVenta', 'adicional'], { unique: true })
], FichaAdicional);
//# sourceMappingURL=ficha-adicional.entity.js.map