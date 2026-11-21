import { Component, NO_ERRORS_SCHEMA, inject, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { LocalService } from '../local.service';

@Component({
  selector: 'EditarUsuario',
  templateUrl: './editar-usuario.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EditarUsuarioComponent {
  private local = inject(LocalService);
  private router = inject(RouterExtensions);
  nombre = signal(this.local.usuario());

  // Persiste en AppSettings y vuelve a Settings
  guardar() {
    this.local.guardarUsuario(this.nombre().trim());
    this.router.back();
  }
}
