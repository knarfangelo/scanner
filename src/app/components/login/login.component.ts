import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <header>
      <div class="conteiner">
        <img class="img" src="login.png" alt="">
        <main>
          <h1>Ingresa tus credenciales</h1>
          <label for="">Usuario:
            <input type="text" [(ngModel)]="user">
          </label>
          <label for="">Contraseña:
            <input type="password" [(ngModel)]="password">
          </label>
          <button (click)="onLogin()">INGRESA</button>
        </main>
      </div>
    </header>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Definir las credenciales correctas
  validUser: string = 'BigDataAP';
  validPassword: string = '@ldEc7rN£Krs07f,r<%}&';

  onLogin() {
    if (this.user === this.validUser && this.password === this.validPassword) {
      // Si las credenciales son correctas, redirige al HomeLayoutComponent
      this.router.navigate(['/']);
    } else {
      // Si las credenciales son incorrectas, muestra un mensaje o realiza alguna acción.
      alert('Credenciales incorrectas');
    }
  }
}
