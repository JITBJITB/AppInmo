import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Entity('adicionales')
@Index(['proyecto', 'tipo', 'nombre'], { unique: true })
export class Adicional {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'proyecto_id' })
    proyectoId: number;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.adicionales, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'proyecto_id' })
    proyecto: Proyecto;

    @Column()
    tipo: string; // 'Bodega', 'Estacionamiento', 'Bicicletero'

    @Column()
    nombre: string;

    @Column({ name: 'valor_uf', type: 'decimal', precision: 10, scale: 2 })
    valorUf: number;

    @Column({ default: 'Disponible' })
    estado: string; // 'Disponible', 'Asignado', 'Vendido'

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
