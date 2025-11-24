import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FichaVenta } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CommissionsService {
    private apiUrl = `${environment.apiUrl}/commissions`;

    constructor(private http: HttpClient) { }

    getMyCommissions(): Observable<FichaVenta[]> {
        return this.http.get<FichaVenta[]>(`${this.apiUrl}/my`);
    }

    getAllCommissions(): Observable<FichaVenta[]> {
        return this.http.get<FichaVenta[]>(`${this.apiUrl}/all`);
    }

    updateStatus(fichaId: number, status: string): Observable<FichaVenta> {
        return this.http.patch<FichaVenta>(`${this.apiUrl}/${fichaId}/status`, { status });
    }
}
