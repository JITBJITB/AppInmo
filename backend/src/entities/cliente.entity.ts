import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Index } from 'typeorm';
import { DocumentoCliente } from './documento-cliente.entity';
import { FichaCliente } from './ficha-cliente.entity';

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_completo' })
    nombreCompleto: string;

    @Column({ unique: true })
    @Index()
    rut: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    telefono: string;

    @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
    fechaNacimiento: Date;

    @Column({ name: 'estado_civil', nullable: true })
    estadoCivil: string;

    @Column({ nullable: true })
    profesion: string;

    @Column({ name: 'direccion_calle', nullable: true })
    direccionCalle: string;

    @Column({ name: 'direccion_comuna', nullable: true })
    direccionComuna: string;

    @Column({ name: 'direccion_ciudad', nullable: true })
    direccionCiudad: string;

    @Column({ name: 'direccion_pais', default: 'Chile', nullable: true })
    direccionPais: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => DocumentoCliente, (doc) => doc.cliente)
    documentos: DocumentoCliente[];

    @OneToMany(() => FichaCliente, (fc) => fc.cliente)
    fichasAsociadas: FichaCliente[];
}
