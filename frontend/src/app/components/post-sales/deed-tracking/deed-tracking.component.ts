import { Component, Input, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PostSalesService, Escritura } from '../../../services/post-sales.service';

@Component({
    selector: 'app-deed-tracking',
    imports: [FormsModule],
    templateUrl: './deed-tracking.component.html'
})
export class DeedTrackingComponent implements OnInit {
    @Input() fichaId!: number;
    escritura: Escritura | null = null;
    loading = false;

    estados = ['En Redacción', 'Firmada', 'Ingresada CBR', 'Inscrita CBR', 'Entregada'];

    constructor(private postSalesService: PostSalesService) { }

    ngOnInit() {
        this.loadEscritura();
    }

    loadEscritura() {
        this.loading = true;
        this.postSalesService.getEscritura(this.fichaId).subscribe({
            next: (data) => {
                this.escritura = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    createEscritura() {
        this.postSalesService.createEscritura(this.fichaId, { estado: 'En Redacción' }).subscribe(data => {
            this.escritura = data;
        });
    }

    updateEscritura() {
        if (!this.escritura) return;
        this.postSalesService.updateEscritura(this.escritura.id, this.escritura).subscribe(data => {
            this.escritura = data;
            alert('Escritura actualizada');
        });
    }
}
