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

  editSpotForm: FormGroup;
  map?: google.maps.Map;
  // locationSelected!: google.maps.LatLng;
  importedLat: number;
  importedLang: number;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      sportDropdown: ['']
    })
    this.importedLat = history.state.lat;
    this.importedLang = history.state.lng;
    // this.locationSelected = history.state.location;
    console.log(typeof this.importedLat);
    console.log(typeof this.importedLang);
    // console.log(typeof history.state.location)
  }

  ngOnInit() {
    // console.log(history.state.location);
    // console.log(this.locationSelected.lat);
    // console.log(this.locationSelected.lng);

    let loader = new Loader('REDACTED_SENSITIVE_INFO');
    var mapCanvas = document.getElementById("map") as HTMLElement;
    var mapOptions = {
      // center: this.locationSelected as google.maps.LatLng,
      center: { lat: this.importedLat, lng: this.importedLang },
      zoom: 13,
      disableDefaultUI: true,
      styles: mapStyleOptions
    } as google.maps.MapOptions;

    loader.load().then(() => {
      this.map = new google.maps.Map(mapCanvas, mapOptions);
    });
  }

  submitForm(): void {

  }

}
