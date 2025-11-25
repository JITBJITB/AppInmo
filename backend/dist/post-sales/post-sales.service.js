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
var PostSalesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const escritura_entity_1 = require("../entities/escritura.entity");
const entrega_entity_1 = require("../entities/entrega.entity");
const ficha_venta_entity_1 = require("../entities/ficha-venta.entity");
const guaranteed_rent_benefit_entity_1 = require("../entities/guaranteed-rent-benefit.entity");
const task_entity_1 = require("../entities/task.entity");
let PostSalesService = PostSalesService_1 = class PostSalesService {
    escrituraRepository;
    entregaRepository;
    fichaRepository;
    benefitRepository;
    taskRepository;
    logger = new common_1.Logger(PostSalesService_1.name);
    constructor(escrituraRepository, entregaRepository, fichaRepository, benefitRepository, taskRepository) {
        this.escrituraRepository = escrituraRepository;
        this.entregaRepository = entregaRepository;
        this.fichaRepository = fichaRepository;
        this.benefitRepository = benefitRepository;
        this.taskRepository = taskRepository;
    }
    async checkGuaranteedRents() {
        this.logger.debug('Checking guaranteed rent benefits...');
        const today = new Date();
        const activeBenefits = await this.benefitRepository.find({
            where: {
                active: true,
                startDate: (0, typeorm_2.LessThanOrEqual)(today),
                endDate: (0, typeorm_2.MoreThanOrEqual)(today),
            },
            relations: ['fichaVenta', 'fichaVenta.unidad'],
        });
        for (const benefit of activeBenefits) {
            if (today.getDate() === benefit.startDate.getDate()) {
                await this.createPaymentTask(benefit);
            }
        }
    }
    async createPaymentTask(benefit) {
        const task = new task_entity_1.Task();
        task.title = `Pago Arriendo Garantizado - Ficha ${benefit.fichaVenta.folio} `;
        task.description = `Realizar pago de $${benefit.monthlyAmount} por unidad ${benefit.fichaVenta.unidad.nombre}.`;
        task.status = 'Pendiente';
        task.assignedRole = 'Contabilidad';
        task.relatedEntityId = benefit.id;
        task.relatedEntityType = 'GuaranteedRentBenefit';
        await this.taskRepository.save(task);
        this.logger.log(`Created payment task for benefit ${benefit.id}`);
    }
    async createEscritura(fichaId, data) {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha)
            throw new common_1.NotFoundException('Ficha no encontrada');
        const existing = await this.escrituraRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
        if (existing)
            throw new common_1.BadRequestException('Ya existe una escritura para esta venta');
        const escritura = this.escrituraRepository.create({ ...data, fichaVenta: ficha });
        return this.escrituraRepository.save(escritura);
    }
    async updateEscritura(id, data) {
        await this.escrituraRepository.update(id, data);
        return this.escrituraRepository.findOne({ where: { id } });
    }
    async getEscrituraByFicha(fichaId) {
        return this.escrituraRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
    }
    async scheduleEntrega(fichaId, date) {
        const ficha = await this.fichaRepository.findOne({ where: { id: fichaId } });
        if (!ficha)
            throw new common_1.NotFoundException('Ficha no encontrada');
        let entrega = await this.entregaRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
        if (!entrega) {
            entrega = this.entregaRepository.create({ fichaVenta: ficha });
        }
        entrega.fechaProgramada = date;
        return this.entregaRepository.save(entrega);
    }
    async completeEntrega(id, observations) {
        const entrega = await this.entregaRepository.findOne({ where: { id } });
        if (!entrega)
            throw new common_1.NotFoundException('Entrega no encontrada');
        entrega.fechaReal = new Date();
        entrega.observaciones = observations;
        entrega.firmada = true;
        return this.entregaRepository.save(entrega);
    }
    async getEntregaByFicha(fichaId) {
        return this.entregaRepository.findOne({ where: { fichaVenta: { id: fichaId } } });
    }
};
exports.PostSalesService = PostSalesService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostSalesService.prototype, "checkGuaranteedRents", null);
exports.PostSalesService = PostSalesService = PostSalesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(escritura_entity_1.Escritura)),
    __param(1, (0, typeorm_1.InjectRepository)(entrega_entity_1.Entrega)),
    __param(2, (0, typeorm_1.InjectRepository)(ficha_venta_entity_1.FichaVenta)),
    __param(3, (0, typeorm_1.InjectRepository)(guaranteed_rent_benefit_entity_1.GuaranteedRentBenefit)),
    __param(4, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostSalesService);
//# sourceMappingURL=post-sales.service.js.map