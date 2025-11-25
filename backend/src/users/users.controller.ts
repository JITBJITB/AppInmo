import { Controller, Get, UseGuards, Request, Param, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/roles.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    @Roles(UserRole.GERENCIA, UserRole.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        const user = await this.usersService.findOneById(+id);

        // Access Control Logic
        const isGerenciaOrAdmin = req.user.rol === UserRole.GERENCIA || req.user.rol === UserRole.ADMIN;
        const isOwnProfile = req.user.id === +id;

        if (!isGerenciaOrAdmin && !isOwnProfile) {
            throw new ForbiddenException('You can only view your own profile');
        }

        return user;
    }
}
