import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
// import { } from 'googlemaps';

// let map: google.maps.Map;
// function initMap(): void {
//   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }
// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'REDACTED_SENSITIVE_INFO'
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 53.379590, lng: -1.478930 },
        zoom: 13,
      });
    })
  }

  private map?: google.maps.Map;

  // googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly";

  // addMapsScript() {
  //   if (!document.querySelectorAll(`[src="${this.googleMapsUrl}"]`).length) {
  //     document.body.appendChild(Object.assign(
  //       document.createElement('script'), {
  //       type: 'text/javascript',
  //       src: this.googleMapsUrl,
  //       onload: () => this.doMapInitLogic()
  //     }));
  //   } else {
  //     this.doMapInitLogic();
  //   }
  // }

}

// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }
