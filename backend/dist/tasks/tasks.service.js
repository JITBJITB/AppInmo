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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unidad_entity_1 = require("../entities/unidad.entity");
const ficha_venta_entity_1 = require("../entities/ficha-venta.entity");
let TasksService = TasksService_1 = class TasksService {
    unidadRepository;
    fichaVentaRepository;
    logger = new common_1.Logger(TasksService_1.name);
    constructor(unidadRepository, fichaVentaRepository) {
        this.unidadRepository = unidadRepository;
        this.fichaVentaRepository = fichaVentaRepository;
    }
    async handleCron() {
        this.logger.debug('Checking for expired reservations...');
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() - 48);
        const expiredFichas = await this.fichaVentaRepository.find({
            where: {
                estadoFicha: 'Borrador',
                createdAt: (0, typeorm_2.LessThan)(expirationDate),
            },
            relations: ['unidad'],
        });
        if (expiredFichas.length === 0) {
            this.logger.debug('No expired reservations found.');
            return;
        }
        this.logger.log(`Found ${expiredFichas.length} expired reservations. Processing...`);
        for (const ficha of expiredFichas) {
            ficha.estadoFicha = 'Vencida';
            await this.fichaVentaRepository.save(ficha);
            if (ficha.unidad) {
                ficha.unidad.estado = 'Disponible';
                await this.unidadRepository.save(ficha.unidad);
                this.logger.log(`Released unit ${ficha.unidad.nombre} from ficha ${ficha.folio}`);
            }
        }
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unidad_entity_1.Unidad)),
    __param(1, (0, typeorm_1.InjectRepository)(ficha_venta_entity_1.FichaVenta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map