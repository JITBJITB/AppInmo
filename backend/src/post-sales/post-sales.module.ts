import { Module } from '@nestjs/common';
import { PostSalesService } from './post-sales.service';
import { PostSalesController } from './post-sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escritura } from '../entities/escritura.entity';
import { Entrega } from '../entities/entrega.entity';
import { FichaVenta } from '../entities/ficha-venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escritura, Entrega, FichaVenta])],
  providers: [PostSalesService],
  controllers: [PostSalesController]
})
export class PostSalesModule { }
