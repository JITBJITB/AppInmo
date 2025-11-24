import { Repository } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Usuario } from '../entities/usuario.entity';
export declare class CommissionsService {
    private fichaRepository;
    private usuarioRepository;
    constructor(fichaRepository: Repository<FichaVenta>, usuarioRepository: Repository<Usuario>);
    calculateCommission(fichaId: number): Promise<FichaVenta>;
    updateCommissionStatus(fichaId: number, status: string): Promise<FichaVenta>;
    getCommissions(brokerId?: number): Promise<FichaVenta[]>;
}
