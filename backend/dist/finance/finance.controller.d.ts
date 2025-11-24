import { FinanceService } from './finance.service';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    getPlan(id: string): Promise<import("../entities").PlanPago>;
    markAsPaid(id: string): Promise<import("../entities").Cuota>;
}
