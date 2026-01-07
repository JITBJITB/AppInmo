import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaVenta } from '../entities/ficha-venta.entity';
import { Unidad } from '../entities/unidad.entity';
import { EstadoHistorial } from '../entities/estado-historial.entity';
import { Task } from '../entities/task.entity';
import { ReservaExpirationTask } from './reserva-expiration.task';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, FichaVenta, Unidad, EstadoHistorial])
  ],
  providers: [TasksService, ReservaExpirationTask]
})
export class TasksModule { }
