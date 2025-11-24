import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';
import { Adicional } from './adicional.entity';

@Entity('ficha_adicionales')
@Index(['fichaVenta', 'adicional'], { unique: true })
export class FichaAdicional {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_venta_id' })
    @Index()
    fichaVentaId: number;

    @ManyToOne(() => FichaVenta, (fv) => fv.adicionales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ficha_venta_id' })
    fichaVenta: FichaVenta;

    @Column({ name: 'adicional_id' })
    adicionalId: number;

    @ManyToOne(() => Adicional, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'adicional_id' })
    adicional: Adicional;
}
