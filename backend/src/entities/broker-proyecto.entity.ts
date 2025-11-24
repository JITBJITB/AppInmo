import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Proyecto } from './proyecto.entity';

@Entity('broker_proyectos')
@Index(['broker', 'proyecto'], { unique: true })
export class BrokerProyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'broker_id' })
    brokerId: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.proyectosAsignados, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'broker_id' })
    broker: Usuario;

    @Column({ name: 'proyecto_id' })
    proyectoId: number;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.brokersAsignados, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'proyecto_id' })
    proyecto: Proyecto;
}
