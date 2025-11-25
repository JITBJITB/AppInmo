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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const broker_proyecto_entity_1 = require("./broker-proyecto.entity");
const broker_company_entity_1 = require("./broker-company.entity");
const roles_enum_1 = require("../auth/roles.enum");
let Usuario = class Usuario {
    id;
    nombre;
    email;
    passwordHash;
    rol;
    createdAt;
    proyectosAsignados;
    brokerCompanyId;
    brokerCompany;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', type: 'text' }),
    __metadata("design:type", String)
], Usuario.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: roles_enum_1.UserRole,
        default: roles_enum_1.UserRole.BROKER_EXTERNO
    }),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => broker_proyecto_entity_1.BrokerProyecto, (bp) => bp.broker),
    __metadata("design:type", Array)
], Usuario.prototype, "proyectosAsignados", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'broker_company_id', nullable: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "brokerCompanyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => broker_company_entity_1.BrokerCompany, (company) => company.usuarios, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'broker_company_id' }),
    __metadata("design:type", broker_company_entity_1.BrokerCompany)
], Usuario.prototype, "brokerCompany", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map