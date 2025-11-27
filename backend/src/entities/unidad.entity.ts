import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Entity('unidades')
@Index(['proyecto', 'nombre'], { unique: true })
export class Unidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'proyecto_id' })
    proyectoId: number;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.unidades, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'proyecto_id' })
    proyecto: Proyecto;

    @Column({ length: 100 })
    nombre: string;

    @Column({ nullable: true })
    tipologia: string;

    @Column({ name: 'metros_cuadrados', type: 'decimal', precision: 10, scale: 2, nullable: true })
    metrosCuadrados: number;

    @Column({ default: 1 })
    piso: number;

    @Column({ name: 'valor_uf', type: 'decimal', precision: 12, scale: 2 })
    valorUf: number;

    @Column({ default: 'Disponible' })
    @Index()
    estado: string; // 'Disponible', 'Reservada', 'Vendida'

    @Column({ name: 'reserva_expira_en', type: 'timestamptz', nullable: true })
    reservaExpiraEn: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
