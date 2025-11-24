import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Comision {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FichaVenta)
    fichaVenta: FichaVenta;

    @ManyToOne(() => Usuario)
    broker: Usuario;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    porcentaje: number;

    @Column({ default: 'Pendiente' })
    estado: string; // 'Pendiente', 'Pagada', 'Anulada'

    @Column({ type: 'date', nullable: true })
    fechaPago: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
