import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Cliente } from '../entities/cliente.entity';
import { DocumentoCliente } from '../entities/documento-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, DocumentoCliente])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule { }
