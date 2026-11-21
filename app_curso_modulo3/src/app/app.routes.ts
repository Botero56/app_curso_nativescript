import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
  { path: 'listado', loadComponent: () => import('./listado/listado.component').then(m => m.ListadoComponent) },
  { path: 'busqueda', loadComponent: () => import('./busqueda/busqueda.component').then(m => m.BusquedaComponent) },
  { path: 'favoritos', loadComponent: () => import('./favoritos/favoritos.component').then(m => m.FavoritosComponent) },
  { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
  { path: 'settings/editar', loadComponent: () => import('./editar-usuario/editar-usuario.component').then(m => m.EditarUsuarioComponent) },
  { path: 'detalle/:id', loadComponent: () => import('./detalle/detalle.component').then(m => m.DetalleComponent) },
];
