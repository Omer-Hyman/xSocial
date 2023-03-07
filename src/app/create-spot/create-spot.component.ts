import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Loader } from 'google-maps';
import { Subscription } from 'rxjs';
import mapStyleOptions from '../../mapStyleOptions.json'
import { MapService } from '../map.service';

@Component({
  selector: 'app-create-spot',
  templateUrl: './create-spot.component.html',
  styleUrls: ['./create-spot.component.scss'],
})
export class CreateSpotComponent implements OnInit {

  public editSpotForm!: FormGroup;
  private spotCoords!: google.maps.LatLng;
  private mapOptions!: google.maps.MapOptions;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      sportDropdown: ['']
    })
    this.spotCoords = new google.maps.LatLng(history.state.lat, history.state.lng);
    this.mapOptions = {
      center: JSON.parse(JSON.stringify(this.spotCoords)),
      zoom: 14,
      disableDefaultUI: true,
      styles: mapStyleOptions as google.maps.MapTypeStyle[]
    };
  }

  // TODO: Change styling of this map? - Need to get rid of the small information bar at the bottom of the map

  async ngOnInit(): Promise<void> {
    await this.mapService.initialiseMap(this.mapOptions);
    this.mapService.setMarker(this.spotCoords);
  }

  public submitForm(): void { }
}
