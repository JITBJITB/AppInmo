import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Unidad } from './unidad.entity';
import { Adicional } from './adicional.entity';
import { BrokerProyecto } from './broker-proyecto.entity';

@Entity('proyectos')
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nombre: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    comuna: string;

    @Column({ name: 'imagen_principal_url', type: 'text', nullable: true })
    imagenPrincipalUrl: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => Unidad, (unidad) => unidad.proyecto)
    unidades: Unidad[];

    @OneToMany(() => Adicional, (adicional) => adicional.proyecto)
    adicionales: Adicional[];

    @OneToMany(() => BrokerProyecto, (bp) => bp.proyecto)
    brokersAsignados: BrokerProyecto[];
}
