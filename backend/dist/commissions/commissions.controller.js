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
exports.CommissionsController = void 0;
const common_1 = require("@nestjs/common");
const commissions_service_1 = require("./commissions.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let CommissionsController = class CommissionsController {
    commissionsService;
    constructor(commissionsService) {
        this.commissionsService = commissionsService;
    }
    calculate(fichaId) {
        return this.commissionsService.calculateCommission(+fichaId);
    }
    updateStatus(fichaId, status) {
        return this.commissionsService.updateCommissionStatus(+fichaId, status);
    }
    getMyCommissions(req) {
        return this.commissionsService.getCommissions(req.user.userId);
    }
    getAll() {
        return this.commissionsService.getCommissions();
    }
};
exports.CommissionsController = CommissionsController;
__decorate([
    (0, common_1.Post)('calculate/:fichaId'),
    (0, roles_decorator_1.Roles)('Admin', 'Contabilidad'),
    __param(0, (0, common_1.Param)('fichaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "calculate", null);
__decorate([
    (0, common_1.Patch)(':fichaId/status'),
    (0, roles_decorator_1.Roles)('Admin', 'Contabilidad'),
    __param(0, (0, common_1.Param)('fichaId')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)('Broker'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "getMyCommissions", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, roles_decorator_1.Roles)('Admin', 'Contabilidad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "getAll", null);
exports.CommissionsController = CommissionsController = __decorate([
    (0, common_1.Controller)('commissions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [commissions_service_1.CommissionsService])
], CommissionsController);
//# sourceMappingURL=commissions.controller.js.map