import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Proyecto } from '../entities/proyecto.entity';
import { Unidad } from '../entities/unidad.entity';
import { Adicional } from '../entities/adicional.entity';
import { BrokerProyecto } from '../entities/broker-proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Unidad, Adicional, BrokerProyecto])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
