import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';

@Entity('entregas')
export class Entrega {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_id' })
    fichaId: number;

    @OneToOne(() => FichaVenta)
    @JoinColumn({ name: 'ficha_id' })
    fichaVenta: FichaVenta;

    @Column({ name: 'fecha_programada', type: 'date', nullable: true })
    fechaProgramada: Date;

    @Column({ name: 'fecha_real', type: 'timestamp', nullable: true })
    fechaReal: Date;

    @Column({ default: false })
    firmada: boolean;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
