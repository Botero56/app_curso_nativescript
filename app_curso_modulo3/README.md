# App Curso (Módulo 3) – NativeScript + Angular + Express + Redux

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
