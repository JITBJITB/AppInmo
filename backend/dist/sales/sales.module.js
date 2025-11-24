"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const sales_controller_1 = require("./sales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ficha_venta_entity_1 = require("../entities/ficha-venta.entity");
const unidad_entity_1 = require("../entities/unidad.entity");
const cliente_entity_1 = require("../entities/cliente.entity");
const ficha_cliente_entity_1 = require("../entities/ficha-cliente.entity");
const plan_pago_entity_1 = require("../entities/plan-pago.entity");
const cuota_entity_1 = require("../entities/cuota.entity");
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ficha_venta_entity_1.FichaVenta, unidad_entity_1.Unidad, cliente_entity_1.Cliente, ficha_cliente_entity_1.FichaCliente, plan_pago_entity_1.PlanPago, cuota_entity_1.Cuota])],
        providers: [sales_service_1.SalesService],
        controllers: [sales_controller_1.SalesController],
        exports: [sales_service_1.SalesService]
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map