import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/homeLayout/homeLayout.component';
import { LayoutDashboardComponent } from './layouts/LayoutDashboard/LayoutDashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeLayoutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: LayoutDashboardComponent, canActivate: [AuthGuard] },  // Protegemos esta ruta
];
