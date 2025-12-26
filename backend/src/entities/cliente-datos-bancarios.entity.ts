import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Cliente } from './cliente.entity';
import { TipoCuenta } from './enums/tipo-cuenta.enum';

@Entity('cliente_datos_bancarios')
export class ClienteDatosBancarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cliente_id', unique: true })
    @Index()
    clienteId: number;

    @OneToOne(() => Cliente, (cliente) => cliente.datosBancarios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

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

    // Use default values if not provided, or fallback to client data
    @Column({ name: 'rut_titular', nullable: true })
    rutTitular: string;

    @Column({ name: 'nombre_titular', nullable: true })
    nombreTitular: string;

    @Column({ nullable: true })
    email: string;

    @Column({ name: 'codigo_banco', nullable: true, comment: 'Internal code for the bank if needed for export' })
    codigoBanco: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
