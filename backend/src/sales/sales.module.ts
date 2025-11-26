import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Unidad } from '../entities/unidad.entity';
import { Cliente } from '../entities/cliente.entity';
import { FichaCliente } from '../entities/ficha-cliente.entity';
import { PlanPago } from '../entities/plan-pago.entity';
import { Cuota } from '../entities/cuota.entity';
import { FichaAdicional } from '../entities/ficha-adicional.entity';
import { Adicional } from '../entities/adicional.entity';
import { DocumentoVenta } from '../entities/documento-venta.entity';
import { Escritura } from '../entities/escritura.entity';
import { Entrega } from '../entities/entrega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FichaVenta, Unidad, Cliente, FichaCliente, PlanPago, Cuota, FichaAdicional, Adicional, DocumentoVenta, Escritura, Entrega])],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [SalesService]
})
export class SalesModule { }
