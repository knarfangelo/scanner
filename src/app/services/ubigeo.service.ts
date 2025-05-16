// ubigeo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private departamentos: any[] = [];
  private provincias: any[] = [];
  private distritos: any[] = [];

  constructor(private http: HttpClient) { }

  loadData(): Observable<boolean> {
    return forkJoin([
      this.http.get<any[]>('/ubicacion/departamentos.json'),
      this.http.get<any[]>('/ubicacion/provincias.json'),
      this.http.get<any[]>('/ubicacion/distritos.json')
    ]).pipe(
      map(([deptos, provs, dists]) => {
        this.departamentos = deptos;
        this.provincias = provs;
        this.distritos = dists;
        return true;
      })
    );
  }

  getDepartamentos(): any[] {
    return this.departamentos;
  }

  getProvinciasByDepartamento(idDepa: number): any[] {
    return this.provincias.filter(p => p.id_depa === idDepa);
  }

  getDistritosByProvincia(idProv: number): any[] {
    return this.distritos.filter(d => d.id_prov === idProv);
  }
}