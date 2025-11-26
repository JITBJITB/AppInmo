export interface UnitDTO {
    id: string;
    number: string;
    status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
    typology: string; // e.g., "1D1B"
    area: number; // m2
    orientation: string; // e.g., "NE", "SW"
    price: number; // UF or CLP
}

export interface FloorDTO {
    floorNumber: number;
    units: UnitDTO[];
}

export interface BuildingResponseDTO {
    id: string;
    name: string;
    totalFloors: number;
    floorStructure: FloorDTO[];
}
