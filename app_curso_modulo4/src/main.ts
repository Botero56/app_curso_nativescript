import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app.routes';
import { leidosReducer } from './app/store';
import { AppComponent } from './app/app.component';
import { PushService } from './app/push.service';

// (3) Plugin pull-to-refresh
registerElement('PullToRefresh', () => PullToRefresh);

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
        provideStore({ leidos: leidosReducer }), // Redux
        // Módulo 4: Firebase Cloud Messaging (token + Toast de notificaciones entrantes)
        provideAppInitializer(() => {
          inject(PushService).iniciar();
        }),
      ],
    });
  },
});
