import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Unidad, Proyecto } from '../../models';

@Component({
    selector: 'app-inventory-view',
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

  floors: { floorNumber: number, units: Unidad[] }[] = [];

  loadUnits() {
    this.projectsService.getUnits(this.projectId).subscribe(data => {
      this.units = data;
      this.filteredUnits = data;
      this.groupUnitsByFloor();
    });
  }

  groupUnitsByFloor() {
    const grouped = this.filteredUnits.reduce((acc, unit) => {
      const floor = unit.piso;
      if (!acc[floor]) {
        acc[floor] = [];
      }
      acc[floor].push(unit);
      return acc;
    }, {} as { [key: number]: Unidad[] });

    this.floors = Object.keys(grouped)
      .map(floor => ({
        floorNumber: +floor,
        units: grouped[+floor].sort((a, b) => {
          // Extraer los últimos 2 dígitos del nombre (D-201 -> 01, D-S1015 -> 15)
          const getLastTwoDigits = (name: string) => {
            const match = name.match(/(\d{2})$/);
            return match ? parseInt(match[1]) : 0;
          };
          return getLastTwoDigits(a.nombre) - getLastTwoDigits(b.nombre);
        })
      }))
      .sort((a, b) => b.floorNumber - a.floorNumber); // Sort floors descending (top to bottom)
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
