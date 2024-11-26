import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/homeLayout/homeLayout.component';
import { LayoutDashboardComponent } from './layouts/LayoutDashboard/LayoutDashboard.component';

export const routes: Routes = [
    {path:'', component: HomeLayoutComponent},
    {path:'dashboard', component: LayoutDashboardComponent},
];
