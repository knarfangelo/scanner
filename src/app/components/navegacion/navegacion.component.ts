import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [],
  template: `
    <nav class="title-bar">
      <img class="icon" src="lampa-ap.png" alt="">
      <h1 class="title-bar-text">BIG DATA NACIONAL</h1>
    </nav>
  `,
  styleUrl: './navegacion.component.scss',
})
export class NavegacionComponent {

}
