import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Utils } from '@nativescript/core';
import { LocalService } from '../local.service';
import { API_URL } from '../config';
import { PushService } from '../push.service';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsComponent {
  private router = inject(RouterExtensions);
  usuario = inject(LocalService).usuario; // leído de AppSettings
  apiUrl = API_URL;
  private push = inject(PushService);
  token = this.push.token; // (1) token FCM
  notificaciones = this.push.ultimas;

  copiarToken() {
    if (global.isAndroid) {
      const ctx = Utils.android.getApplicationContext();
      const cm = ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager;
      cm.setPrimaryClip(android.content.ClipData.newPlainText('token', this.token()));
    } else {
      UIPasteboard.generalPasteboard.string = this.token();
    }
    console.log('[Firebase] token FCM:', this.token());
    new Toasty({ text: 'Token copiado (también está en la consola)' }).show();
  }

  editar() {
    this.router.navigate(['/settings/editar'], { transition: { name: 'slide' } });
  }
}
