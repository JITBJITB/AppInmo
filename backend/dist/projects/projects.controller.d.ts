import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<import("../entities").Proyecto[]>;
    findOne(id: string): Promise<import("../entities").Proyecto>;
    create(createProjectDto: any): Promise<import("../entities").Proyecto>;
    createUnit(id: string, createUnitDto: any): Promise<import("../entities").Unidad>;
    getUnits(id: string): Promise<import("../entities").Unidad[]>;
}
