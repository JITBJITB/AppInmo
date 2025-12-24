import { Component, OnInit } from '@angular/core';

import { ClientsService } from '../../services/clients.service';
import { Cliente } from '../../models';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-client-list',
    imports: [RouterModule, FormsModule],
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Cliente[] = [];
  searchTerm: string = '';

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getClients(this.searchTerm).subscribe(data => {
      this.clients = data;
    });
  }

  onSearch() {
    this.loadClients();
  }
}
