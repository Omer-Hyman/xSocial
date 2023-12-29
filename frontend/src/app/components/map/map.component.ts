import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SpotViewComponent } from '../spot-view/spot-view.component';
import { Subscription } from 'rxjs';
import { Spot } from 'src/app/interfaces';
import { MapService } from 'src/app/services/map.service';
import L from 'leaflet';
import { Position, Geolocation } from '@capacitor/geolocation';
import { LeafletMapService } from 'src/app/services/leafletMap.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: {
    class: 'component'
  }
})

// Can probs be changed to a page, just the actual map that needs to be a component

export class MapComponent implements OnInit, OnDestroy {

  private deviceLat?: number;
  private deviceLong?: number;
  private spots!: Spot[];
  private mapClickedSubscription: Subscription;
  private markerClickedSubscription: Subscription;

  constructor(
    private router: Router,
    // private mapService: MapService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private leafletMapService: LeafletMapService,
    private apiService: ApiService
  ) {
    // this.subscription = this.mapService.getMarkerObservable().subscribe((spot) => {
    //   this.markerClicked(spot);
    // });
    this.mapClickedSubscription = this.leafletMapService.getMapClickedObservable().subscribe((Coordinates) => {
      this.router.navigate(['/create-spot', this.activatedRoute.snapshot.paramMap.get('id')], { state: 
        { lat: Coordinates.latitude, lng: Coordinates.longitude } 
      });
    });

    this.markerClickedSubscription = this.leafletMapService.getMarkerClickedObservable().subscribe((Spot) => {
      this.markerClicked(Spot);
    })
  }


  // FIXME: content goes below device bottom border?

  public async ngOnInit(): Promise<void> {
    // TODO: get rid of the '?? 0's after 
    this.leafletMapService.initialiseMap({latitude: this.deviceLat ?? 0, longitude: this.deviceLong ?? 0});
    // ID can also be gotten from localstorage
    
    await this.placeMarkersFromDatabase();
    await this.centerMapOnDeviceLocation();
  }

  private async placeMarkersFromDatabase(): Promise<void> {
    this.spots = await this.apiService.getSpots();
    for (var spot of this.spots)
      this.leafletMapService.setMarker({latitude: spot.latitude, longitude: spot.longitude});
  }

  private async centerMapOnDeviceLocation(): Promise<void> {
    if (await this.getLocationPermission)
    {
      const deviceLocation = await this.getDeviceLocation();
      this.deviceLat = deviceLocation!.coords.latitude;
      this.deviceLong = deviceLocation!.coords.longitude;
      this.leafletMapService.moveMap({latitude: this.deviceLat, longitude: this.deviceLong});
    }
  }

  public ngOnDestroy(): void {
    this.mapClickedSubscription.unsubscribe();
  }

  private async getDeviceLocation(): Promise<Position | undefined> {
    try {
      return await Geolocation.getCurrentPosition();
    } catch (error) {
      console.error('Error getting location', error);
      return undefined;
    }
  }

  private async getLocationPermission(): Promise<boolean> {
    try {
      const result = await Geolocation.requestPermissions();
      if (result.location === 'granted') {
        return true;
      } else {
        console.warn('Location permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission', error);
      return false;
    }
  }

  public clearMarkers(): void {
    console.log('markers cleared!');
    // this.mapService.clearMarkers();
  }

  private async markerClicked(spot: Spot): Promise<void> {
    // console.log('marker clicked');
    // console.log(spot);
    const modal = await this.modalController.create({
      component: SpotViewComponent,
      breakpoints: [0, 0.3, 0.5, 0.8], // where it snaps to if you drag it down
      initialBreakpoint: 0.8,
      componentProps: { spot: spot }
    });
    modal.present();
    // this.mapService.setMarkersFromDB(); // very hacky fix
  }
}