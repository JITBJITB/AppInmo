"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSalesModule = void 0;
const common_1 = require("@nestjs/common");
const post_sales_service_1 = require("./post-sales.service");
const post_sales_controller_1 = require("./post-sales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const escritura_entity_1 = require("../entities/escritura.entity");
const entrega_entity_1 = require("../entities/entrega.entity");
const ficha_venta_entity_1 = require("../entities/ficha-venta.entity");
let PostSalesModule = class PostSalesModule {
};
exports.PostSalesModule = PostSalesModule;
exports.PostSalesModule = PostSalesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([escritura_entity_1.Escritura, entrega_entity_1.Entrega, ficha_venta_entity_1.FichaVenta])],
        providers: [post_sales_service_1.PostSalesService],
        controllers: [post_sales_controller_1.PostSalesController]
    })
], PostSalesModule);
//# sourceMappingURL=post-sales.module.js.map