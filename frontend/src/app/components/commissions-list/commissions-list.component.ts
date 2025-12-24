import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsService } from '../../services/commissions.service';
import { AuthService } from '../../services/auth.service';
import { FichaVenta } from '../../models';

@Component({
    selector: 'app-commissions-list',
    imports: [CommonModule],
    templateUrl: './commissions-list.component.html'
})
export class CommissionsListComponent implements OnInit {
  commissions: FichaVenta[] = [];
  loading = false;
  userRole: string = '';

  constructor(
    private commissionsService: CommissionsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userRole = user.rol;
        this.loadCommissions();
      }
    });
  }

  loadCommissions() {
    this.loading = true;
    const request = this.userRole === 'Broker'
      ? this.commissionsService.getMyCommissions()
      : this.commissionsService.getAllCommissions();

    request.subscribe({
      next: (data) => {
        this.commissions = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateStatus(ficha: FichaVenta, status: string) {
    this.commissionsService.updateStatus(ficha.id, status).subscribe(() => {
      ficha.estadoComisionBroker = status;
    });
  }

  getBadgeClass(status: string | undefined): string {
    switch (status) {
      case 'Pagada': return 'bg-green-100 text-green-800';
      case 'Factura Recibida': return 'bg-blue-100 text-blue-800';
      case 'Solicitar Factura': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
