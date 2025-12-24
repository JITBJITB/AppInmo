import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';
import { Usuario } from './usuario.entity';
import { EstadoFicha } from '../sales/enums/estado-ficha.enum';

@Entity('estado_historial')
@Index(['fichaVentaId', 'fechaCambio'])
export class EstadoHistorial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_venta_id' })
    fichaVentaId: number;

    @ManyToOne(() => FichaVenta, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ficha_venta_id' })
    fichaVenta: FichaVenta;

    @Column({
        type: 'enum',
        enum: EstadoFicha,
        nullable: true,
        name: 'estado_anterior'
    })
    estadoAnterior: EstadoFicha;

    @Column({
        type: 'enum',
        enum: EstadoFicha,
        name: 'estado_nuevo'
    })
    estadoNuevo: EstadoFicha;

    @Column({ name: 'usuario_id' })
    usuarioId: number;

    @ManyToOne(() => Usuario, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column({ name: 'motivo_desistimiento', type: 'text', nullable: true })
    motivoDesistimiento: string;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @CreateDateColumn({ name: 'fecha_cambio', type: 'timestamptz' })
    fechaCambio: Date;
}
