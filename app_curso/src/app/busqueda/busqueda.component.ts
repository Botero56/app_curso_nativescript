import { Component, NO_ERRORS_SCHEMA, computed, inject, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { ItemEventData } from '@nativescript/core';
import { ProductosService } from '../productos.service';
import { MinLargoDirective } from '../min-largo.directive';

@Component({
  selector: 'Busqueda',
  templateUrl: './busqueda.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, MinLargoDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BusquedaComponent {
  private servicio = inject(ProductosService);
  private router = inject(RouterExtensions);

  readonly min = 3;
  termino = signal('');

  resultados = computed(() => {
    const t = this.termino().trim().toLowerCase();
    const todos = this.servicio.productos();
    if (!t) return todos;
    if (t.length < this.min) return [];
    return todos.filter(p => p.nombre.toLowerCase().includes(t) || p.categoria.toLowerCase().includes(t));
  });

  verDetalle(args: ItemEventData) {
    this.router.navigate(['/detalle', this.resultados()[args.index].id], { transition: { name: 'slide' } });
  }
}
