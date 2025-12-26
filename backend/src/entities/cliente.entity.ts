import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Index, OneToOne } from 'typeorm';
import { DocumentoCliente } from './documento-cliente.entity';
import { FichaCliente } from './ficha-cliente.entity';
import { ClienteDatosBancarios } from './cliente-datos-bancarios.entity';

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_1', nullable: true })
    nombre1: string;

    @Column({ name: 'nombre_2', nullable: true })
    nombre2: string;

    @Column({ name: 'apellido_1', nullable: true })
    apellido1: string;

    @Column({ name: 'apellido_2', nullable: true })
    apellido2: string;

    @Column({ name: 'nombre_completo', nullable: true })
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

    @Column({ nullable: true })
    renta: number;

    @Column({ nullable: true })
    nacionalidad: string;

    @Column({ name: 'direccion_calle', nullable: true })
    direccionCalle: string;

    @Column({ name: 'direccion_numero', nullable: true })
    direccionNumero: string;

    @Column({ name: 'direccion_comuna', nullable: true })
    direccionComuna: string;

    @Column({ name: 'direccion_ciudad', nullable: true })
    direccionCiudad: string;

    @Column({ name: 'direccion_region', nullable: true })
    direccionRegion: string;

    @Column({ name: 'direccion_pais', default: 'Chile', nullable: true })
    direccionPais: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => DocumentoCliente, (doc) => doc.cliente)
    documentos: DocumentoCliente[];

    @OneToMany(() => FichaCliente, (fc) => fc.cliente)
    fichasAsociadas: FichaCliente[];

    @OneToOne(() => ClienteDatosBancarios, (db) => db.cliente)
    datosBancarios: ClienteDatosBancarios;
}
