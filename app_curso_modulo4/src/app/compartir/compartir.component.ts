import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ImageSource } from '@nativescript/core';
import { shareImage, shareText } from '@nativescript/social-share';

@Component({
  selector: 'Compartir',
  templateUrl: './compartir.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CompartirComponent {
  texto = '¡Mira esta app de productos hecha con NativeScript + Angular!';

  // (3) Compartir texto
  compartirTexto() {
    shareText(this.texto, 'App de productos');
  }

  // (4) Compartir imagen (logo de la app, de App_Resources)
  compartirImagen() {
    const imagen = ImageSource.fromResourceSync('logo');
    shareImage(imagen, 'Logo de la app');
  }
}
