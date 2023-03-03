import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Loader } from 'google-maps';
import { Subscription } from 'rxjs';
import mapStyleOptions from '../../mapStyleOptions.json'

@Component({
  selector: 'app-create-spot',
  templateUrl: './create-spot.component.html',
  styleUrls: ['./create-spot.component.scss'],
})
export class CreateSpotComponent implements OnInit {

  loader = new Loader('REDACTED_SENSITIVE_INFO');
  mapCanvas!: HTMLElement;
  editSpotForm!: FormGroup;
  map!: google.maps.Map;
  spotCoords!: google.maps.LatLng;
  mapOptions!: google.maps.MapOptions;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      sportDropdown: ['']
    })
    // this.spotCoords = new google.maps.LatLng(history.state.lat, history.state.lng);
    // console.log(this.spotCoords);
    // console.log(this.spotCoords.lat());
    // console.log(this.spotCoords.lng());

    // FIXME: lat and lang are recieved properly iinto this component but mapOptions doesn't like it....
    console.log(history.state.lat);
    console.log(history.state.lng);
    this.mapOptions = {
      center:  new google.maps.LatLng(history.state.lat, history.state.lng),
      zoom: 13,
      disableDefaultUI: true,
      styles: mapStyleOptions
    } as google.maps.MapOptions;
  }

  // TODO: Change styling of this map? - Need to get rid of the small information bar at the bottom of the map

  ngOnInit(): void {
    this.loader.load().then(() => {
      this.mapCanvas = document.getElementById("map") as HTMLElement;
      this.map = new google.maps.Map(this.mapCanvas, this.mapOptions);
      this.placeMarker();
    });
  }

  private placeMarker(): void {
    // this.marker?.setMap(null);
    new google.maps.Marker({
      position:  new google.maps.LatLng(history.state.lat, history.state.lng),
      map: this.map
    })
  }

  public submitForm(): void {

  }
}
