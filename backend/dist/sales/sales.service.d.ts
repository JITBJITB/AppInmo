import { DataSource } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { CreateFichaVentaDto } from './dto/create-ficha-venta.dto';
import { CotizacionDto } from './dto/cotizacion.dto';
export declare class SalesService {
    private dataSource;
    constructor(dataSource: DataSource);
    createFicha(data: CreateFichaVentaDto, userId: number): Promise<FichaVenta>;
    generateCotizacion(data: CreateFichaVentaDto): Promise<CotizacionDto>;
    findAll(): Promise<FichaVenta[]>;
    findOne(id: number): Promise<FichaVenta>;
    approveFicha(id: number): Promise<FichaVenta>;
}
