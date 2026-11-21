# App Curso – NativeScript + Angular

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
