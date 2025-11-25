import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Usuario } from '../entities/usuario.entity';
import { BrokerCompany } from '../entities/broker-company.entity';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, BrokerCompany])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
