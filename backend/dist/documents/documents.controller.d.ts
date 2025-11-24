import { DocumentsService } from './documents.service';
import type { Response } from 'express';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    downloadPromesa(id: string, res: Response): Promise<void>;
}
