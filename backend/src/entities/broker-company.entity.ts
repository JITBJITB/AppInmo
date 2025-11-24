import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('broker_companies')
export class BrokerCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    rut: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    contacto_nombre: string;

    @Column({ nullable: true })
    contacto_email: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => Usuario, (usuario) => usuario.brokerCompany)
    usuarios: Usuario[];
}
