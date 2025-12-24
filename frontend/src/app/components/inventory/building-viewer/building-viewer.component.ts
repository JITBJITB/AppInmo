import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../../../services/inventory.service';
import { BuildingResponseDTO } from '../../../models/inventory.model';
import { FloorRowComponent } from '../floor-row/floor-row.component';

@Component({
    selector: 'app-building-viewer',
    imports: [FloorRowComponent],
    templateUrl: './building-viewer.component.html',
    styleUrls: ['./building-viewer.component.css']
})
export class BuildingViewerComponent implements OnInit {
    selectedBuildingId: string = 'A';
    buildingData: BuildingResponseDTO | null = null;
    buildings: { id: string, name: string }[] = [];
    loading: boolean = false;

    constructor(private inventoryService: InventoryService) { }

    ngOnInit(): void {
        this.loadBuildings();
        this.loadBuildingData(this.selectedBuildingId);
    }

    loadBuildings(): void {
        this.inventoryService.getBuildings().subscribe(buildings => {
            this.buildings = buildings;
        });
    }

    onBuildingSelect(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        this.selectedBuildingId = selectElement.value;
        this.loadBuildingData(this.selectedBuildingId);
    }

    loadBuildingData(buildingId: string): void {
        this.loading = true;
        this.inventoryService.getBuildingData(buildingId).subscribe(data => {
            this.buildingData = data;
            this.loading = false;
        });
    }
}
