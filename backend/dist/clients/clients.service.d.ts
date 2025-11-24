import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { DocumentoCliente } from '../entities/documento-cliente.entity';
export declare class ClientsService {
    private clientsRepository;
    private documentsRepository;
    constructor(clientsRepository: Repository<Cliente>, documentsRepository: Repository<DocumentoCliente>);
    create(createClientDto: Partial<Cliente>): Promise<Cliente>;
    findAll(search?: string): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, updateClientDto: Partial<Cliente>): Promise<Cliente>;
    addDocument(clientId: number, document: Partial<DocumentoCliente>): Promise<DocumentoCliente>;
}
