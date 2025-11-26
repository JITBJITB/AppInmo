import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index, OneToOne } from 'typeorm';
import { Unidad } from './unidad.entity';
import { Usuario } from './usuario.entity';
import { FichaCliente } from './ficha-cliente.entity';
import { FichaAdicional } from './ficha-adicional.entity';
import { DocumentoVenta } from './documento-venta.entity';
import { PlanPago } from './plan-pago.entity';
import { Escritura } from './escritura.entity';
import { Entrega } from './entrega.entity';

import { EstadoFicha } from '../sales/enums/estado-ficha.enum';

@Entity('fichas_venta')
export class FichaVenta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    folio: string;

    @Column({ name: 'unidad_id' })
    unidadId: number;

    @ManyToOne(() => Unidad, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'unidad_id' })
    unidad: Unidad;

    @Column({ name: 'agente_id' })
    agenteId: number;

    @ManyToOne(() => Usuario, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'agente_id' })
    agente: Usuario;

    @Column({ type: 'enum', enum: EstadoFicha, default: EstadoFicha.BORRADOR, name: 'estado_ficha' })
    @Index()
    estadoFicha: EstadoFicha;

    @Column({ name: 'valor_total_uf', type: 'decimal', precision: 12, scale: 2 })
    valorTotalUf: number;

    @Column({ name: 'descuento_porcentaje', type: 'decimal', precision: 5, scale: 2, nullable: true })
    descuentoPorcentaje: number;

    @Column({ name: 'valor_descuento_uf', type: 'decimal', precision: 12, scale: 2, default: 0 })
    valorDescuentoUf: number;

    @Column({ name: 'bono_pie', default: false })
    bonoPie: boolean;

    @Column({ name: 'credito_fundit_monto', type: 'decimal', precision: 12, scale: 2, default: 0 })
    creditoFunditMonto: number;

    @Column({ name: 'has_fundit', default: false })
    hasFundit: boolean;

    // Escritura
    @Column({ name: 'estado_escritura', default: 'Pendiente' })
    @Index()
    estadoEscritura: string;

    @Column({ name: 'banco_hipotecario', nullable: true })
    bancoHipotecario: string;

    @Column({ name: 'monto_hipotecario', type: 'decimal', precision: 12, scale: 2, default: 0 })
    montoHipotecario: number;

    @Column({ name: 'fecha_firma_escritura_cliente', type: 'date', nullable: true })
    fechaFirmaEscrituraCliente: Date;

    // Entrega
    @Column({ name: 'estado_entrega', default: 'Pendiente' })
    estadoEntrega: string;

    // Comisión
    @Column({ name: 'comision_broker_monto', type: 'decimal', precision: 12, scale: 2, default: 0 })
    comisionBrokerMonto: number;

    @Column({ name: 'estado_comision_broker', default: 'Pendiente' })
    @Index()
    estadoComisionBroker: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @OneToMany(() => FichaCliente, (fc) => fc.fichaVenta)
    clientes: FichaCliente[];

    @OneToMany(() => FichaAdicional, (fa) => fa.fichaVenta)
    adicionales: FichaAdicional[];

    @OneToMany(() => DocumentoVenta, (dv) => dv.fichaVenta)
    documentos: DocumentoVenta[];

    @OneToMany(() => PlanPago, (pp) => pp.fichaVenta)
    planesPago: PlanPago[];

    @OneToOne(() => Escritura, (e) => e.fichaVenta)
    escritura: Escritura;

    @OneToOne(() => Entrega, (e) => e.fichaVenta)
    entrega: Entrega;
}
