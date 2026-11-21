import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ImageSource } from '@nativescript/core';
import { isAvailable, requestPermissions, takePicture } from '@nativescript/camera';
import { shareImage } from '@nativescript/social-share';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Camara',
  templateUrl: './camara.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CamaraComponent {
  foto = signal<ImageSource | null>(null);

  // (5) Tomar fotografía con la cámara del dispositivo
  async tomarFoto() {
    try {
      if (!isAvailable()) {
        new Toasty({ text: 'Este dispositivo no tiene cámara' }).show();
        return;
      }
      await requestPermissions();
      const asset = await takePicture({ width: 800, height: 800, keepAspectRatio: true, saveToGallery: false });
      this.foto.set(await ImageSource.fromAsset(asset));
    } catch (e) {
      new Toasty({ text: 'No se tomó la foto: ' + e }).show();
    }
  }

  // (6) Compartir la imagen de la cámara con social-share
  compartirFoto() {
    const img = this.foto();
    if (img) shareImage(img, 'Foto desde la app');
  }
}
