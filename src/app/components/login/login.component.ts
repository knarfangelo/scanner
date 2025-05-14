import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="logo-section">
          <img class="logo" src="logo-avanza-pais.png" alt="Logo Avanza País">
        </div>
        
        <div class="form-section">
          <h1 class="title">Ingresa tus credenciales</h1>
          
          <form (submit)="onLogin()" class="login-form">
            <div class="form-group">
              <label for="username">Usuario</label>
              <input 
                type="text" 
                id="username" 
                [(ngModel)]="user" 
                name="user"
                placeholder="Ingresa tu usuario"
                required>
            </div>
            
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                [(ngModel)]="password" 
                name="password"
                placeholder="Ingresa tu contraseña"
                required>
            </div>
            
            <button type="submit" class="login-button">INGRESAR</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    localStorage.setItem('isLoggedIn', 'false');
  }

  validUser: string = 'admin';
  validPassword: string = 'admin';

  onLogin() {
    if (this.user === this.validUser && this.password === this.validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}