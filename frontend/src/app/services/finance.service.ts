import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanPago, Cuota } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = 'http://localhost:3000/finance';

  constructor(private http: HttpClient) { }

  getPlan(fichaId: number): Observable<PlanPago> {
    return this.http.get<PlanPago>(`${this.apiUrl}/fichas/${fichaId}/plan`);
  }

  markAsPaid(cuotaId: number): Observable<Cuota> {
    return this.http.patch<Cuota>(`${this.apiUrl}/cuotas/${cuotaId}/pay`, {});
  }
}
