import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import mapStyleOptions from '../../mapStyleOptions.json'
import { MapService } from '../map.service';
import { Router } from '@angular/router';
import { Spot } from '../interfaces';

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
    private mapService: MapService,
    private router: Router
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      spotDescription: [''],
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
  // TODO: add validation to the form

  async ngOnInit(): Promise<void> {
    
    await this.mapService.initialiseMap(this.mapOptions);
    this.mapService.setMarker(this.spotCoords);
  }

  public submitForm(): void {
    const newSpot: Spot = {
      name: this.editSpotForm.get('spotName')?.value,
      description: this.editSpotForm.get('spotDescription')?.value,
      latitude: this.spotCoords.lat(),
      longitude: this.spotCoords.lng(),
      suitableFor: this.editSpotForm.get('sportDropdown')?.value[0]
    };
    this.router.navigate(['/map'], { state: { spot: newSpot }});
    console.log('Spot created...');
    this.postToDB(newSpot);
  }

  public async postToDB(spot: Spot): Promise<void> {
    const username = 'admin';
    const password = 'REDACTED_SENSITIVE_INFO';
    console.log("trying with: ");
    console.log(spot);
    console.log(JSON.stringify(spot));
    try {
      const results = await fetch('http://localhost:8000/spots/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(username + ':' + password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spot)
      });
      console.log(results);
    } catch (error) {
      console.log('Create spot POST failed: ' + error);
    }

  }
}
