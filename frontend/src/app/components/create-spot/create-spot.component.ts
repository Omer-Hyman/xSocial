import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Spot } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MapService } from 'src/app/services/map.service';
import mapStyleOptions from 'src/mapStyleOptions.json';

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
  public userID: string;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private router: Router,
    private apiService: ApiService,
    private storage: LocalStorageService,
    private activatedRoute: ActivatedRoute
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
    this.userID = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  // TODO: Change styling of this map? - Need to get rid of the small information bar at the bottom of the map
  // TODO: add validation to the form

  async ngOnInit(): Promise<void> {
    // await this.mapService.initialiseMap(this.mapOptions);
    // this.mapService.clearMarkers();
    // this.mapService.setMarker(this.spotCoords);


  }

  public async submitForm(): Promise<void> {
    const newSpot: Spot = {
      createdBy: this.storage.getCurrentUser()?.id,
      name: this.editSpotForm.get('spotName')?.value,
      description: this.editSpotForm.get('spotDescription')?.value,
      latitude: this.spotCoords.lat(),
      longitude: this.spotCoords.lng(),
      suitableFor: this.editSpotForm.get('sportDropdown')?.value,
      image: ''
    };
    if (this.spotImage) {      
      const encodedImage = await this.convertToBase64(this.spotImage);
      if (encodedImage) {
        newSpot.image = encodedImage.toString();
      }          
    } else {
      console.log('No image!');
    }
    console.log(newSpot.image);
    await this.apiService.postSpot(newSpot);
    this.router.navigate(['/map', this.activatedRoute.snapshot.paramMap.get('id')]);
    // TODO: stay on same page or redirect based on api request response
  }

  private convertToBase64(image: File): Promise<any> {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    return new Promise((resolve, reject) => {
      reader.onload = function(event) {
        resolve(event.target?.result);
      };
    });
  }

  public onImageChange(event: any): void {
    console.log(event);
    this.spotImage = event.target.files[0];
    console.log(this.spotImage);

    if (this.spotImage) {
      this.convertToBase64(this.spotImage);
      console.log('image changed');
      console.log(this.spotImage);
    }    
  }
}
