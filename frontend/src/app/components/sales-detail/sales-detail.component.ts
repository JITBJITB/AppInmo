import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { FichaVenta } from '../../models';
import { PaymentPlanComponent } from '../payment-plan/payment-plan.component';
import { DeedTrackingComponent } from '../post-sales/deed-tracking/deed-tracking.component';
import { DeliveryActComponent } from '../post-sales/delivery-act/delivery-act.component';

@Component({
    selector: 'app-sales-detail',
    imports: [CommonModule, PaymentPlanComponent, DeedTrackingComponent, DeliveryActComponent],
    templateUrl: './sales-detail.component.html',
    styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {
  ficha: FichaVenta | null = null;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salesService.getOne(+id).subscribe(data => this.ficha = data);
    }
  }

  downloadPromesa() {
    if (this.ficha) {
      window.open(`http://localhost:3000/documents/promesa/${this.ficha.id}`, '_blank');
    }
  }
}
