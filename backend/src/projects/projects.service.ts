import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { Unidad } from '../entities/unidad.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Proyecto)
        private projectsRepository: Repository<Proyecto>,
        @InjectRepository(Unidad)
        private unitsRepository: Repository<Unidad>,
    ) { }

    async findAll(): Promise<Proyecto[]> {
        return this.projectsRepository.find({ relations: ['unidades'] });
    }

    async findOne(id: number): Promise<Proyecto> {
        const project = await this.projectsRepository.findOne({
            where: { id },
            relations: ['unidades'],
        });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }

    async create(proyecto: Partial<Proyecto>): Promise<Proyecto> {
        const newProject = this.projectsRepository.create(proyecto);
        return this.projectsRepository.save(newProject);
    }

    async createUnit(unit: Partial<Unidad>): Promise<Unidad> {
        const newUnit = this.unitsRepository.create(unit);
        return this.unitsRepository.save(newUnit);
    }

    async getUnitsByProject(projectId: number): Promise<Unidad[]> {
        return this.unitsRepository.find({ where: { proyectoId: projectId } });
    }
}
