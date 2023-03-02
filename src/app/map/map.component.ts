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
  constructor(
    private router: Router,
    private popoverController: PopoverController // TODO: not actually needed?
  ) { }
  map?: google.maps.Map;
  marker?: google.maps.Marker;

  // difference between var and let?
  // function keyword

  // FIXME: content goes below device bottom border?
  ngOnInit(): void {
    let loader = new Loader('REDACTED_SENSITIVE_INFO');

    var mapCanvas = document.getElementById("map") as HTMLElement;
    var mapOptions = {
      center: { lat: 53.379590, lng: -1.478930 },
      zoom: 13,
      disableDefaultUI: true,
      styles: mapStyleOptions
    } as google.maps.MapOptions;

    loader.load().then(() => {
      this.map = new google.maps.Map(mapCanvas, mapOptions);
      
      google.maps.event.addListener(this.map, 'click', ((event) => {

        // this.placeMarker(event.latLng);
        console.log('lat: ' + event.latLng.lat());
        console.log('lng: ' + event.latLng.lng());

        // const locationOne = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        this.router.navigate(['/create-spot'], { state: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
        // this.router.navigate(['/create-spot'], { state: { location: JSON.stringify(locationOne.toJSON()) } });
        // await this.openPopover();
      }))
    });
  }

  async placeMarker(location: google.maps.LatLng): Promise<void> {
    console.log("marker placed!");
    this.marker?.setMap(null);
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true
    })
  }

  async openPopover(): Promise<void> {
    const popover = await this.popoverController.create({
      component: CreateSpotComponent,
      showBackdrop: true

    });
    await popover.present();
    console.log("popover opened!");
  }
}