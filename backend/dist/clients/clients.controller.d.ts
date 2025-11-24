import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: any): Promise<import("../entities").Cliente>;
    findAll(search: string): Promise<import("../entities").Cliente[]>;
    findOne(id: string): Promise<import("../entities").Cliente>;
    update(id: string, updateClientDto: any): Promise<import("../entities").Cliente>;
    addDocument(id: string, documentDto: any): Promise<import("../entities").DocumentoCliente>;
}
