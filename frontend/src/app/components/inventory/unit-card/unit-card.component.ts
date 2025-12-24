import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitDTO } from '../../../models/inventory.model';

@Component({
    selector: 'app-unit-card',
    imports: [CommonModule],
    templateUrl: './unit-card.component.html',
    styleUrls: ['./unit-card.component.css']
})
export class UnitCardComponent {
    @Input() unit!: UnitDTO;

    get statusClass(): string {
        switch (this.unit.status) {
            case 'AVAILABLE': return 'status-available';
            case 'RESERVED': return 'status-reserved';
            case 'SOLD': return 'status-sold';
            default: return '';
        }
    }
}
