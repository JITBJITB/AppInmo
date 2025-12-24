import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Usuario } from './usuario.entity';
import { TipoCuenta } from './enums/tipo-cuenta.enum';

@Entity('broker_datos_bancarios')
export class BrokerDatosBancarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'usuario_id', unique: true })
    @Index()
    usuarioId: number;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column()
    banco: string;

    @Column({
        type: 'enum',
        enum: TipoCuenta,
        name: 'tipo_cuenta'
    })
    tipoCuenta: TipoCuenta;

    @Column({ name: 'numero_cuenta' })
    numeroCuenta: string;

    @Column({ name: 'rut_titular' })
    rutTitular: string;

    @Column({ name: 'nombre_titular' })
    nombreTitular: string;

    @Column({ nullable: true })
    email: string;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
        nullable: true,
        name: 'comision_porcentaje',
        comment: 'Porcentaje de comisión pactado (ej: 2.50 para 2.5%)'
    })
    comisionPorcentaje: number;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: true,
        name: 'comision_monto_fijo',
        comment: 'Monto fijo en UF si aplica'
    })
    comisionMontoFijo: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
