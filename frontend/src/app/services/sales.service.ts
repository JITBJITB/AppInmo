import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFichaDto, FichaVenta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:3000/sales';

  constructor(private http: HttpClient) { }

  createFicha(data: CreateFichaDto): Observable<FichaVenta> {
    return this.http.post<FichaVenta>(this.apiUrl, data);
  }

  getOne(id: number): Observable<FichaVenta> {
    return this.http.get<FichaVenta>(`${this.apiUrl}/${id}`);
  }
}
