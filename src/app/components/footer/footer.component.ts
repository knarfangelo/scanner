import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      Copyrigth &copy; 2024 - Todos los derechos reservados SCD
      <div class="tiempo">{{ currentTime }}</div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

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
