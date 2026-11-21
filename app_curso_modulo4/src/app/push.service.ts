import { Injectable, signal } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { Toasty } from '@triniwiz/nativescript-toasty';

// (1) Integración con Firebase Cloud Messaging: obtiene el token del dispositivo
//     (cópialo en la consola de Firebase → Messaging → "Enviar mensaje de prueba").
// (2) Toast con cada notificación entrante.
@Injectable({ providedIn: 'root' })
export class PushService {
  readonly token = signal('(obteniendo token…)');
  readonly ultimas = signal<string[]>([]);

  async iniciar() {
    try {
      await firebase().initializeApp();
      const messaging = firebase().messaging();
      await messaging.requestPermission();
      await messaging.registerDeviceForRemoteMessages();

      const token = await messaging.getToken();
      this.token.set(token);
      console.log('[Firebase] token FCM:', token);
      messaging.onToken(t => {
        this.token.set(t);
        console.log('[Firebase] token FCM actualizado:', t);
      });

      messaging.onMessage(mensaje => {
        const titulo = mensaje.notification?.title ?? 'Notificación';
        const cuerpo = mensaje.notification?.body ?? JSON.stringify(mensaje.data ?? {});
        const texto = `${titulo}: ${cuerpo}`;
        this.ultimas.update(l => [texto, ...l].slice(0, 5));
        new Toasty({ text: `🔔 ${texto}` }).show();
      });
    } catch (e) {
      this.token.set('Error al iniciar Firebase: ' + e);
      console.error('[Firebase]', e);
    }
  }
}
