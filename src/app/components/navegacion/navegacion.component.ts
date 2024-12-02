import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [],
  template: `
    <nav class="title-bar">
      <img class="icon" src="icon.svg" alt="">
      <h1 class="title-bar-text">SCD - Sistema de Contacto Directo</h1>
    </nav>
  `,
  styleUrl: './navegacion.component.scss',
})
export class NavegacionComponent {

}
