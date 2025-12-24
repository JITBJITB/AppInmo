import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../../entities/proyecto.entity';

@Entity('departamento')
export class Departamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    depto: string;

    @Column({ type: 'varchar', length: 50 })
    estado: string;

    @Column({ type: 'int' })
    piso: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    cliente: string;

    @ManyToOne(() => Proyecto, { eager: false })
    @JoinColumn({ name: 'proyecto_id' })
    proyecto: Proyecto;
}
