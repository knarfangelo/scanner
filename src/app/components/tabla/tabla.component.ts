import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/Persona';
import { PersonasService } from '../../services/Personas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../services/Filter.service';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/Loading.service';  // Importamos el servicio de carga

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  personas: Persona[] = [];  // Aquí guardamos las personas filtradas
  filters: any = {
    page: 1
  };  // Aquí guardamos los filtros
  page = 1
  activePage: number = 1; // Página activa (por defecto la página 1)
  isLoading: boolean = false;  // Para manejar el estado de carga
  totalRecords: number = 0;  // Variable para almacenar el total de registros

  totalPages: number = 0; // Total de páginas
  pageButtons: number[] = []; // Botones visibles en la paginación
  maxVisibleButtons: number = 3; // Número máximo de botones visibles (antes de "...")




  constructor(
    private filterService: FilterService,
    private personasService: PersonasService,
    private loadingService: LoadingService  // Inyectamos el servicio de carga
  ) {}

  nextPage(){
    this.filters.page++
    this.filterService.saveFilters(this.filters)
    this.filters = this.filterService.getFilters()
    this.filterService.updateReactiveFilters();
    this.filterService.saveFilters(this.filters)
    this.page = this.filters.page * this.filters.limit
  }
  prevPage(){
    if(this.filters.page > 1){
    this.filters.page--
    this.filterService.saveFilters(this.filters)
    this.filters = this.filterService.getFilters()
    this.filterService.updateReactiveFilters();
    this.filterService.saveFilters(this.filters)
    this.page = this.filters.num * this.filters.limit
    }
  }


  ngOnInit(): void {
    // Suscribirse a los cambios de los filtros en el servicio
    this.filterService.filters$.subscribe(filters => {
      this.filters = filters;
      // Hacer la consulta de personas cada vez que los filtros cambien
      this.filterService.updateUrl(filters);
      this.fetchFilteredPersonas();
    });

    // Suscribirse al estado de carga del servicio
    this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  // Llamar a la API para obtener las personas filtradas
  fetchFilteredPersonas(): void {
    const page = this.filters.page || 1;
    const limit = this.filters.limit || 100;
  
    this.loadingService.showLoading();
  
    this.personasService.getFilteredPersonas(this.filters, page, limit).subscribe({
      next: (data) => {
        this.personas = data.content;
        this.totalRecords = data.totalElements;
        this.totalPages = Math.ceil(this.totalRecords / limit); // Calcular total de páginas
        this.generatePageButtons(); // Generar los botones visibles
        this.loadingService.hideLoading();
      },
      error: (err) => {
        console.error('Error fetching personas:', err);
        this.loadingService.hideLoading();
      },
    });
  }
  

  calcularEdad(fechaNac: string): number {
    const fechaNacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  convertirFecha(formatoISO: string): string {
    if (!formatoISO) return ''; // Manejar fechas nulas o vacías
  
    const [anio, mes, dia] = formatoISO.split('-'); // Dividir por el formato AAAA-MM-DD
  
    return `${dia}-${mes}-${anio}`; // Construir el formato DD-MM-AAAA
  }
  
  separarPorComas(numero: number): string {
    return numero.toLocaleString();
  }

  generatePageButtons(): void {
    const maxButtons = this.maxVisibleButtons; // Máximo número de botones consecutivos visibles
    const currentPage = this.filters.page;
    const totalPages = this.totalPages;
  
    this.pageButtons = [];
  
    if (totalPages <= maxButtons + 2) {
      // Mostrar todas las páginas si el total es menor o igual al rango de botones visibles más extras
      this.pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Calcular botones visibles dinámicamente
      const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  
      for (let i = startPage; i <= endPage; i++) {
        this.pageButtons.push(i);
      }
  
      // Agregar "..." y el último botón si corresponde
      if (endPage < totalPages) {
        this.pageButtons.push(-1, totalPages); // -1 para representar "..."
      }
    }
  }
  
  
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.filters.page) return;

    this.filters.page = page;
    this.activePage = page; // Cambiar la página activa
    this.filterService.saveFilters(this.filters);
    this.fetchFilteredPersonas();
  }

  
  
  formatNumberToHundreds(number: number): string {
    return number.toLocaleString('en-US'); // Usa el separador de miles (coma) por defecto en el formato en-US
  }
  


}
