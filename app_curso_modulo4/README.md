# App Curso (Módulo 4) – NativeScript + Angular: capacidades nativas y pruebas

App de productos: listado, búsqueda y detalle.

## Ejecutar

```bash
npm install
ns run android
```

## Requisitos → dónde están

| # | Requisito | Archivo |
|---|-----------|---------|
| 1 | ListView con plantilla anidada usando FlexboxLayout (página de búsqueda) | `src/app/busqueda/busqueda.component.html` |
| 2 | Listado → detalle con `RouterExtensions.navigate` | `src/app/listado/listado.component.ts` (`verDetalle`), `src/app/app.routes.ts` |
| 3 | Pull to refresh (`@nativescript-community/ui-pulltorefresh`) que agrega productos aleatorios | `listado.component.html` / `.ts` (`refrescar`), registro en `src/main.ts` |
| 4 | Diálogo `action` para elegir categoría y modificar `producto.categoria` | `listado.component.ts` (`elegirCategoria`) |
| 5 | Toast (`@triniwiz/nativescript-toasty`) | `listado.component.ts` (`toast`) |
| 6 | Two-way binding `[(ngModel)]` en el formulario de búsqueda | `busqueda.component.html` |
| 7 | Validador personalizado (directiva `minLargo`, longitud mínima) | `src/app/min-largo.directive.ts` |
| 8 | Gestos: `doubleTap` (favorito) y `longPress` (info) en el ícono ♡ | `listado.component.html` |
| 9 | Animación (rotate + scale + backgroundColor) en el ícono ⟳ | `listado.component.ts` (`girarYAgregar`) |
| 10 | Splash screen personalizado para Android | `App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml`, `drawable/splash_logo.xml`, `values/colors.xml`, `values-v31/styles.xml` |

## Módulo 3: Express, almacenamiento local y Redux

```bash
cd ../api && npm install && npm start     # API en http://localhost:3000/productos?q=libro
ngrok http 3000                           # copia la URL https en src/app/config.ts
```

| # | Requisito | Archivo |
|---|-----------|---------|
| 1 | App Express con GET y filtro por querystring (`?q=`) | `../api/app.js` |
| 2 | Formulario de búsqueda (caja de texto + botón) y listado filtrado | `src/app/busqueda/busqueda.component.html` / `.ts` |
| 3 | Variable de configuración con la URL de Ngrok | `src/app/config.ts` (`API_URL`) |
| 4 | Service de Angular que hace la solicitud HTTP | `src/app/productos.service.ts` (`buscarRemoto`) |
| 5 | Sección Settings que lee el usuario con AppSettings | `src/app/settings/`, `src/app/local.service.ts` |
| 6 | Pantalla para editar y persistir el nombre de usuario | `src/app/editar-usuario/` |
| 7 | Ícono ♡/♥ para guardar favorito en la búsqueda | `busqueda.component.html` (`toggleFavorito`) |
| 8 | Favoritos listados (persistidos en AppSettings) | `src/app/favoritos/` |
| 9 | Botón “Leer ahora” que despacha una action de Redux (NgRx) | `favoritos.component.ts`, `src/app/store.ts` |
| 10 | Pantalla principal con “Leyendo ahora”, reactivo vía `store.selectSignal` | `listado.component.ts` / `.html`, `provideStore` en `src/main.ts` |

## Módulo 4: capacidades nativas, pruebas unitarias y reporte JUnit

### Configurar tus propias claves de Google

1. **Firebase**: en la [consola de Firebase](https://console.firebase.google.com) crea un proyecto y registra una app Android con el
   paquete `org.nativescript.appcursomodulo4`. Descarga `google-services.json` y guárdalo en
   `App_Resources/Android/src/google-services.json` (la estructura de referencia está en `google-services.json.example`).
2. **Google Maps**: en Google Cloud Console habilita *Maps SDK for Android* (y *for iOS*), crea una API key y pégala en
   `App_Resources/Android/src/main/res/values/google_maps_api.xml` (`google_maps_api_key`) y en `App_Resources/iOS/Info.plist` (`TNSGoogleMapsAPIKey`).

```bash
npm install --legacy-peer-deps
ns run android
```

### Enviar una notificación desde la consola de Firebase

1. Abre la app → menú ⋮ → **Settings**: aparece el **token FCM** (también se imprime en la consola como `[Firebase] token FCM: ...`). Usa “Copiar token”.
2. Consola de Firebase → **Messaging** → *Nueva campaña* → *Notificaciones* → **Enviar mensaje de prueba** → pega el token.
3. Con la app abierta llega un **Toast** `🔔 Título: cuerpo` y queda listado en Settings → “Últimas notificaciones”.

| # | Requisito | Archivo |
|---|-----------|---------|
| 1 | Token de Firebase (FCM) con tus propias claves | `src/app/push.service.ts` (`getToken`), se muestra en `src/app/settings/settings.component.html`; `App_Resources/Android/src/google-services.json` |
| 2 | Toast con las notificaciones entrantes | `src/app/push.service.ts` (`onMessage` → `Toasty`); se inicia en `src/main.ts` (`provideAppInitializer`) |
| 3 | social-share: compartir **texto** | `src/app/compartir/` (`shareText`) y botón “Compartir producto” en `src/app/detalle/` |
| 4 | social-share: compartir **imagen** | `src/app/compartir/compartir.component.ts` (`shareImage` del logo) |
| 5 | Plugin `@nativescript/camera` para tomar fotos | `src/app/camara/camara.component.ts` (`takePicture`) |
| 6 | La foto de la cámara se comparte con social-share | `camara.component.ts` (`compartirFoto` → `shareImage`) |
| 7 | Google Maps con cuenta propia | `src/app/mapa/` (`@nativescript/google-maps`), key en `AndroidManifest.xml` → `res/values/google_maps_api.xml` |
| 8 | Marker en el mapa | `mapa.component.ts` (`addMarker` en el evento `ready`) |
| 9 | Suite de Jasmine que prueba el reducer de Redux | `src/tests/leidos.reducer.spec.ts` (prueba `leidosReducer` de `src/app/store.ts`) |
| 10 | Karma JUnit Reporter → archivo de salida | `karma.conf.js` / `karma.headless.conf.js` (`reporters: ['progress', 'junit']`), salida en `reports/junit/TESTS-*.xml` |

Las pantallas nuevas (Compartir, Cámara, Mapa) se abren desde el menú ⋮ del listado.

### Ejecutar las pruebas

```bash
npm run test:unit      # Jasmine + Karma en Chrome Headless (sin emulador)
npm run test:android   # = ns test android, en el emulador/dispositivo
```

Ambos generan el reporte JUnit en `reports/junit/`. Ejemplo de salida (incluido en el repo):
`reports/junit/TESTS-Chrome_Headless_153.0.0.0_(Linux_0.0.0).xml` → `tests="4" errors="0" failures="0"`.
Si Chrome no está en el PATH: `CHROME_BIN=/ruta/a/chrome npm run test:unit`.
