import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/Persona';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private baseUrl = 'http://localhost:8080/personas/filtered'; // Cambia por tu base URL

  constructor(private http: HttpClient) {}

  getFilteredPersonas(filters: any, page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    // Agregar filtros dinámicos
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get(this.baseUrl, { params });
  }

}
