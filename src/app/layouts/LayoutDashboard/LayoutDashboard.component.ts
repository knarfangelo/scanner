import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavegacionComponent } from "../../components/navegacion/navegacion.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormularioComponent } from "../../components/formulario/formulario.component";
import { TablaComponent } from "../../components/tabla/tabla.component";
import { FilterService } from '../../services/Filter.service';
import { RouterLink } from '@angular/router';
import { PersonasService } from '../../services/Personas.service';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [NavegacionComponent, FooterComponent, FormularioComponent, TablaComponent,RouterLink],
  template: `
  <app-navegacion></app-navegacion>
  <header>
    <div class="cabezado">
      <h1>Lista de Registros</h1>
      <div class="button">
        <button (click)="applyFilters()">Filtrar</button>
        <a  href="/dashboard" (click)="reset()" >Resetear</a>
        <a href="/" class="salir"> SALIR </a>
      </div>
    </div>
  </header>
  <section class="info">
  <app-formulario></app-formulario>
  <app-tabla></app-tabla>
  </section>
  <app-footer></app-footer>
  `,
  styleUrl: './LayoutDashboard.component.scss',
})
export class LayoutDashboardComponent {
  dni: string = '';  // Variable para almacenar el DNI ingresado


  constructor(private filterService: FilterService, personasService:PersonasService) {}
  
  // Método para aplicar los filtros
  applyFilters(): void {
    console.log('Aplicando filtros...');
    this.filterService.updateReactiveFilters();  // Llamamos al método para aplicar los filtros
  }

  
  


  filters = {
    dni: "",
    apPat: "",
    apMat: "",
    nombres: "",
    fechaNac: "",
    direccion: "",
    sexo: "",
    estCivil: "",
    departamento: "",
    provincia: "",
    distrito: "",
    fechaInicial: "",
    fechaFinal:"",
    page: 1,
    limit: 100
  };

  reset(){
    this.filterService.saveFilters(this.filters);
    this.filterService.applyFilters();
    this.filterService.updateReactiveFilters();
    this.filterService.updateUrl("/");
  }

}
