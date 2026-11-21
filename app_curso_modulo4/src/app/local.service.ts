import { Injectable, signal } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import type { ProductoApi } from './productos.service';

// Datos persistentes en el dispositivo con AppSettings (sobreviven al cerrar la app).
@Injectable({ providedIn: 'root' })
export class LocalService {
  readonly usuario = signal(ApplicationSettings.getString('usuario', 'Invitado'));
  readonly favoritos = signal<ProductoApi[]>(JSON.parse(ApplicationSettings.getString('favoritos', '[]')));

  guardarUsuario(nombre: string) {
    ApplicationSettings.setString('usuario', nombre);
    this.usuario.set(nombre);
  }

  esFavorito(id: number) {
    return this.favoritos().some(f => f.id === id);
  }

  toggleFavorito(p: ProductoApi) {
    this.favoritos.update(lista => (this.esFavorito(p.id) ? lista.filter(f => f.id !== p.id) : [...lista, p]));
    ApplicationSettings.setString('favoritos', JSON.stringify(this.favoritos()));
  }
}
