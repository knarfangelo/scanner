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
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  personas: Persona[] = [];  // Aquí guardamos las personas filtradas
  filters: any = {};  // Aquí guardamos los filtros
  isLoading: boolean = false;  // Para manejar el estado de carga

  constructor(
    private filterService: FilterService,
    private personasService: PersonasService,
    private loadingService: LoadingService  // Inyectamos el servicio de carga
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de los filtros en el servicio
    this.filterService.filters$.subscribe(filters => {
      this.filters = filters;
      // Hacer la consulta de personas cada vez que los filtros cambien
      this.fetchFilteredPersonas();
    });

    // Suscribirse al estado de carga del servicio
    this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  // Llamar a la API para obtener las personas filtradas
  fetchFilteredPersonas(): void {
    const page = 1;
    const limit = 50;

    // Activar la pantalla de carga antes de hacer la solicitud
    this.loadingService.showLoading();

    this.personasService.getFilteredPersonas(this.filters, page, limit).subscribe({
      next: (data) => {
        this.personas = data.content;  // Asumiendo que la API devuelve las personas en 'content'
        // Desactivar la pantalla de carga después de recibir los datos
        this.loadingService.hideLoading();
      },
      error: (err) => {
        console.error('Error fetching personas:', err);
        // Desactivar la pantalla de carga en caso de error
        this.loadingService.hideLoading();
      }
    });
  }
}
