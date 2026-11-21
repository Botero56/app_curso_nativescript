import { createAction, createFeatureSelector, createReducer, on, props } from '@ngrx/store';
import type { ProductoApi } from './productos.service';

// Redux (NgRx): acción "Leer ahora" → reducer guarda la lista → selector la expone.
export const leerAhora = createAction('[Favoritos] Leer ahora', props<{ producto: ProductoApi }>());

export const leidosReducer = createReducer<ProductoApi[]>(
  [],
  on(leerAhora, (estado, { producto }) => [producto, ...estado.filter(p => p.id !== producto.id)]),
);

export const selectLeidos = createFeatureSelector<ProductoApi[]>('leidos');
