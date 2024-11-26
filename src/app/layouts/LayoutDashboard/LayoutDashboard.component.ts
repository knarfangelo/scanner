import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavegacionComponent } from "../../components/navegacion/navegacion.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormularioComponent } from "../../components/formulario/formulario.component";
import { TablaComponent } from "../../components/tabla/tabla.component";
import { PersonasService } from '../../services/Personas.service';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [NavegacionComponent, FooterComponent, FormularioComponent, TablaComponent],
  template: `
  <app-navegacion></app-navegacion>
  <header>
    <div class="cabezado">
      <h1>Lista de Registros</h1>
      <div class="button">
        <button>Filtrar</button>
        <button>Nueva Busqueda</button>
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
  constructor(private personasService: PersonasService) {

  }

  
}
