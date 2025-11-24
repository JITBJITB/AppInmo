import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Get('promesa/:id')
    @Roles('Agente', 'Broker', 'Admin')
    async downloadPromesa(@Param('id') id: string, @Res() res: Response) {
        const buffer = await this.documentsService.generatePromesa(+id);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=promesa-${id}.pdf`,
            'Content-Length': buffer.length,
        });

        res.end(buffer);
    }
}
