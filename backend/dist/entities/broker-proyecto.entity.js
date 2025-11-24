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
exports.BrokerProyecto = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const proyecto_entity_1 = require("./proyecto.entity");
let BrokerProyecto = class BrokerProyecto {
    id;
    brokerId;
    broker;
    proyectoId;
    proyecto;
};
exports.BrokerProyecto = BrokerProyecto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BrokerProyecto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'broker_id' }),
    __metadata("design:type", Number)
], BrokerProyecto.prototype, "brokerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.proyectosAsignados, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'broker_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], BrokerProyecto.prototype, "broker", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proyecto_id' }),
    __metadata("design:type", Number)
], BrokerProyecto.prototype, "proyectoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.brokersAsignados, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proyecto_id' }),
    __metadata("design:type", proyecto_entity_1.Proyecto)
], BrokerProyecto.prototype, "proyecto", void 0);
exports.BrokerProyecto = BrokerProyecto = __decorate([
    (0, typeorm_1.Entity)('broker_proyectos'),
    (0, typeorm_1.Index)(['broker', 'proyecto'], { unique: true })
], BrokerProyecto);
//# sourceMappingURL=broker-proyecto.entity.js.map