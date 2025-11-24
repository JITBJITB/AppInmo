import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';

@Entity('guaranteed_rent_benefits')
export class GuaranteedRentBenefit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_venta_id' })
    fichaVentaId: number;

    @OneToOne(() => FichaVenta)
    @JoinColumn({ name: 'ficha_venta_id' })
    fichaVenta: FichaVenta;

    @Column({ name: 'duration_months' })
    durationMonths: number; // 24, 36, 48

    @Column({ name: 'monthly_amount', type: 'decimal', precision: 12, scale: 2 })
    monthlyAmount: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate: Date;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
