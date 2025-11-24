import { Module } from '@nestjs/common';
import { CommissionsService } from './commissions.service';
import { CommissionsController } from './commissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Usuario } from '../entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FichaVenta, Usuario])],
  providers: [CommissionsService],
  controllers: [CommissionsController]
})
export class CommissionsModule { }
