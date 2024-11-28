import { FetchBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<any>({
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
    fechaFinal:''
  });

  filters$ = this.filtersSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // Establecer los filtros desde el formulario
  setFilters(filters: any): void {
    this.filtersSubject.next(filters);
    this.updateUrl(filters); // Actualiza la URL con los filtros
  }

  // Obtener los filtros actuales
  getFilters(): any {
    return this.filtersSubject.value;
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
    const filters = {
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
    };
    this.filtersSubject.next(filters);
  }

  // Agregar o actualizar un filtro específico
  addOrUpdateFilter(param: string, value: string): void {
    const currentFilters = this.getFilters();
    currentFilters[param] = value; // Actualiza el filtro en la lista
    this.setFilters(currentFilters); // Actualiza los filtros y la URL
  }

  // Eliminar un filtro específico
  removeFilter(param: string): void {
    const currentFilters = this.getFilters();
    delete currentFilters[param];
    this.setFilters(currentFilters);
  }
  applyFilters(): void {
    const currentFilters = this.getFilters();
    console.log('Filtros aplicados:', currentFilters);
  
    // Si quieres aplicar todos los filtros de alguna manera, por ejemplo:
    Object.keys(currentFilters).forEach(key => {
      if (currentFilters[key]) {
        // Llamar a addOrUpdateFilter si deseas modificar alguno de los filtros
        this.addOrUpdateFilter(key, currentFilters[key]);
      }
    });
  }

  updateFilterFields(updatedFields: any): void {
    const currentFilters = this.getFilters();
    // Actualiza los filtros existentes con los valores proporcionados
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] !== undefined) {
        currentFilters[key] = updatedFields[key];
      }
    });
  }

}
