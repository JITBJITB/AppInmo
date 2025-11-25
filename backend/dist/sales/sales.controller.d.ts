import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(createFichaDto: any, req: any): Promise<import("../entities").FichaVenta>;
    findAll(): Promise<import("../entities").FichaVenta[]>;
    findOne(id: string): Promise<import("../entities").FichaVenta>;
    approve(id: string): Promise<import("../entities").FichaVenta>;
}
