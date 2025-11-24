import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';

@Entity('documentos_venta')
export class DocumentoVenta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_venta_id' })
    @Index()
    fichaVentaId: number;

    @ManyToOne(() => FichaVenta, (fv) => fv.documentos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ficha_venta_id' })
    fichaVenta: FichaVenta;

    @Column({ name: 'tipo_documento' })
    tipoDocumento: string; // 'Acta de Entrega', 'Cuadratura Final', 'Garantías'

    @Column({ name: 'url_s3', type: 'text' })
    urlS3: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
