import { AfterViewInit, Injectable } from '@angular/core';
import L, { LatLng } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { Coordinates } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {

  private map!: L.Map;
  private mapElement?: HTMLElement;
  private markerSubject = new Subject<Coordinates>();

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

    this.map.on('click', (event) => {
      L.marker([event.latlng.lat, event.latlng.lng]).addTo(this.map);
      const lat = event.latlng.lat;
      const long = event.latlng.lng;
      this.markerSubject.next({latitude: lat, longitude: long});
    })
  }

  public getMarkerObservable(): Observable<Coordinates> {
    return this.markerSubject.asObservable();
  }

  public moveMap(coords: Coordinates): void {
    console.log("panning to \nLat: " + coords.latitude + "\nLong: " + coords.longitude);
    this.map.panTo(new L.LatLng(coords.latitude, coords.longitude));
  }

  public setMarker(coords: Coordinates): void {
    L.marker([coords.latitude, coords.longitude]).addTo(this.map);
  }
}