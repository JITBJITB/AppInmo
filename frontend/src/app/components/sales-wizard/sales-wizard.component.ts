import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  standalone: true,
  imports: [CommonModule, RouterModule, StepUnitComponent, StepClientComponent, StepPaymentComponent, StepSummaryComponent],
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
    this.fichaData.pieMonto = paymentData.pie;
    this.fichaData.reservaMonto = paymentData.reserva;
    this.fichaData.cuotas = paymentData.cuotas;
    this.nextStep();
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
