import { SalesService } from './sales.service';
import { CreateFichaVentaDto } from './dto/create-ficha-venta.dto';
import { CotizacionDto } from './dto/cotizacion.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(createFichaDto: CreateFichaVentaDto, req: any): Promise<import("../entities").FichaVenta>;
    generateCotizacion(createFichaDto: CreateFichaVentaDto): Promise<CotizacionDto>;
    findAll(): Promise<import("../entities").FichaVenta[]>;
    findOne(id: string): Promise<import("../entities").FichaVenta>;
    approve(id: string): Promise<import("../entities").FichaVenta>;
}
