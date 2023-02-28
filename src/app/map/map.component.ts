import { Component, OnInit } from '@angular/core';
import { Loader } from 'google-maps';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor() { }
  map?: google.maps.Map;
  marker?: google.maps.Marker;

  // difference between var and let?
  // function keyword
  ngOnInit(): void {
    let loader = new Loader('REDACTED_SENSITIVE_INFO');

    var mapCanvas = document.getElementById("map") as HTMLElement;
    var mapOptions = {
      center: { lat: 53.379590, lng: -1.478930 },
      zoom: 13,
      zoomControl: false,
      disableDefaultUI: true
    };

    loader.load().then(() => {
      this.map = new google.maps.Map(mapCanvas, mapOptions);
      google.maps.event.addListener(this.map, 'click', ((event) => {
        this.placeMarker(event.latLng)
      }))
    });
  }

  placeMarker(location: google.maps.LatLng): void {
    console.log("marker placed!");
    this.marker?.setMap(null);
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true
    })
  }
}