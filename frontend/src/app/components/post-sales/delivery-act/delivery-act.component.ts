import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostSalesService, Entrega } from '../../../services/post-sales.service';

@Component({
    selector: 'app-delivery-act',
    imports: [CommonModule, FormsModule],
    templateUrl: './delivery-act.component.html'
})
export class DeliveryActComponent implements OnInit {
    @Input() fichaId!: number;
    entrega: Entrega | null = null;
    loading = false;
    scheduleDate: string = '';
    observations: string = '';

    constructor(private postSalesService: PostSalesService) { }

    ngOnInit() {
        this.loadEntrega();
    }

    loadEntrega() {
        this.loading = true;
        this.postSalesService.getEntrega(this.fichaId).subscribe({
            next: (data) => {
                this.entrega = data;
                if (data && data.fechaProgramada) {
                    this.scheduleDate = new Date(data.fechaProgramada).toISOString().split('T')[0];
                }
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    schedule() {
        if (!this.scheduleDate) return;
        this.postSalesService.scheduleEntrega(this.fichaId, new Date(this.scheduleDate)).subscribe(data => {
            this.entrega = data;
            alert('Entrega agendada');
        });
    }

    complete() {
        if (!this.entrega) return;
        this.postSalesService.completeEntrega(this.entrega.id, this.observations).subscribe(data => {
            this.entrega = data;
            alert('Entrega realizada con éxito');
        });
    }
}
