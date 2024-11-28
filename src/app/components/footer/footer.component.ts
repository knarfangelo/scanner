import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      Copyrigth &copy; 2024 - Todos los derechos reservados SCD
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent { }
