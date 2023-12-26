import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SpotViewComponent } from '../spot-view/spot-view.component';
import { Subscription } from 'rxjs';
import { Spot } from 'src/app/interfaces';
import { MapService } from 'src/app/services/map.service';
import L from 'leaflet';
import { Position, Geolocation } from '@capacitor/geolocation';
import { Platform } from '@capacitor/core';

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
  private deviceLong?: number

  constructor(
    private router: Router,
    private mapService: MapService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.mapService.getMarkerObservable().subscribe((spot) => {
      this.markerClicked(spot);
    });

  }

  private subscription: Subscription;

  // FIXME: content goes below device bottom border?

  public async ngOnInit(): Promise<void> {
    // await this.mapService.initialiseMap();
    // this.mapService.clearMarkers();
    // this.mapService.setMarkersFromDB();
    // const map = this.mapService.getMap();
    // if (map) {
    //   google.maps.event.addListener(map, 'click', ((event: any) => {
    //     this.router.navigate(['/create-spot', this.activatedRoute.snapshot.paramMap.get('id')], { state: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
    //   }));
    // } else {
    //   console.log('no map exists for event listener!');
    // }

    const platform = Platform.platform;


    if (await this.getLocationPermission)
    {
      const deviceLocation = await this.getDeviceLocation();
      this.deviceLat = deviceLocation?.coords.latitude;
      this.deviceLong = deviceLocation?.coords.longitude;
    }


  }
  
  ngAfterViewInit(): void{
    
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    }).addTo(map);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async getDeviceLocation(): Promise<Position | undefined> {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      return position;
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
    this.mapService.clearMarkers();
  }

  private async markerClicked(spot: Spot): Promise<void> {
    console.log('marker clicked');
    // console.log(spot);
    const modal = await this.modalController.create({
      component: SpotViewComponent,
      breakpoints: [0, 0.3, 0.5, 0.8], // where it snaps to if you drag it down
      initialBreakpoint: 0.8,
      componentProps: { spot: spot }
    });
    modal.present();
    this.mapService.setMarkersFromDB(); // very hacky fix
  }
}