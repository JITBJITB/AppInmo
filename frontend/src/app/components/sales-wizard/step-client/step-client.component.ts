import { Component, EventEmitter, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { Cliente } from '../../../models';

@Component({
    selector: 'app-step-client',
    imports: [FormsModule],
    templateUrl: './step-client.component.html',
    styleUrls: ['./step-client.component.css']
})
export class StepClientComponent {
  @Output() clientSelected = new EventEmitter<Cliente>();
  @Output() back = new EventEmitter<void>();

  searchTerm: string = '';
  clients: Cliente[] = [];
  selectedClient: Cliente | null = null;

  constructor(private clientsService: ClientsService) { }

  search() {
    this.clientsService.getClients(this.searchTerm).subscribe(data => {
      this.clients = data;
    });
  }

  selectClient(client: Cliente) {
    this.selectedClient = client;
  }

  confirm() {
    if (this.selectedClient) {
      this.clientSelected.emit(this.selectedClient);
    }
  }
}
