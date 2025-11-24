import { CommissionsService } from './commissions.service';
export declare class CommissionsController {
    private readonly commissionsService;
    constructor(commissionsService: CommissionsService);
    calculate(fichaId: string): Promise<import("../entities").FichaVenta>;
    updateStatus(fichaId: string, status: string): Promise<import("../entities").FichaVenta>;
    getMyCommissions(req: any): Promise<import("../entities").FichaVenta[]>;
    getAll(): Promise<import("../entities").FichaVenta[]>;
}
