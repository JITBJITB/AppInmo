import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(+id);
    }

    @Post()
    @Roles('Admin')
    create(@Body() createProjectDto: any) {
        return this.projectsService.create(createProjectDto);
    }

    @Post(':id/units')
    @Roles('Admin')
    createUnit(@Param('id') id: string, @Body() createUnitDto: any) {
        return this.projectsService.createUnit({ ...createUnitDto, proyectoId: +id });
    }

    @Get(':id/units')
    getUnits(@Param('id') id: string) {
        return this.projectsService.getUnitsByProject(+id);
    }
}
