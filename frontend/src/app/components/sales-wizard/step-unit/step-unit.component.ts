import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects.service';
import { Proyecto, Unidad } from '../../../models';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-step-unit',
    imports: [CommonModule, FormsModule],
    templateUrl: './step-unit.component.html',
    styleUrls: ['./step-unit.component.css']
})
export class StepUnitComponent implements OnInit {
  @Output() unitSelected = new EventEmitter<Unidad>();

  projects: Proyecto[] = [];
  selectedProjectId: number | null = null;
  units: Unidad[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects().subscribe(data => this.projects = data);
  }

  onProjectChange() {
    if (this.selectedProjectId) {
      this.projectsService.getUnits(this.selectedProjectId).subscribe(data => {
        this.units = data.filter(u => u.estado === 'Disponible');
      });
    } else {
      this.units = [];
    }
  }

  selectUnit(unit: Unidad) {
    this.unitSelected.emit(unit);
  }
}
