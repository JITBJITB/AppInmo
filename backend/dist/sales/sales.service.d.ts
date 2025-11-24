import { DataSource } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
export declare class SalesService {
    private dataSource;
    constructor(dataSource: DataSource);
    createFicha(data: any, userId: number): Promise<FichaVenta>;
    findAll(): Promise<FichaVenta[]>;
    findOne(id: number): Promise<FichaVenta>;
}
