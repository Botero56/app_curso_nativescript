import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { LocalService } from '../local.service';
import { API_URL } from '../config';

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

  editar() {
    this.router.navigate(['/settings/editar'], { transition: { name: 'slide' } });
  }
}
