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
exports.FichaVenta = void 0;
const typeorm_1 = require("typeorm");
const unidad_entity_1 = require("./unidad.entity");
const usuario_entity_1 = require("./usuario.entity");
const ficha_cliente_entity_1 = require("./ficha-cliente.entity");
const ficha_adicional_entity_1 = require("./ficha-adicional.entity");
const documento_venta_entity_1 = require("./documento-venta.entity");
const plan_pago_entity_1 = require("./plan-pago.entity");
const escritura_entity_1 = require("./escritura.entity");
const entrega_entity_1 = require("./entrega.entity");
const estado_ficha_enum_1 = require("../sales/enums/estado-ficha.enum");
let FichaVenta = class FichaVenta {
    id;
    folio;
    unidadId;
    unidad;
    agenteId;
    agente;
    estadoFicha;
    valorTotalUf;
    descuentoPorcentaje;
    valorDescuentoUf;
    bonoPie;
    creditoFunditMonto;
    hasFundit;
    estadoEscritura;
    bancoHipotecario;
    montoHipotecario;
    fechaFirmaEscrituraCliente;
    estadoEntrega;
    comisionBrokerMonto;
    estadoComisionBroker;
    createdAt;
    clientes;
    adicionales;
    documentos;
    planesPago;
    escritura;
    entrega;
};
exports.FichaVenta = FichaVenta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FichaVenta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FichaVenta.prototype, "folio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unidad_id' }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "unidadId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unidad_entity_1.Unidad, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'unidad_id' }),
    __metadata("design:type", unidad_entity_1.Unidad)
], FichaVenta.prototype, "unidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agente_id' }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "agenteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'agente_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], FichaVenta.prototype, "agente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estado_ficha_enum_1.EstadoFicha, default: estado_ficha_enum_1.EstadoFicha.BORRADOR, name: 'estado_ficha' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], FichaVenta.prototype, "estadoFicha", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_total_uf', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "valorTotalUf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descuento_porcentaje', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "descuentoPorcentaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_descuento_uf', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "valorDescuentoUf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bono_pie', default: false }),
    __metadata("design:type", Boolean)
], FichaVenta.prototype, "bonoPie", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credito_fundit_monto', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "creditoFunditMonto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_fundit', default: false }),
    __metadata("design:type", Boolean)
], FichaVenta.prototype, "hasFundit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_escritura', default: 'Pendiente' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], FichaVenta.prototype, "estadoEscritura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'banco_hipotecario', nullable: true }),
    __metadata("design:type", String)
], FichaVenta.prototype, "bancoHipotecario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_hipotecario', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "montoHipotecario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_firma_escritura_cliente', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], FichaVenta.prototype, "fechaFirmaEscrituraCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_entrega', default: 'Pendiente' }),
    __metadata("design:type", String)
], FichaVenta.prototype, "estadoEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comision_broker_monto', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FichaVenta.prototype, "comisionBrokerMonto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_comision_broker', default: 'Pendiente' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], FichaVenta.prototype, "estadoComisionBroker", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], FichaVenta.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ficha_cliente_entity_1.FichaCliente, (fc) => fc.fichaVenta),
    __metadata("design:type", Array)
], FichaVenta.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ficha_adicional_entity_1.FichaAdicional, (fa) => fa.fichaVenta),
    __metadata("design:type", Array)
], FichaVenta.prototype, "adicionales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documento_venta_entity_1.DocumentoVenta, (dv) => dv.fichaVenta),
    __metadata("design:type", Array)
], FichaVenta.prototype, "documentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_pago_entity_1.PlanPago, (pp) => pp.fichaVenta),
    __metadata("design:type", Array)
], FichaVenta.prototype, "planesPago", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => escritura_entity_1.Escritura, (e) => e.fichaVenta),
    __metadata("design:type", escritura_entity_1.Escritura)
], FichaVenta.prototype, "escritura", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entrega_entity_1.Entrega, (e) => e.fichaVenta),
    __metadata("design:type", entrega_entity_1.Entrega)
], FichaVenta.prototype, "entrega", void 0);
exports.FichaVenta = FichaVenta = __decorate([
    (0, typeorm_1.Entity)('fichas_venta')
], FichaVenta);
//# sourceMappingURL=ficha-venta.entity.js.map