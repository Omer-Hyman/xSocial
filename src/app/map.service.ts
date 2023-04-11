import { Injectable } from '@angular/core';
import { Loader } from 'google-maps';
import mapStyleOptions from '../mapStyleOptions.json'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private loader = new Loader('REDACTED_SENSITIVE_INFO');
  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private defaultMapOptions: google.maps.MapOptions = {
    center: { lat: 53.379590, lng: -1.478930 }, //TODO: maybe change to current device location? idk
    zoom: 13,
    disableDefaultUI: true,
    styles: mapStyleOptions as google.maps.MapTypeStyle[]
  }

  constructor() { }

  public getMap(): google.maps.Map {
    return this.map;
  }

  public async initialiseMap(mapOptions?: google.maps.MapOptions): Promise<void> {
    await this.loader.load();
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions ?? this.defaultMapOptions);
  }

  public clearMarkers(): void {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  public setMarker(markerCoords: google.maps.LatLng): void {
    this.markers.push(new google.maps.Marker({
      position: JSON.parse(JSON.stringify(markerCoords)),
      map: this.map
    }));
    console.log('Marker set!' + markerCoords);
  }
}
