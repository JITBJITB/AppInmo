import { SalesService } from '../sales/sales.service';
export declare class DocumentsService {
    private salesService;
    constructor(salesService: SalesService);
    generatePromesa(fichaId: number): Promise<Buffer>;
}
