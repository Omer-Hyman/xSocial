import { AfterViewInit, Injectable } from '@angular/core';
import L, { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {

  private map!: L.Map;
  private mapElement?: HTMLElement;

  public checkDiv(): void {
    console.log("Checking div");
    console.log(document.getElementById("map"));
  }

  public initialiseMap(deviceLat?: number, deviceLong?: number): void {
    this.mapElement = document.getElementById("map") ?? undefined;
    
    if (!this.mapElement)
    {
      console.warn('Not found map div!');
      return;
    }

    this.map = L.map(this.mapElement).setView([51.505, -0.09], 15);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.on('click', (event) => {
      console.log()
      L.marker([event.latlng.lat, event.latlng.lng]).addTo(this.map);
    })
  }

  public moveMap(lat: number, long: number): void {
    console.log("panning to \nLat: " + lat + "\nLong: " + long);
    this.map.panTo(new L.LatLng(lat, long));
  }
}