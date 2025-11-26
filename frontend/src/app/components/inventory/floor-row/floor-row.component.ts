import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorDTO } from '../../../models/inventory.model';
import { UnitCardComponent } from '../unit-card/unit-card.component';

@Component({
    selector: 'app-floor-row',
    standalone: true,
    imports: [CommonModule, UnitCardComponent],
    templateUrl: './floor-row.component.html',
    styleUrls: ['./floor-row.component.css']
})
export class FloorRowComponent {
    @Input() floor!: FloorDTO;
}
