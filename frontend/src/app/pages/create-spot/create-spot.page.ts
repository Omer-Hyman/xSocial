import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MapComponent } from 'src/app/components/map/map.component';
import { Coordinates, Spot } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { LocalStorageService } from 'src/app/services/LocalStorageService/local-storage.service';
import { StateManagementService } from 'src/app/services/StateManagementService/state-management.service';

@Component({
  selector: 'app-create-spot',
  templateUrl: './create-spot.page.html',
  styleUrls: ['./create-spot.page.scss'],
})
export class CreateSpotPage implements AfterViewInit, OnInit {  
  public editSpotForm!: FormGroup;
  private spotImage?: File;
  // public userID: string;
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  public location!: Coordinates;
  public alertHeader: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private storage: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private stateManagementService: StateManagementService
  ) {
    this.editSpotForm = this.formBuilder.group({
      spotName: [''],
      spotDescription: [''],
      sportDropdown: [''],
      image: []
    })
    // this.userID = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.location = {
      latitude: parseFloat(this.activatedRoute.snapshot.paramMap.get('lat') ?? "0"), 
      longitude: parseFloat(this.activatedRoute.snapshot.paramMap.get('long') ?? "0")
    };
    this.alertHeader = {
      header: 'Suitable for:',
    };

  }

  // TODO: add validation to the form

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      suitableFor: suitableForList,
      image: ''
    };

    if (this.spotImage) {      
      const encodedImage = await this.convertToBase64(this.spotImage);
      if (encodedImage)
        newSpot.image = encodedImage.toString();
    } else {
      console.log('No image!');
    }
    if (await this.apiService.postSpot(newSpot))
      this.router.navigate(['/home']);
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
