import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unidad, Cliente, CreateFichaDto } from '../../../models';

@Component({
    selector: 'app-step-summary',
    imports: [CommonModule],
    templateUrl: './step-summary.component.html',
    styleUrls: ['./step-summary.component.css']
})
export class StepSummaryComponent {
  @Input() unit: Unidad | null = null;
  @Input() client: Cliente | null = null;
  @Input() fichaData: Partial<CreateFichaDto> = {};
  @Output() confirm = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
