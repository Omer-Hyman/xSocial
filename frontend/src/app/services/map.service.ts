import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
// import { } from 'googlemaps';
import { Spot } from '../interfaces';
import mapStyleOptions from 'src/mapStyleOptions.json'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // private loader = new Loader({apiKey: 'REDACTED_SENSITIVE_INFO'});
  // private map?: google.maps.Map;
  // private markers: google.maps.Marker[] = [];
  // private defaultMapOptions: google.maps.MapOptions = {
  //   center: { lat: 53.379590, lng: -1.478930 },
  //   zoom: 13,
  //   disableDefaultUI: true,
  //   styles: mapStyleOptions as google.maps.MapTypeStyle[]
  // }
  // private markerSubject = new Subject<Spot>();

  // constructor(
  //   private apiService: ApiService
  // ) { }

  // public getMap(): google.maps.Map | undefined {
  //   return this.map;
  // }

  // public async initialiseMap(mapOptions?: google.maps.MapOptions): Promise<void> {
  //   await this.loader.load();
  //   if (this.map) {
  //     this.moveMap(mapOptions);
  //   } else {
  //     console.log('NEW MAP CREATED!!!!.')
  //     this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions ?? this.defaultMapOptions);
  //   }
  // }

  // public moveMap(newMapOptions?: google.maps.MapOptions): void {
  //   const newMapElement = document.getElementById("map") as HTMLElement;
  //   if (this.map) {
  //     google.maps.event.clearListeners(this.map, 'click');
  //     newMapElement.appendChild(this.map.getDiv());
  //   }
  //   this.map?.setOptions(newMapOptions ?? this.defaultMapOptions);

  // }

  // public clearMarkers(): void {
  //   for (let i = 0; i < this.markers.length; i++) {
  //     this.markers[i].setMap(null);
  //   }
  // }

  // public setMarker(markerCoords: google.maps.LatLng): void {
  //   this.markers.push(new google.maps.Marker({
  //     position: JSON.parse(JSON.stringify(markerCoords)),
  //     map: this.map
  //   }));
  //   console.log('Marker set!' + markerCoords);
  // }

  // public async setMarkersFromDB(): Promise<void> { // TODO: maybe do this as an observable/subscription?
  //   const spots = await this.apiService.getSpots();
  //   if (spots) {
  //     this.markers = [];
  //     for (const spot of spots) {
  //       const marker = new google.maps.Marker({
  //         position: { lat: spot.latitude, lng: spot.longitude },
  //         map: this.map
  //       });
  //       this.markers.push(marker);
  //       marker.addListener("click", () => {
  //         this.markerSubject.next(spot);
  //       })
  //     }
  //   }
  // }

  // public getMarkerObservable() {
  //   return this.markerSubject.asObservable();
  // }
}
