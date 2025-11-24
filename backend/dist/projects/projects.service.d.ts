import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { Unidad } from '../entities/unidad.entity';
export declare class ProjectsService {
    private projectsRepository;
    private unitsRepository;
    constructor(projectsRepository: Repository<Proyecto>, unitsRepository: Repository<Unidad>);
    findAll(): Promise<Proyecto[]>;
    findOne(id: number): Promise<Proyecto>;
    create(proyecto: Partial<Proyecto>): Promise<Proyecto>;
    createUnit(unit: Partial<Unidad>): Promise<Unidad>;
    getUnitsByProject(projectId: number): Promise<Unidad[]>;
}
