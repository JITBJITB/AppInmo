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
import { EstadoHistorial } from '../entities/estado-historial.entity';
import { Comision } from '../entities/comision.entity';
import { Usuario } from '../entities/usuario.entity';
import { ClienteDatosBancarios } from '../entities/cliente-datos-bancarios.entity';
import { GuaranteedRentBenefit } from '../entities/guaranteed-rent-benefit.entity';
import { EstadoTransitionService } from './services/estado-transition.service';
import { DesistimientoService } from './services/desistimiento.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FichaVenta,
      Unidad,
      Cliente,
      FichaCliente,
      PlanPago,
      Cuota,
      FichaAdicional,
      Adicional,
      DocumentoVenta,
      Escritura,
      Entrega,
      EstadoHistorial,
      Comision,
      Usuario,
      ClienteDatosBancarios,
      GuaranteedRentBenefit
    ])
  ],
  providers: [SalesService, EstadoTransitionService, DesistimientoService],
  controllers: [SalesController],
  exports: [SalesService, EstadoTransitionService, DesistimientoService]
})
export class SalesModule { }
