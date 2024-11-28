import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavegacionComponent } from "../../components/navegacion/navegacion.component";
import { Departamento, departamentoJSON } from './mantenimiento/DepartamentoJSON';
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [NavegacionComponent, FooterComponent, RouterLink],
  template: `
  <app-navegacion></app-navegacion>
  <header>
    <h1>Departamento</h1>
    <p>Escoja un departamento para empezar</p>
      <select class="select-departamento" name="" id="">
        @for (departamento of departamentos; track $index) {
          <option value="{{departamento.name}}">{{departamento.name}}</option>
        }
      </select>
    <button class="empezar" routerLink="/dashboard">Empezar</button>
  </header>
  <app-footer></app-footer>
  `,
  styleUrl: './homeLayout.component.scss',
})
export class HomeLayoutComponent {
  departamentos:Departamento[] = departamentoJSON;
}
