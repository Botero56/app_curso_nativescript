import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { MapReadyEvent, MarkerTapEvent } from '@nativescript/google-maps';
import { GoogleMapsModule } from '@nativescript/google-maps/angular';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Mapa',
  templateUrl: './mapa.component.html',
  imports: [NativeScriptCommonModule, GoogleMapsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MapaComponent {
  // Medellín, Colombia
  lat = 6.2442;
  lng = -75.5812;

  // (8) Marker en el mapa
  alListo(event: MapReadyEvent) {
    event.map.addMarker({
      position: { lat: this.lat, lng: this.lng },
      title: 'Tienda de productos',
      snippet: 'Aquí recoges tus pedidos',
      color: 'red',
    });
  }

  alTocarMarker(event: MarkerTapEvent) {
    new Toasty({ text: `📍 ${event.marker.title}` }).show();
  }
}
