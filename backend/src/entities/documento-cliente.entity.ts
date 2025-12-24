import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Cliente } from './cliente.entity';
import { TipoDocumentoCliente } from './enums/tipo-documento-cliente.enum';

@Entity('documentos_cliente')
@Index(['clienteId', 'tipoDocumento'])
export class DocumentoCliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cliente_id' })
    clienteId: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.documentos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @Column({
        type: 'enum',
        enum: TipoDocumentoCliente,
        name: 'tipo_documento'
    })
    tipoDocumento: TipoDocumentoCliente;

    @Column({ name: 'url_s3', type: 'text' })
    urlS3: string;

    @Column({ name: 'nombre_archivo' })
    nombreArchivo: string;

    @Column({
        name: 'numero_liquidacion',
        type: 'int',
        nullable: true,
        comment: 'Número de liquidación (1-6) si tipoDocumento es LIQUIDACION_SUELDO'
    })
    numeroLiquidacion: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
