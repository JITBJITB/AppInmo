import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [SalesModule],
  providers: [DocumentsService],
  controllers: [DocumentsController]
})
export class DocumentsModule { }
