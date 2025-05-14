import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavegacionComponent } from "../../components/navegacion/navegacion.component";
import { Departamento, departamentoJSON } from './mantenimiento/DepartamentoJSON';
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink } from '@angular/router';
import { FilterService } from '../../services/Filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [NavegacionComponent, FooterComponent, RouterLink, CommonModule, FormsModule],
  template: `
    <app-navegacion></app-navegacion>
    <header>
      <select class="select-departamento" [(ngModel)]="departamentoSeleccionado" (change)="aplicarFiltro()">
        <option class="todo-peru" value="">TODO EL PERÚ</option>
        <option *ngFor="let departamento of departamentos" [value]="departamento.name">{{departamento.name}}</option>
      </select>
  
      <button class="empezar" routerLink="/dashboard" [queryParams]="{ departamento: departamentoSeleccionado }">Empezar</button>
    </header>

    <app-footer></app-footer>
  `,
  styleUrls: ['./homeLayout.component.scss'],
})
export class HomeLayoutComponent {
  departamentos: Departamento[] = departamentoJSON;  // Lista de departamentos
  departamentoSeleccionado: string = '';  // Variable para almacenar el departamento seleccionado

  constructor(
    private filterService: FilterService,
  ) {}

  // Método para aplicar el filtro cuando se selecciona un departamento
  aplicarFiltro() {
    const filters = {
      dni: "",
      apPat: "",
      apMat: "",
      nombres: "",
      fechaNac: "",
      direccion: "",
      sexo: "",
      estCivil: "",
      departamento: this.departamentoSeleccionado,
      provincia: "",
      distrito: "",
      fechaInicial: "",
      fechaFinal:"",
      page: 1,
      limit: 100
    };
    if (this.departamentoSeleccionado !== 'peru') {
      // Llamar al servicio de filtros para aplicar el filtro
      this.filterService.saveFilters(filters);
      console.log(this.filterService.getFilters);
      this.filterService.updateReactiveFilters();
      this.filterService.applyFilters();
      
      console.log('Filtro aplicado para departamento:', this.departamentoSeleccionado);
    }
  }
}
