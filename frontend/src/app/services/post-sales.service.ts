import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Escritura {
    id: number;
    estado: string;
    notaria?: string;
    repertorio?: string;
    fechaFirma?: Date;
    fechaInscripcion?: Date;
    observaciones?: string;
}

export interface Entrega {
    id: number;
    fechaProgramada?: Date;
    fechaReal?: Date;
    firmada: boolean;
    observaciones?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PostSalesService {
    private apiUrl = `${environment.apiUrl}/post-sales`;

    constructor(private http: HttpClient) { }

    // Escritura
    createEscritura(fichaId: number, data: any): Observable<Escritura> {
        return this.http.post<Escritura>(`${this.apiUrl}/escrituras/${fichaId}`, data);
    }

    updateEscritura(id: number, data: any): Observable<Escritura> {
        return this.http.patch<Escritura>(`${this.apiUrl}/escrituras/${id}`, data);
    }

    getEscritura(fichaId: number): Observable<Escritura> {
        return this.http.get<Escritura>(`${this.apiUrl}/escrituras/ficha/${fichaId}`);
    }

    // Entrega
    scheduleEntrega(fichaId: number, date: Date): Observable<Entrega> {
        return this.http.post<Entrega>(`${this.apiUrl}/entregas/${fichaId}/schedule`, { date });
    }

    completeEntrega(id: number, observations: string): Observable<Entrega> {
        return this.http.patch<Entrega>(`${this.apiUrl}/entregas/${id}/complete`, { observations });
    }

    getEntrega(fichaId: number): Observable<Entrega> {
        return this.http.get<Entrega>(`${this.apiUrl}/entregas/ficha/${fichaId}`);
    }
}
