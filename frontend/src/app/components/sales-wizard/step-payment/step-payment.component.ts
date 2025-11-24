import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuotaDto } from '../../../models';

@Component({
  selector: 'app-step-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-payment.component.html',
  styleUrls: ['./step-payment.component.css']
})
export class StepPaymentComponent {
  @Input() unitValue: number = 0;
  @Output() paymentDefined = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();

  piePercent: number = 10;
  pieMonto: number = 0;
  reservaMonto: number = 20; // Default reserva
  numCuotas: number = 1;

  ngOnChanges() {
    this.calculatePie();
  }

  calculatePie() {
    this.pieMonto = Math.round(this.unitValue * (this.piePercent / 100));
  }

  confirm() {
    // Generar cuotas simples (ejemplo: 1 sola cuota por el saldo del pie si se quisiera pagar en cuotas, 
    // pero aquí asumimos que el pie se paga y el resto es crédito. 
    // Para simplificar, generamos 1 cuota por el saldo a pagar del pie si fuera el caso, 
    // o simplemente pasamos los montos).

    // En este MVP, asumimos que el pie se paga al contado o en cuotas.
    // Generaremos cuotas para el PIE (si fuera el caso) o para el saldo.
    // Vamos a simplificar: El usuario define cuotas para pagar el PIE.

    const cuotas: CuotaDto[] = [];
    const montoCuota = Math.round(this.pieMonto / this.numCuotas);

    for (let i = 1; i <= this.numCuotas; i++) {
      cuotas.push({
        numero: i,
        monto: montoCuota,
        fechaVencimiento: new Date().toISOString() // TODO: Calcular fechas reales
      });
    }

    this.paymentDefined.emit({
      pie: this.pieMonto,
      reserva: this.reservaMonto,
      cuotas: cuotas
    });
  }
}
