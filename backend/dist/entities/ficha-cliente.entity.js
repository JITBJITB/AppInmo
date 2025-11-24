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
exports.FichaCliente = void 0;
const typeorm_1 = require("typeorm");
const ficha_venta_entity_1 = require("./ficha-venta.entity");
const cliente_entity_1 = require("./cliente.entity");
let FichaCliente = class FichaCliente {
    id;
    fichaVentaId;
    fichaVenta;
    clienteId;
    cliente;
    rol;
};
exports.FichaCliente = FichaCliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FichaCliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ficha_venta_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FichaCliente.prototype, "fichaVentaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ficha_venta_entity_1.FichaVenta, (fv) => fv.clientes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ficha_venta_id' }),
    __metadata("design:type", ficha_venta_entity_1.FichaVenta)
], FichaCliente.prototype, "fichaVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FichaCliente.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, (c) => c.fichasAsociadas, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], FichaCliente.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Principal' }),
    __metadata("design:type", String)
], FichaCliente.prototype, "rol", void 0);
exports.FichaCliente = FichaCliente = __decorate([
    (0, typeorm_1.Entity)('ficha_clientes'),
    (0, typeorm_1.Index)(['fichaVenta', 'cliente'], { unique: true })
], FichaCliente);
//# sourceMappingURL=ficha-cliente.entity.js.map