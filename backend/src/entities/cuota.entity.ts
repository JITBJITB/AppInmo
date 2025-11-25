import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { PlanPago } from './plan-pago.entity';

@Entity('cuotas')
export class Cuota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'plan_pago_id' })
    @Index()
    planPagoId: number;

    @ManyToOne(() => PlanPago, (pp) => pp.cuotas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'plan_pago_id' })
    planPago: PlanPago;

    @Column({ name: 'numero_cuota' })
    numeroCuota: number;

    @Column({ name: 'monto_cuota', type: 'decimal', precision: 12, scale: 2 })
    montoCuota: number;

    @Column({ name: 'fecha_vencimiento', type: 'date' })
    fechaVencimiento: Date;

    @Column({ default: 'Pendiente' })
    @Index()
    estado: string; // 'Pendiente', 'Pagada'

    @Column({ name: 'fecha_pago', type: 'date', nullable: true })
    fechaPago: Date;

    @Column({ name: 'comprobante_pago_url', nullable: true })
    comprobantePagoUrl: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
