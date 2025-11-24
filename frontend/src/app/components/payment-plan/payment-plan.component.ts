import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';
import { PlanPago, Cuota } from '../../models';

@Component({
  selector: 'app-payment-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {
  @Input() fichaId: number | null = null;
  plan: PlanPago | null = null;

  constructor(private financeService: FinanceService) { }

  ngOnInit() {
    if (this.fichaId) {
      this.loadPlan();
    }
  }

  loadPlan() {
    if (this.fichaId) {
      this.financeService.getPlan(this.fichaId).subscribe(data => this.plan = data);
    }
  }

  payCuota(cuota: Cuota) {
    if (confirm(`¿Confirmar pago de cuota #${cuota.numeroCuota}?`)) {
      this.financeService.markAsPaid(cuota.id).subscribe(() => {
        this.loadPlan(); // Reload to update status
      });
    }
  }
}
