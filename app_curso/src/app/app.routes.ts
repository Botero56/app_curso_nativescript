import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
  { path: 'listado', loadComponent: () => import('./listado/listado.component').then(m => m.ListadoComponent) },
  { path: 'busqueda', loadComponent: () => import('./busqueda/busqueda.component').then(m => m.BusquedaComponent) },
  { path: 'detalle/:id', loadComponent: () => import('./detalle/detalle.component').then(m => m.DetalleComponent) },
];
