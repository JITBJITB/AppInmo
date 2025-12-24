import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormaPago } from '../../../models';

@Component({
    selector: 'app-step-payment',
    imports: [CommonModule, FormsModule],
    templateUrl: './step-payment.component.html',
    styleUrls: ['./step-payment.component.css']
})
export class StepPaymentComponent implements OnChanges {
  @Input() unitValue: number = 0;
  @Output() paymentDefined = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();
  @Output() generateCotizacion = new EventEmitter<any>();

  // Inputs
  descuentoPorcentaje: number = 0;
  incluyeEstacionamiento: boolean = false;
  incluyeBodega: boolean = false;
  usaAporteInmobiliaria: boolean = false;

  // Constants (Mock values for MVP)
  readonly VALOR_ESTACIONAMIENTO = 350;
  readonly VALOR_BODEGA = 100;

  // Calculated Values
  valorDescuento: number = 0;
  valorEstacionamiento: number = 0;
  valorBodega: number = 0;
  subtotal: number = 0;
  valorAporte: number = 0;
  valorTotal: number = 0;

  // Payment Methods
  formaPago: FormaPago = {
    reserva: 20,
    ahorro: 0,
    aporteInmobiliario: 0,
    creditoFundit: 0,
    creditoHipotecario: 0
  };

  sumaPago: number = 0;
  isValid: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['unitValue']) {
      this.calculateFinancials();
    }
  }

  calculateFinancials() {
    // 1. Discount
    this.valorDescuento = Math.round(this.unitValue * (this.descuentoPorcentaje / 100));
    const valorConDescuento = this.unitValue - this.valorDescuento;

    // 2. Optionals
    this.valorEstacionamiento = this.incluyeEstacionamiento ? this.VALOR_ESTACIONAMIENTO : 0;
    this.valorBodega = this.incluyeBodega ? this.VALOR_BODEGA : 0;

    // 3. Subtotal
    this.subtotal = valorConDescuento + this.valorEstacionamiento + this.valorBodega;

    // 4. Aporte
    this.valorAporte = this.usaAporteInmobiliaria ? Math.round(this.subtotal * 0.10) : 0;
    this.formaPago.aporteInmobiliario = this.valorAporte; // Auto-set aporte payment

    // 5. Total
    this.valorTotal = this.subtotal + this.valorAporte;

    this.calculatePaymentSum();
  }

  calculatePaymentSum() {
    this.sumaPago =
      (this.formaPago.reserva || 0) +
      (this.formaPago.ahorro || 0) +
      (this.formaPago.aporteInmobiliario || 0) +
      (this.formaPago.creditoFundit || 0) +
      (this.formaPago.creditoHipotecario || 0);

    // Allow small floating point error
    this.isValid = Math.abs(this.sumaPago - this.valorTotal) < 0.1;
  }

  onDescuentoChange() {
    if (this.descuentoPorcentaje < 0) this.descuentoPorcentaje = 0;
    if (this.descuentoPorcentaje > 15) this.descuentoPorcentaje = 15;
    this.calculateFinancials();
  }

  onOptionalChange() {
    this.calculateFinancials();
  }

  onPaymentChange() {
    this.calculatePaymentSum();
  }

  confirm() {
    if (this.isValid) {
      this.paymentDefined.emit({
        descuentoPorcentaje: this.descuentoPorcentaje,
        incluyeEstacionamiento: this.incluyeEstacionamiento,
        incluyeBodega: this.incluyeBodega,
        usaAporteInmobiliaria: this.usaAporteInmobiliaria,
        formaPago: this.formaPago
      });
    }
  }

  emitCotizacion() {
    this.generateCotizacion.emit({
      descuentoPorcentaje: this.descuentoPorcentaje,
      incluyeEstacionamiento: this.incluyeEstacionamiento,
      incluyeBodega: this.incluyeBodega,
      usaAporteInmobiliaria: this.usaAporteInmobiliaria,
      formaPago: this.formaPago
    });
  }
}
