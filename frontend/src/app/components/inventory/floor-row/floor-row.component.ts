import { Component, Input } from '@angular/core';

import { FloorDTO } from '../../../models/inventory.model';
import { UnitCardComponent } from '../unit-card/unit-card.component';

@Component({
    selector: 'app-floor-row',
    imports: [UnitCardComponent],
    templateUrl: './floor-row.component.html',
    styleUrls: ['./floor-row.component.css']
})
export class FloorRowComponent {
    @Input() floor!: FloorDTO;
}
