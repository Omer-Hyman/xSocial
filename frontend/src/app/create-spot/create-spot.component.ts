import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import mapStyleOptions from '../../mapStyleOptions.json'
import { MapService } from '../map.service';
import { Router } from '@angular/router';
import { Spot } from '../interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-spot',
  templateUrl: './create-spot.component.html',
  styleUrls: ['./create-spot.component.scss'],
  host: {
    class: 'component'
  }
})
export class CreateSpotComponent implements OnInit {

  public editSpotForm!: FormGroup;
  private spotCoords!: google.maps.LatLng;
  private mapOptions!: google.maps.MapOptions;
  private spotImage?: File;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      spotDescription: [''],
      sportDropdown: [''],
      image: []
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
    this.mapService.clearMarkers();
    this.mapService.setMarker(this.spotCoords);
  }

  public submitForm(): void {
      if (this.spotImage) {
        const reader = new FileReader();
        reader.readAsDataURL(this.spotImage);
        reader.onload = () => {
          const encodedImage = reader.result;
          if (encodedImage) {
            const newSpot: Spot = {
              name: this.editSpotForm.get('spotName')?.value,
              description: this.editSpotForm.get('spotDescription')?.value,
              latitude: this.spotCoords.lat(),
              longitude: this.spotCoords.lng(),
              suitableFor: this.editSpotForm.get('sportDropdown')?.value,
              image: encodedImage.toString()
            };
            this.apiService.postSpot(newSpot);
            this.router.navigate(['/map'], { state: { spot: newSpot }});
          }
        }
      }
    // }


    // TODO: stay on same page or redirect based on api request response
  }

  public onImageChange(event: any): void {
    this.spotImage = event.target.files[0];
    console.log('image changed');
    console.log(this.spotImage);
  }
}
