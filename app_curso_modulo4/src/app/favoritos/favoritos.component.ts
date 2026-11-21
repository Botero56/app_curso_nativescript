import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Store } from '@ngrx/store';
import { Toasty } from '@triniwiz/nativescript-toasty';
import { ProductoApi } from '../productos.service';
import { LocalService } from '../local.service';
import { leerAhora } from '../store';

@Component({
  selector: 'Favoritos',
  templateUrl: './favoritos.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FavoritosComponent {
  private store = inject(Store);
  favoritos = inject(LocalService).favoritos;

  // Despacha la acción al store de Redux
  leerAhora(producto: ProductoApi) {
    this.store.dispatch(leerAhora({ producto }));
    new Toasty({ text: `${producto.nombre} agregado a "Leyendo ahora"` }).show();
  }
}
