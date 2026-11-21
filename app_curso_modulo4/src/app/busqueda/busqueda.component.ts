import { Component, NO_ERRORS_SCHEMA, inject, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ProductoApi, ProductosService } from '../productos.service';
import { LocalService } from '../local.service';
import { MinLargoDirective } from '../min-largo.directive';

@Component({
  selector: 'Busqueda',
  templateUrl: './busqueda.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, MinLargoDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BusquedaComponent {
  private servicio = inject(ProductosService);
  local = inject(LocalService);

  readonly min = 3;
  termino = signal('');
  resultados = signal<ProductoApi[]>([]);
  estado = signal('Escribe algo y toca Buscar');

  // El componente no hace HTTP: delega en ProductosService.buscarRemoto
  buscar() {
    this.estado.set('Buscando...');
    this.servicio.buscarRemoto(this.termino().trim()).subscribe({
      next: lista => {
        this.resultados.set(lista);
        this.estado.set(`${lista.length} resultado(s) para: ${this.termino()}`);
      },
      error: e => this.estado.set(`Error al conectar con el API: ${e.message}`),
    });
  }

  toggleFavorito(p: ProductoApi) {
    this.local.toggleFavorito(p);
    this.resultados.update(l => [...l]); // nuevo array → el ListView repinta el ícono
  }
}
