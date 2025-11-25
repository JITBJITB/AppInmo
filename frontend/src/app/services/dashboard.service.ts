import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface KPIs {
    ventasMes: number;
    totalFundit: number;
    cuotasAtrasadas: number;
    activeBenefits: number;
}

export interface SalesByBroker {
    name: string;
    value: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    getKPIs(): Observable<KPIs> {
        return this.http.get<KPIs>(`${this.apiUrl}/kpis`);
    }

    getSalesByBroker(): Observable<SalesByBroker[]> {
        return this.http.get<SalesByBroker[]>(`${this.apiUrl}/sales-by-broker`);
    }
}
