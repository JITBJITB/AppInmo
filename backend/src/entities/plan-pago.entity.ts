import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';
import { Cuota } from './cuota.entity';

@Entity('planes_pago')
export class PlanPago {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_venta_id' })
    @Index()
    fichaVentaId: number;

    @ManyToOne(() => FichaVenta, (fv) => fv.planesPago, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ficha_venta_id' })
    fichaVenta: FichaVenta;

    @Column({ name: 'tipo_plan' })
    tipoPlan: string; // 'Pagaré', 'Arriendo Garantizado', 'Crédito Directo'

    @Column({ name: 'monto_total', type: 'decimal', precision: 12, scale: 2 })
    montoTotal: number;

    @Column({ name: 'monto_pie', type: 'decimal', precision: 12, scale: 2, default: 0 })
    montoPie: number;

    @Column({ name: 'monto_reserva', type: 'decimal', precision: 12, scale: 2, default: 0 })
    montoReserva: number;

    @Column({ name: 'saldo_a_pagar', type: 'decimal', precision: 12, scale: 2, default: 0 })
    saldoAPagar: number;

    @Column({ name: 'numero_cuotas' })
    numeroCuotas: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => Cuota, (cuota) => cuota.planPago)
    cuotas: Cuota[];
}
