import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Proyecto } from '../entities/proyecto.entity';
import { Unidad } from '../entities/unidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Unidad])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
