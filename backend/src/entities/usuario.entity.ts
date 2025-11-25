import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BrokerProyecto } from './broker-proyecto.entity';
import { BrokerCompany } from './broker-company.entity';
import { UserRole } from '../auth/roles.enum';

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

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.BROKER_EXTERNO
    })
    rol: UserRole;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => BrokerProyecto, (bp) => bp.broker)
    proyectosAsignados: BrokerProyecto[];

    @Column({ name: 'broker_company_id', nullable: true })
    brokerCompanyId: number;

    @ManyToOne(() => BrokerCompany, (company) => company.usuarios, { nullable: true })
    @JoinColumn({ name: 'broker_company_id' })
    brokerCompany: BrokerCompany;
}
