"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const sales_service_1 = require("../sales/sales.service");
let DocumentsService = class DocumentsService {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    async generatePromesa(fichaId) {
        const ficha = await this.salesService.findOne(fichaId);
        if (!ficha)
            throw new common_1.NotFoundException('Ficha no encontrada');
        return new Promise((resolve) => {
            const doc = new PDFDocument();
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
            doc.fontSize(20).text('PROMESA DE COMPRAVENTA', { align: 'center' });
            doc.moveDown();
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
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map