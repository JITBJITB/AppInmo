import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto, Unidad } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'http://localhost:3000/projects'; // TODO: Env var

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  getUnits(projectId: number): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}/${projectId}/units`);
  }
}
