import { Injectable } from '@angular/core';
import L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { Coordinates, Spot } from '../interfaces';
import { ApiService } from './api.service';

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

  public checkDiv(): void {
    console.log("Checking div");
    console.log(document.getElementById("map"));
  }

  public initialiseMap(coords?: Coordinates, zoom?: number): void {
    this.mapElement = document.getElementById("map") ?? undefined;
    
    if (!this.mapElement)
    {
      console.warn('Not found map div!');
      return;
    }

    this.map = L.map(this.mapElement).setView(
      [coords?.latitude ?? 51.505, coords?.longitude?? -0.09],
      zoom ?? 15
    );

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // this.map.on('click', (event) => {
    //   L.DomEvent.stopPropagation(event);
    //   const lat = event.latlng.lat;
    //   const long = event.latlng.lng;
    //   this.setMarker({latitude: lat, longitude: long});
    //   this.mapCLicked.next({latitude: lat, longitude: long});
    // });
  }

  public async setMarkersFromDB(): Promise<void> { // TODO: maybe do this as an observable/subscription?
    this.map.clearAllEventListeners();
  
    const spots = await this.apiService.getSpots();
    if (spots) {
      this.markers = [];
      for (const spot of spots) {
        const marker = this.setMarker({latitude: spot.latitude, longitude: spot.longitude });
        // marker.on('click', (event) => {
        //   console.log("Marker clicked!");
        //   L.DomEvent.stopPropagation(event);
        //   this.markerClicked.next(spot);
        // });
      }
    }
  }

  public getMapClickedObservable(): Observable<Coordinates> {
    return this.mapCLicked.asObservable();
  }
  public getMarkerClickedObservable(): Observable<Spot> {
    return this.markerClicked.asObservable();
  }

  public moveMap(coords: Coordinates): void {
    console.log("panning to \nLat: " + coords.latitude + "\nLong: " + coords.longitude);
    this.map.panTo(new L.LatLng(coords.latitude, coords.longitude));
  }

  public setMarker(coords: Coordinates): L.Marker {
    const marker = L.marker([coords.latitude, coords.longitude]).addTo(this.map).on('click', function(e) {
      
      L.DomEvent.stopPropagation(e);
      console.log('markerClicked');
    });
    this.markers.push(marker);
    return marker;
  }

  private clearAllMarkers(): void {
    for (const marker of this.markers)
      marker.remove();
  }
}