import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { FichaVenta } from './ficha-venta.entity';
import { Cliente } from './cliente.entity';

@Entity('ficha_clientes')
@Index(['fichaVenta', 'cliente'], { unique: true })
export class FichaCliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'ficha_venta_id' })
    @Index()
    fichaVentaId: number;

    @ManyToOne(() => FichaVenta, (fv) => fv.clientes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ficha_venta_id' })
    fichaVenta: FichaVenta;

    @Column({ name: 'cliente_id' })
    @Index()
    clienteId: number;

    @ManyToOne(() => Cliente, (c) => c.fichasAsociadas, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @Column({ default: 'Principal' })
    rol: string; // 'Principal', 'Co-Comprador'
}
