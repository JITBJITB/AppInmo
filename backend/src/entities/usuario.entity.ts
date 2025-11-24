import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { BrokerProyecto } from './broker-proyecto.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash', type: 'text' })
    passwordHash: string;

    @Column({ default: 'Broker' })
    rol: string; // 'Admin', 'Agente', 'Broker', 'Contabilidad'

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => BrokerProyecto, (bp) => bp.broker)
    proyectosAsignados: BrokerProyecto[];
}
