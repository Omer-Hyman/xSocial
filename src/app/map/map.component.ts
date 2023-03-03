import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Loader } from 'google-maps';
import mapStyleOptions from '../../mapStyleOptions.json'
import { CreateSpotComponent } from '../create-spot/create-spot.component';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  map?: google.maps.Map;
  marker?: google.maps.Marker;

  constructor(
    private router: Router,
  ) { }

  // FIXME: content goes below device bottom border?
  
  ngOnInit(): void {
    let loader = new Loader('REDACTED_SENSITIVE_INFO');
    var mapCanvas = document.getElementById("map") as HTMLElement;
    var mapOptions = {
      center: { lat: 53.379590, lng: -1.478930 }, //TODO: maybe change to current device location? idk
      zoom: 13,
      disableDefaultUI: true,
      styles: mapStyleOptions
    } as google.maps.MapOptions;

    loader.load().then(() => {
      this.map = new google.maps.Map(mapCanvas, mapOptions);
      google.maps.event.addListener(this.map, 'click', ((event) => {
        this.router.navigate(['/create-spot'], { state: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
      }))
    });
  }
}