import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) { }

  getClients(search?: string): Observable<Cliente[]> {
    let params: any = {};
    if (search) {
      params.search = search;
    }
    return this.http.get<Cliente[]>(this.apiUrl, { params });
  }

  getClient(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, client);
  }
}
