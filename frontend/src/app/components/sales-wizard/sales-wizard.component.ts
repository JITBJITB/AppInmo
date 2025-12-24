import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { StepUnitComponent } from './step-unit/step-unit.component';
import { StepClientComponent } from './step-client/step-client.component';
import { StepPaymentComponent } from './step-payment/step-payment.component';
import { StepSummaryComponent } from './step-summary/step-summary.component';
import { CreateFichaDto, Unidad, Cliente } from '../../models';
import { SalesService } from '../../services/sales.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sales-wizard',
    imports: [RouterModule, StepUnitComponent, StepClientComponent, StepPaymentComponent, StepSummaryComponent],
    templateUrl: './sales-wizard.component.html',
    styleUrls: ['./sales-wizard.component.css']
})
export class SalesWizardComponent {
  currentStep = 1;
  fichaData: Partial<CreateFichaDto> = {
    cuotas: []
  };
  selectedUnit: Unidad | null = null;
  selectedClient: Cliente | null = null;

  constructor(private salesService: SalesService, private router: Router) { }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onUnitSelected(unit: Unidad) {
    this.selectedUnit = unit;
    this.fichaData.unidadId = unit.id;
    this.nextStep();
  }

  onClientSelected(client: Cliente) {
    this.selectedClient = client;
    this.fichaData.clienteId = client.id;
    this.nextStep();
  }

  onPaymentDefined(paymentData: any) {
    this.fichaData.descuentoPorcentaje = paymentData.descuentoPorcentaje;
    this.fichaData.incluyeEstacionamiento = paymentData.incluyeEstacionamiento;
    this.fichaData.incluyeBodega = paymentData.incluyeBodega;
    this.fichaData.usaAporteInmobiliaria = paymentData.usaAporteInmobiliaria;
    this.fichaData.formaPago = paymentData.formaPago;

    // Legacy mapping (optional, but good for safety if other parts use it)
    this.fichaData.pieMonto = paymentData.formaPago.ahorro;
    this.fichaData.reservaMonto = paymentData.formaPago.reserva;

    this.nextStep();
  }

  onGenerateCotizacion(paymentData: any) {
    const data: CreateFichaDto = {
      ...this.fichaData,
      descuentoPorcentaje: paymentData.descuentoPorcentaje,
      incluyeEstacionamiento: paymentData.incluyeEstacionamiento,
      incluyeBodega: paymentData.incluyeBodega,
      usaAporteInmobiliaria: paymentData.usaAporteInmobiliaria,
      formaPago: paymentData.formaPago
    } as CreateFichaDto;

    if (data.unidadId && data.clienteId) {
      this.salesService.generateCotizacion(data).subscribe({
        next: (res) => {
          console.log('Cotización generada:', res);
          // Here we would generate the PDF. For now, just alert or log.
          // In a real app, we might open a new window with the PDF or download it.
          // We can format the JSON to a readable string for the alert.
          const summary = `
Cotización Generada:
Cliente: ${res.clienteNombre}
Unidad: ${res.unidadNumero} (${res.unidadTipo})
Valor Base: ${res.valorBaseUf} UF
Descuento: ${res.descuentoPorcentaje}% (-${res.valorDescuentoUf} UF)
Estacionamiento: ${res.valorEstacionamientoUf} UF
Bodega: ${res.valorBodegaUf} UF
Subtotal: ${res.subtotalUf} UF
Aporte Inmobiliaria: ${res.valorAporteInmobiliariaUf} UF
TOTAL: ${res.valorTotalUf} UF
                `;
          alert(summary);
        },
        error: (err) => alert('Error al generar cotización: ' + err.message)
      });
    } else {
      alert('Faltan datos para generar la cotización (Unidad o Cliente)');
    }
  }

  confirmSale() {
    if (this.fichaData.unidadId && this.fichaData.clienteId) {
      this.salesService.createFicha(this.fichaData as CreateFichaDto).subscribe({
        next: (res) => {
          alert('Venta creada exitosamente: ' + res.folio);
          this.router.navigate(['/sales']);
        },
        error: (err) => alert('Error al crear venta: ' + err.message)
      });
    }
  }
}
