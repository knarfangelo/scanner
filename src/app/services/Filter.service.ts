import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Persona } from '../interfaces/Persona';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // Filtro normal que almacena los valores sin ser reactivo
  private filters: any = {
    dni: '', // Filtro de ejemplo
    apPat: '',
    apMat: '',
    nombres: '',
    fechaNac: '',
    direccion: '',
    sexo: '',
    estCivil: '',
    departamento: '',
    provincia: '',
    distrito: '',
    fechaInicial: '',
    page: 1, // Página actual
    limit: 100, // Registros por página
    totalElements: 0 // Total de registros
  };

  private listaFiltrados:Persona[] = [];

  // Filtro reactivo (BehaviorSubject)
  private filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.filters);
  filters$ = this.filtersSubject.asObservable(); // Exponer el filtro reactivo como un observable

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // Obtener los filtros actuales (filtro no reactivo)
  getFilters(): any {
    return this.filters;
  }

  // Obtener la versión reactiva de los filtros
  getReactiveFilters(): any {
    return this.filtersSubject.value;
  }

  // Guardar los filtros (filtro no reactivo)
  saveFilters(filters: any): void {
    this.filters = { ...filters }; // Guarda los filtros sin aplicar los cambios
  }

  // Actualizar los filtros reactivos con los valores del filtro normal
  updateReactiveFilters(): void {
    this.filtersSubject.next({ ...this.filters }); // Actualiza el BehaviorSubject con el filtro actual
  }

  // Aplicar los filtros (esto incluye actualizar la URL y ejecutar otras acciones)
  applyFilters(): void {
    this.updateUrl(this.filters); // Actualiza la URL con los filtros

    // Aquí puedes realizar cualquier acción adicional para aplicar los filtros
    console.log('Filtros aplicados:', this.filters);
  }

  // Actualizar la URL con los filtros
  updateUrl(filters: any): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filters,
      queryParamsHandling: 'merge' // Mantiene otros parámetros en la URL
    });
  }

  // Recuperar los filtros desde la URL
  setFiltersFromUrl(params: any): void {
    this.filters = {
      dni: params['dni'] || '',
      apPat: params['apPat'] || '',
      apMat: params['apMat'] || '',
      nombres: params['nombres'] || '',
      fechaNac: params['fechaNac'] || '',
      direccion: params['direccion'] || '',
      sexo: params['sexo'] || '',
      estCivil: params['estCivil'] || '',
      departamento: params['departamento'] || '',
      provincia: params['provincia'] || '',
      distrito: params['distrito'] || '',
      fechaInicial: params['fechaInicial'] || '',
      fechaFinal: params['fechaFinal'] || '',
      page: params['page'] || 1, // Recuperar número de página
      limit: params['limit'] || 100, // Recuperar tamaño de página
    };
    this.updateReactiveFilters();  // Actualiza los filtros reactivos con los nuevos valores
  }

  // Agregar o actualizar un filtro específico (en el filtro normal y reactivo)
  addOrUpdateFilter(param: string, value: string): void {
    this.filters[param] = value; // Actualiza el filtro en el filtro normal
    this.saveFilters(this.filters); // Guarda los filtros (incluyendo el reactivo)
  }

  // Eliminar un filtro específico
  removeFilter(param: string): void {
    delete this.filters[param]; // Elimina el filtro del filtro normal
    this.saveFilters(this.filters); // Guarda los filtros (incluyendo el reactivo)
  }

  saveInfoFilters(listaFiltrados:Persona[]){
    this.listaFiltrados = listaFiltrados;
    console.log(this.listaFiltrados);
  }
}
