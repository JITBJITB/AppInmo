import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Unidad, Proyecto } from '../../models';

@Component({
  selector: 'app-inventory-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {
  units: Unidad[] = [];
  filteredUnits: Unidad[] = [];
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('id')!;
      this.loadUnits();
    });
  }

  loadUnits() {
    this.projectsService.getUnits(this.projectId).subscribe(data => {
      this.units = data;
      this.filteredUnits = data;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Disponible': return 'bg-green-500';
      case 'Reservada': return 'bg-yellow-500';
      case 'Vendida': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }
}
