import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { Cliente } from '../../models';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  client: Partial<Cliente> = {};

  constructor(
    private clientsService: ClientsService,
    private router: Router
  ) { }

  onSubmit() {
    this.clientsService.createClient(this.client).subscribe(() => {
      this.router.navigate(['/clients']);
    });
  }
}
