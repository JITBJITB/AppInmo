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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_entity_1 = require("../entities/cliente.entity");
const documento_cliente_entity_1 = require("../entities/documento-cliente.entity");
let ClientsService = class ClientsService {
    clientsRepository;
    documentsRepository;
    constructor(clientsRepository, documentsRepository) {
        this.clientsRepository = clientsRepository;
        this.documentsRepository = documentsRepository;
    }
    async create(createClientDto) {
        const newClient = this.clientsRepository.create(createClientDto);
        return this.clientsRepository.save(newClient);
    }
    async findAll(search) {
        if (search) {
            return this.clientsRepository.find({
                where: [
                    { nombreCompleto: (0, typeorm_2.Like)(`%${search}%`) },
                    { rut: (0, typeorm_2.Like)(`%${search}%`) },
                ],
            });
        }
        return this.clientsRepository.find();
    }
    async findOne(id) {
        const client = await this.clientsRepository.findOne({
            where: { id },
            relations: ['documentos'],
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }
    async update(id, updateClientDto) {
        const client = await this.findOne(id);
        this.clientsRepository.merge(client, updateClientDto);
        return this.clientsRepository.save(client);
    }
    async addDocument(clientId, document) {
        const newDoc = this.documentsRepository.create({ ...document, clienteId: clientId });
        return this.documentsRepository.save(newDoc);
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __param(1, (0, typeorm_1.InjectRepository)(documento_cliente_entity_1.DocumentoCliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map