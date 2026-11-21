import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// (3) Plugin pull-to-refresh
registerElement('PullToRefresh', () => PullToRefresh);

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
      ],
    });
  },
});
