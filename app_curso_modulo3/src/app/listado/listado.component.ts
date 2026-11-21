import { Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild, inject } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Color, Dialogs, Label } from '@nativescript/core';
import { Toasty } from '@triniwiz/nativescript-toasty';
import { Store } from '@ngrx/store';
import { selectLeidos } from '../store';
import { LocalService } from '../local.service';
import { CATEGORIAS, Producto, ProductosService } from '../productos.service';

@Component({
  selector: 'Listado',
  templateUrl: './listado.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ListadoComponent {
  private servicio = inject(ProductosService);
  private router = inject(RouterExtensions);
  productos = this.servicio.productos;
  usuario = inject(LocalService).usuario;
  // Se actualiza reactivamente al despachar "Leer ahora" (select del Store de Redux)
  leidos = inject(Store).selectSignal(selectLeidos);

  @ViewChild('icono', { static: true }) icono!: ElementRef<Label>;

  // (2) Navegación con RouterExtensions.navigate
  verDetalle(p: Producto) {
    this.router.navigate(['/detalle', p.id], { transition: { name: 'slide' } });
  }

  ir(ruta: string) {
    this.router.navigate([ruta], { transition: { name: 'slideTop' } });
  }

  // (3) Pull to refresh: agrega productos aleatorios
  refrescar(args: any) {
    const ptr = args.object;
    setTimeout(() => {
      this.servicio.agregarAleatorios(2);
      ptr.refreshing = false;
      this.toast('Se agregaron 2 productos nuevos');
    }, 1000);
  }

  // (4) Diálogo "action" que modifica el atributo categoria
  async elegirCategoria(p: Producto) {
    const opcion = await Dialogs.action({
      title: `Categoría de ${p.nombre}`,
      message: `Actual: ${p.categoria}`,
      cancelButtonText: 'Cancelar',
      actions: CATEGORIAS,
    });
    if (CATEGORIAS.includes(opcion)) {
      this.servicio.actualizar(p.id, { categoria: opcion });
      this.toast(`${p.nombre} ahora es de ${opcion}`);
    }
  }

  // (8) Gestos
  toggleFavorito(p: Producto) {
    this.servicio.actualizar(p.id, { favorito: !p.favorito });
    this.toast(p.favorito ? 'Quitado de favoritos' : 'Agregado a favoritos ♥');
  }

  mostrarInfo(p: Producto) {
    this.toast(`${p.nombre}: $${p.precio}`);
  }

  // (9) Animación: rotación + cambio de color
  async girarYAgregar() {
    const v = this.icono.nativeElement;
    await v.animate({ rotate: 360, scale: { x: 1.4, y: 1.4 }, backgroundColor: new Color('#fde68a'), duration: 600 });
    await v.animate({ scale: { x: 1, y: 1 }, backgroundColor: new Color('#f3f4f6'), duration: 300 });
    v.rotate = 0;
    this.servicio.agregarAleatorios(1);
    this.toast('Producto agregado');
  }

  // (5) Toast
  private toast(text: string) {
    new Toasty({ text }).show();
  }
}
