import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { DocumentoCliente } from '../entities/documento-cliente.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Cliente)
        private clientsRepository: Repository<Cliente>,
        @InjectRepository(DocumentoCliente)
        private documentsRepository: Repository<DocumentoCliente>,
    ) { }

    async create(createClientDto: Partial<Cliente>): Promise<Cliente> {
        const newClient = this.clientsRepository.create(createClientDto);
        return this.clientsRepository.save(newClient);
    }

    async findAll(search?: string): Promise<Cliente[]> {
        if (search) {
            return this.clientsRepository.find({
                where: [
                    { nombreCompleto: Like(`%${search}%`) },
                    { rut: Like(`%${search}%`) },
                ],
            });
        }
        return this.clientsRepository.find();
    }

    async findOne(id: number): Promise<Cliente> {
        const client = await this.clientsRepository.findOne({
            where: { id },
            relations: ['documentos'],
        });
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }

    async update(id: number, updateClientDto: Partial<Cliente>): Promise<Cliente> {
        const client = await this.findOne(id);
        this.clientsRepository.merge(client, updateClientDto);
        return this.clientsRepository.save(client);
    }

    async addDocument(clientId: number, document: Partial<DocumentoCliente>): Promise<DocumentoCliente> {
        const newDoc = this.documentsRepository.create({ ...document, clienteId: clientId });
        return this.documentsRepository.save(newDoc);
    }
}
