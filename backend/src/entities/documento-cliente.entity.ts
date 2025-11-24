import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('documentos_cliente')
export class DocumentoCliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cliente_id' })
    @Index()
    clienteId: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.documentos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @Column({ name: 'tipo_documento' })
    tipoDocumento: string;

    @Column({ name: 'url_s3', type: 'text' })
    urlS3: string;

    @Column({ name: 'estado_validacion', default: 'Pendiente' })
    estadoValidacion: string; // 'Pendiente', 'Aprobado', 'Rechazado'

    @Column({ name: 'observacion_rechazo', type: 'text', nullable: true })
    observacionRechazo: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
