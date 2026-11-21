import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './config';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  favorito: boolean;
}

// Producto tal como lo devuelve el API Express
export type ProductoApi = Omit<Producto, 'favorito'>;

export const CATEGORIAS = ['Electrónica', 'Hogar', 'Deportes', 'Libros', 'Ropa'];

const NOMBRES = ['Audífonos', 'Lámpara', 'Balón', 'Novela', 'Chaqueta', 'Teclado', 'Silla', 'Raqueta', 'Cuaderno', 'Gorra'];

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);
  private nextId = 1;
  readonly productos = signal<Producto[]>(Array.from({ length: 8 }, () => this.aleatorio()));

  aleatorio(): Producto {
    const id = this.nextId++;
    const nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
    return {
      id,
      nombre: `${nombre} #${id}`,
      categoria: CATEGORIAS[Math.floor(Math.random() * CATEGORIAS.length)],
      precio: Math.round(10 + Math.random() * 490),
      descripcion: `Descripción del producto ${nombre.toLowerCase()} número ${id}.`,
      favorito: false,
    };
  }

  // Pull to refresh: agrega elementos nuevos aleatorios al inicio
  agregarAleatorios(cantidad = 2) {
    const nuevos = Array.from({ length: cantidad }, () => this.aleatorio());
    this.productos.update(lista => [...nuevos, ...lista]);
  }

  buscar(id: number) {
    return this.productos().find(p => p.id === id);
  }

  actualizar(id: number, cambios: Partial<Producto>) {
    this.productos.update(lista => lista.map(p => (p.id === id ? { ...p, ...cambios } : p)));
  }

  // Búsqueda remota: GET {API_URL}/productos?q=... (el componente solo se suscribe)
  buscarRemoto(q: string) {
    return this.http.get<ProductoApi[]>(`${API_URL}/productos`, {
      params: { q },
      headers: { 'ngrok-skip-browser-warning': 'true' },
    });
  }
}
