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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ficha_venta_entity_1 = require("../entities/ficha-venta.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
const roles_enum_1 = require("../auth/roles.enum");
let CommissionsService = class CommissionsService {
    fichaRepository;
    usuarioRepository;
    constructor(fichaRepository, usuarioRepository) {
        this.fichaRepository = fichaRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async calculateCommission(fichaId) {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha)
            throw new common_1.NotFoundException('Ficha no encontrada');
        const agent = await this.usuarioRepository.findOne({ where: { id: ficha.agenteId } });
        if (!agent || agent.rol !== roles_enum_1.UserRole.BROKER_EXTERNO) {
            return ficha;
        }
        const porcentaje = 2.0;
        const monto = (ficha.valorTotalUf * porcentaje) / 100;
        ficha.comisionBrokerMonto = monto;
        ficha.estadoComisionBroker = 'Pendiente';
        return this.fichaRepository.save(ficha);
    }
    async updateCommissionStatus(fichaId, status) {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha)
            throw new common_1.NotFoundException('Ficha no encontrada');
        const validStatuses = ['Pendiente', 'Solicitar Factura', 'Factura Recibida', 'Pagada'];
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException('Estado de comisión inválido');
        }
        ficha.estadoComisionBroker = status;
        return this.fichaRepository.save(ficha);
    }
    async getCommissions(brokerId) {
        const query = this.fichaRepository.createQueryBuilder('ficha')
            .leftJoinAndSelect('ficha.unidad', 'unidad')
            .leftJoinAndSelect('ficha.agente', 'agente')
            .where('ficha.comisionBrokerMonto > 0');
        if (brokerId) {
            query.andWhere('ficha.agenteId = :brokerId', { brokerId });
        }
        return query.getMany();
    }
};
exports.CommissionsService = CommissionsService;
exports.CommissionsService = CommissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ficha_venta_entity_1.FichaVenta)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommissionsService);
//# sourceMappingURL=commissions.service.js.map