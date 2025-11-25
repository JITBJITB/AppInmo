import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Cuota } from '../entities/cuota.entity';
import { GuaranteedRentBenefit } from '../entities/guaranteed-rent-benefit.entity';
import { EstadoFicha } from '../sales/enums/estado-ficha.enum';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(FichaVenta)
        private fichaRepository: Repository<FichaVenta>,
        @InjectRepository(Cuota)
        private cuotaRepository: Repository<Cuota>,
        @InjectRepository(GuaranteedRentBenefit)
        private benefitRepository: Repository<GuaranteedRentBenefit>,
    ) { }

    async getKPIs() {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // 1. Ventas del Mes
        const ventasMes = await this.fichaRepository.count({
            where: {
                createdAt: Between(firstDayOfMonth, lastDayOfMonth),
                estadoFicha: EstadoFicha.PROMESA // Assuming approved sales are Promesa
            }
        });

        // 2. Monto Total Fundit Colocado
        const funditSales = await this.fichaRepository.find({
            where: { hasFundit: true, estadoFicha: EstadoFicha.PROMESA },
            select: ['creditoFunditMonto']
        });
        const totalFundit = funditSales.reduce((sum, sale) => sum + Number(sale.creditoFunditMonto || 0), 0);

        // 3. Cuotas Atrasadas
        const cuotasAtrasadas = await this.cuotaRepository.count({
            where: {
                estado: 'Pendiente',
                fechaVencimiento: LessThan(now)
            }
        });

        // 4. Propiedades en Arriendo Garantizado
        const activeBenefits = await this.benefitRepository.count({
            where: { active: true }
        });

        return {
            ventasMes,
            totalFundit,
            cuotasAtrasadas,
            activeBenefits
        };
    }

    async getSalesByBroker() {
        // Group sales by broker and count
        const sales = await this.fichaRepository
            .createQueryBuilder('ficha')
            .leftJoinAndSelect('ficha.usuario', 'usuario')
            .select('usuario.nombre', 'name')
            .addSelect('COUNT(ficha.id)', 'value')
            .where('ficha.estadoFicha = :status', { status: EstadoFicha.PROMESA })
            .groupBy('usuario.nombre')
            .getRawMany();

        return sales;
    }
}
