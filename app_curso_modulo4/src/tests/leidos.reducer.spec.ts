import { leerAhora, leidosReducer } from '../app/store';
import type { ProductoApi } from '../app/productos.service';

// (9) Suite de Jasmine que prueba el reducer de Redux (NgRx) "leidos"
describe('leidosReducer', () => {
  const libro: ProductoApi = { id: 1, nombre: 'Novela', categoria: 'Libros', precio: 30, descripcion: 'Una novela' };
  const balon: ProductoApi = { id: 2, nombre: 'Balón', categoria: 'Deportes', precio: 50, descripcion: 'Balón de fútbol' };

  it('devuelve el estado inicial (lista vacía) con una acción desconocida', () => {
    const estado = leidosReducer(undefined, { type: '[Test] desconocida' });
    expect(estado).toEqual([]);
  });

  it('agrega el producto al inicio con "Leer ahora"', () => {
    const estado = leidosReducer([balon], leerAhora({ producto: libro }));
    expect(estado.map(p => p.id)).toEqual([1, 2]);
  });

  it('no duplica un producto ya leído: lo mueve al inicio', () => {
    const estado = leidosReducer([balon, libro], leerAhora({ producto: libro }));
    expect(estado.length).toBe(2);
    expect(estado[0]).toEqual(libro);
  });

  it('no muta el estado anterior (inmutabilidad)', () => {
    const anterior: ProductoApi[] = [balon];
    const nuevo = leidosReducer(anterior, leerAhora({ producto: libro }));
    expect(anterior).toEqual([balon]);
    expect(nuevo).not.toBe(anterior);
  });
});
