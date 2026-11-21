import { Component, NO_ERRORS_SCHEMA, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'Detalle',
  templateUrl: './detalle.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DetalleComponent {
  private servicio = inject(ProductosService);
  private router = inject(RouterExtensions);
  private id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  producto = computed(() => this.servicio.productos().find(p => p.id === this.id));

  volver() {
    this.router.back();
  }
}
