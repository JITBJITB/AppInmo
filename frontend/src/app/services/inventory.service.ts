import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BuildingResponseDTO, FloorDTO, UnitDTO } from '../models/inventory.model';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    constructor() { }

    getBuildingData(buildingId: string): Observable<BuildingResponseDTO> {
        // Mock data generation
        const floors: FloorDTO[] = [];
        const totalFloors = buildingId === 'A' ? 10 : 25;
        const unitsPerFloor = buildingId === 'A' ? 5 : 12;

        for (let i = 1; i <= totalFloors; i++) {
            const units: UnitDTO[] = [];
            for (let j = 1; j <= unitsPerFloor; j++) {
                const statusRandom = Math.random();
                let status: 'AVAILABLE' | 'RESERVED' | 'SOLD' = 'AVAILABLE';
                if (statusRandom > 0.7) status = 'RESERVED';
                if (statusRandom > 0.9) status = 'SOLD';

                units.push({
                    id: `${buildingId}-${i}-${j}`,
                    number: `${i}0${j}`,
                    status: status,
                    typology: j % 2 === 0 ? '2D2B' : '1D1B',
                    area: j % 2 === 0 ? 85 : 50,
                    orientation: j % 2 === 0 ? 'NE' : 'SW',
                    price: j % 2 === 0 ? 5000 : 3500
                });
            }
            floors.push({ floorNumber: i, units: units });
        }

        const mockBuilding: BuildingResponseDTO = {
            id: buildingId,
            name: `Edificio ${buildingId}`,
            totalFloors: totalFloors,
            floorStructure: floors.reverse() // Top floors first usually
        };

        return of(mockBuilding);
    }

    getBuildings(): Observable<{ id: string, name: string }[]> {
        return of([
            { id: 'A', name: 'Edificio A' },
            { id: 'B', name: 'Edificio B' },
            { id: 'C', name: 'Edificio C' },
            { id: 'D', name: 'Edificio D' },
            { id: 'E', name: 'Edificio E' },
            { id: 'F', name: 'Edificio F' },
        ]);
    }
}
