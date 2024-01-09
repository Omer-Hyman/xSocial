import { Injectable } from '@angular/core';
import L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { Coordinates, Spot } from '../interfaces';
import { ApiService } from './ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {

  private map!: L.Map;
  private mapElement?: HTMLElement;
  private mapCLicked = new Subject<Coordinates>();
  private markerClicked = new Subject<Spot>();
  private markers: L.Marker[] = []; 

  constructor(
    private apiService: ApiService
  ) {}

//   public initialiseMap(coords?: Coordinates, zoom?: number): void {
//     this.mapElement = document.getElementById("map") ?? undefined;
//     if (!this.mapElement)
//     {
//       console.warn('Not found map div!');
//       return;
//     }

//     this.map = L.map(this.mapElement).setView(
//       [coords?.latitude ?? 51.505, coords?.longitude?? -0.09],
//       15
//     );
//     // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
//     //   minZoom: 0,
//     //   maxZoom: 20,
//     //   attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     // }).addTo(this.map);

//     this.map.clearAllEventListeners();
//     this.clearAllMarkers();

//     // this.map.on('click', (event) => {
//     //   L.DomEvent.stopPropagation(event);
//     //   const lat = event.latlng.lat;
//     //   const long = event.latlng.lng;
//     //   this.setMarker({latitude: lat, longitude: long});
//     //   this.mapCLicked.next({latitude: lat, longitude: long});
//     // });
//   }

//   public async setMarkersFromDB(): Promise<void> {
//     const spots = await this.apiService.getSpots();
//     console.log(spots);
//     if (spots) {
//       this.markers = [];
//       for (const spot of spots) {
//         this.setMarker({latitude: spot.latitude, longitude: spot.longitude }, spot.id);
//       }
//     }
// }

//   public getMapClickedObservable(): Observable<Coordinates> {
//     return this.mapCLicked.asObservable();
//   }
//   public getMarkerClickedObservable(): Observable<Spot> {
//     return this.markerClicked.asObservable();
//   }

//   public moveMap(coords: Coordinates): void {
//     console.log("panning to \nLat: " + coords.latitude + "\nLong: " + coords.longitude);
//     this.map.panTo(new L.LatLng(coords.latitude, coords.longitude));
//   }

//   public setMarker(coords: Coordinates, spotID?: number): L.Marker {
//     const marker = L.marker([coords.latitude, coords.longitude]).addTo(this.map).on('click', async (e) => {
//       console.log('markerClicked');
//       L.DomEvent.stopPropagation(e);
//       const spot = await this.apiService.getSpot(spotID ?? 0);
//       this.markerClicked.next(spot);
//     });
//     this.markers.push(marker);
//     return marker;
//   }
  
//   public setMarkerUsingSpot(spot: Spot) : L.Marker {
//     console.log("Setting marker on spot:\n" + spot.name);
//     const marker = L.marker([spot.latitude, spot.longitude]).addTo(this.map).on('click', (e) => {
//       console.log('markerClicked');
//       L.DomEvent.stopPropagation(e);
//       this.markerClicked.next(spot);
//     });
//     this.markers.push(marker);
//     return marker;
//   }

//   private clearAllMarkers(): void {
//     for (const marker of this.markers)
//       marker.remove();
//   }

//   public testingMarkerClicked(): void{
//     var greenIcon = L.icon({
//       iconUrl: "assets/icon/favicon.ico",
//       iconSize:     [38, 95], 
//       shadowSize:   [50, 64],
//       iconAnchor:   [22, 94],
//       shadowAnchor: [4, 62],
//       popupAnchor:  [-3, -76]
//     });

//     this.map.clearAllEventListeners();

//     L.marker([51.512, -0.161], {icon: greenIcon}).addTo(this.map).on('click', function(e) {
//       console.log('markerClicked');
//       L.DomEvent.stopPropagation(e);
//       console.log(e.latlng);
//       e.originalEvent.preventDefault(); 
//       // this.markerClicked.next(spot);

//     });
//   }
}