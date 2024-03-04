import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Coordinates, Spot } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { LocalStorageService } from 'src/app/services/LocalStorageService/local-storage.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-create-spot',
  templateUrl: './create-spot.page.html',
  styleUrls: ['./create-spot.page.scss'],
})
export class CreateSpotPage implements OnInit {  
  public editSpotForm!: FormGroup;
  private spotCoords!: Coordinates;
  // private mapOptions!: google.maps.MapOptions;
  private spotImage?: File;
  public userID: string;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private router: Router,
    private apiService: ApiService,
    private storage: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    // private leafletMapService: LeafletMapService
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      spotDescription: [''],
      sportDropdown: [''],
      image: []
    })
    // this.spotCoords = new google.maps.LatLng(history.state.lat, history.state.lng);
    // this.mapOptions = {
    //   center: JSON.parse(JSON.stringify(this.spotCoords)),
    //   zoom: 14,
    //   disableDefaultUI: true,
    //   styles: mapStyleOptions as google.maps.MapTypeStyle[]
    // };

    this.userID = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  // TODO: add validation to the form

  async ngOnInit(): Promise<void> {
    this.spotCoords = {latitude: history.state.lat, longitude: history.state.lng};
    // this.leafletMapService.initialiseMap({latitude: this.spotCoords.latitude, longitude: this.spotCoords.longitude}, 13);
    // this.leafletMapService.setMarker({latitude: this.spotCoords.latitude, longitude: this.spotCoords.longitude});
  }

  public test(): void{
    console.log(this.editSpotForm.get('sportDropdown')?.value);
  } 

  public async submitForm(): Promise<void> {

    var suitableForList: {Sport: string}[] = [];

    for (var sport of this.editSpotForm.get('sportDropdown')?.value)
    {
      suitableForList.push({Sport: sport});
    }
    console.log(this.editSpotForm.get('sportDropdown')?.value);
    console.log(suitableForList);
    
    const newSpot: Spot = {
      createdBy: this.storage.getCurrentUser()?.id === 69 ? 1 : this.storage.getCurrentUser()?.id,
      name: this.editSpotForm.get('spotName')?.value,
      description: this.editSpotForm.get('spotDescription')?.value,
      latitude: this.spotCoords.latitude,
      longitude: this.spotCoords.longitude,
      suitableFor: suitableForList,
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
    if (await this.apiService.postSpot(newSpot))
      this.router.navigate(['/home', this.activatedRoute.snapshot.paramMap.get('id')]);
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
