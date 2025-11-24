import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';

@Entity('escrituras')
export class Escritura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_id' })
    fichaId: number;

    @OneToOne(() => FichaVenta)
    @JoinColumn({ name: 'ficha_id' })
    fichaVenta: FichaVenta;

    @Column({ default: 'En Redacción' })
    estado: string;

    @Column({ nullable: true })
    notaria: string;

    @Column({ name: 'repertorio', nullable: true })
    repertorio: string;

    @Column({ name: 'fecha_firma', type: 'date', nullable: true })
    fechaFirma: Date;

    @Column({ name: 'fecha_inscripcion', type: 'date', nullable: true })
    fechaInscripcion: Date;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
