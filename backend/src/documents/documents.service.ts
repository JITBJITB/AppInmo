import { Injectable, NotFoundException } from '@nestjs/common';
import PDFDocument = require('pdfkit');
import { SalesService } from '../sales/sales.service';

@Injectable()
export class DocumentsService {
    constructor(private salesService: SalesService) { }

    async generatePromesa(fichaId: number): Promise<Buffer> {
        const ficha = await this.salesService.findOne(fichaId) as any;
        if (!ficha) throw new NotFoundException('Ficha no encontrada');

        return new Promise((resolve) => {
            const doc = new PDFDocument();
            const buffers: Buffer[] = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });

            // Header
            doc.fontSize(20).text('PROMESA DE COMPRAVENTA', { align: 'center' });
            doc.moveDown();

            // Content
            doc.fontSize(12).text(`En Santiago, a ${new Date().toLocaleDateString()}, comparecen:`);
            doc.moveDown();

            doc.text(`VENDEDOR: INMOBILIARIA EJEMPLO S.A.`);
            doc.text(`COMPRADOR: ${ficha.clientePrincipal?.nombreCompleto || 'N/A'}, RUT: ${ficha.clientePrincipal?.rut || 'N/A'}`);
            doc.moveDown();

            doc.text(`PRIMERO: Por el presente acto, la Inmobiliaria promete vender y el Comprador promete comprar la unidad ${ficha.unidad.nombre} del proyecto ${ficha.unidad.proyecto.nombre}.`);
            doc.moveDown();

            doc.text(`SEGUNDO: El precio de la venta es de ${ficha.valorTotalUf} UF.`);
            doc.moveDown();

            doc.text('TERCERO: Forma de pago:');
            const plan = ficha.planesPago[0];
            if (plan) {
                doc.text(`- Pie: ${plan.montoPie} UF`);
                doc.text(`- Reserva: ${plan.montoReserva} UF`);
                doc.text(`- Saldo a financiar: ${plan.saldoAPagar} UF`);
            }
            doc.moveDown();

            doc.text('Firma Comprador: __________________________');
            doc.moveDown();
            doc.text('Firma Inmobiliaria: __________________________');

            doc.end();
        });
    }
}
