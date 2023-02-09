import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  constructor(
    private map?: google.maps.Map // move out of constr
  ) { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'REDACTED_SENSITIVE_INFO'
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 53.379590, lng: -1.478930 },
          zoom: 13,
          zoomControl: false
        } as google.maps.MapOptions
      );
    })
  }

}
