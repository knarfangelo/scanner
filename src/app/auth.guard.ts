import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si el usuario está logeado (esto puede ser más avanzado, pero por ahora lo verificamos en el componente Login)
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';  // Comprobamos el valor de 'isLoggedIn' en localStorage
    
    if (userLoggedIn) {
      return true;  // Si está logeado, permitimos el acceso a la ruta.
    } else {
      // Si no está logeado, redirigimos al login
      this.router.navigate(['/login']);
      return false;  // Denegamos el acceso a la ruta.
    }
  }
}
