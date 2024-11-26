import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [],
  template: `
    <nav class="title-bar">
      <img src="icon.png" alt="">
      <h1 class="title-bar-text">SCD - Sistema de Contacto Directo</h1>
      <div class="tiempo">{{ currentTime }}</div>
    </nav>
  `,
  styleUrl: './navegacion.component.scss',
})
export class NavegacionComponent {
    currentTime: string = '';

  constructor() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000); // Actualiza cada segundo
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString(); // Obtén la hora con formato hh:mm:ss
  }
  
}
