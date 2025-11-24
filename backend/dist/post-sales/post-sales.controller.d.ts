import { PostSalesService } from './post-sales.service';
export declare class PostSalesController {
    private readonly postSalesService;
    constructor(postSalesService: PostSalesService);
    createEscritura(fichaId: string, data: any): Promise<import("../entities").Escritura>;
    updateEscritura(id: string, data: any): Promise<import("../entities").Escritura | null>;
    getEscritura(fichaId: string): Promise<import("../entities").Escritura | null>;
    scheduleEntrega(fichaId: string, date: string): Promise<import("../entities").Entrega>;
    completeEntrega(id: string, observations: string): Promise<import("../entities").Entrega>;
    getEntrega(fichaId: string): Promise<import("../entities").Entrega | null>;
}
