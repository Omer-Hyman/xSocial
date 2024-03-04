import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SpotViewComponent } from '../spot-view/spot-view.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { Coordinates, Spot } from 'src/app/interfaces';
import { Geolocation } from '@capacitor/geolocation';
import { ApiService } from 'src/app/services/ApiService/api.service';
import L from 'leaflet';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: {
    class: 'component'
  }
})

export class MapComponent implements OnInit, AfterViewInit {

  private map!: L.Map;
  private mapElement?: HTMLElement;
  private markers: L.Marker[] = [];
  private deviceLocation?: Coordinates;
  private spots!: Spot[];
  @Input() public mapCentre?: Coordinates;

  constructor(
    private router: Router,
    // private mapService: MapService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    
    // Probs don't need a map service now bc it's all in this component
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getDeviceLocation();

    // ID can also be gotten from localstorage
  }

  ngAfterViewInit() : void {
    setTimeout(() => {
      this.initialiseMap();
      this.setMarker({latitude: this.deviceLocation?.latitude ?? 0, longitude: this.deviceLocation?.longitude ?? 0});
      this.setMarkersFromDB();
    }, 1000);
    // look up zone.js and change detection (https://angular.io/guide/change-detection-zone-pollution)
  }

  private initialiseMap(zoom?: number): void {
    console.log("Initialising map...");
    this.mapElement = document.getElementById("map") ?? undefined;
    if (!this.mapElement) {
      console.warn('Not found map div!');
      return;
    }

    this.map = L.map(this.mapElement);
    this.map.setView([
      (this.mapCentre?.latitude ?? this.deviceLocation?.latitude) || 51.505,
      (this.mapCentre?.longitude ?? this.deviceLocation?.longitude) || -0.09
    ], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.setupMapClickedEventListener();
  }

  private async setMarkersFromDB(): Promise<void> {
    const spots = await this.apiService.getSpots();
    console.log(spots);
    if (spots) {
      this.markers = [];
      for (const spot of spots) {
        this.setMarker({latitude: spot.latitude, longitude: spot.longitude }, spot.id);
      }
    }
  }

  private setupMapClickedEventListener(): void {
    this.map.on('click', (event) => {

      L.DomEvent.stopPropagation(event);
      // Is it ok for this navigate to be here or should it be from home page? From home page just adds complexity
      this.router.navigate(['/create-spot', this.activatedRoute.snapshot.paramMap.get('id')]);
      this.setMarker({latitude: event.latlng.lat, longitude: event.latlng.lng} as Coordinates);
    });
  }

  private moveMap(coords: Coordinates): void {
    console.log("panning to \nLat: " + coords.latitude + "\nLong: " + coords.longitude);
    this.map.panTo(new L.LatLng(coords.latitude, coords.longitude));
  }

  private setMarker(coords: Coordinates, spotID?: number): L.Marker {
    const marker = L.marker([coords.latitude, coords.longitude]).addTo(this.map).on('click', async (e) => {
      console.log('markerClicked');
      L.DomEvent.stopPropagation(e);
      const spot = await this.apiService.getSpot(spotID ?? 0);
    });
    this.markers.push(marker);
    return marker;
  }
  
  private setMarkerUsingSpot(spot: Spot) : L.Marker {
    console.log("Setting marker on spot:\n" + spot.name);
    const marker = L.marker([spot.latitude, spot.longitude]).addTo(this.map).on('click', (e) => {
      console.log('markerClicked');
      L.DomEvent.stopPropagation(e);
    });
    this.markers.push(marker);
    return marker;
  }

  private clearAllMarkers(): void {
    for (const marker of this.markers)
      marker.remove();
  }

  private testingMarkerClicked(): void{
    var greenIcon = L.icon({
      iconUrl: "assets/icon/favicon.ico",
      iconSize:     [38, 95], 
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    });

    this.map.clearAllEventListeners();

    L.marker([51.512, -0.161], {icon: greenIcon}).addTo(this.map).on('click', function(e) {
      console.log('markerClicked');
      L.DomEvent.stopPropagation(e);
      console.log(e.latlng);
      e.originalEvent.preventDefault(); 
      // this.markerClicked.next(spot);

    });
  }

  private async getDeviceLocation(): Promise<void> {
    if (!await this.getLocationPermission)
      return;

    try {
      const deviceLocation = await Geolocation.getCurrentPosition();
      this.deviceLocation = {latitude: deviceLocation.coords.latitude, longitude: deviceLocation.coords.longitude}
      console.log("Device location:");
      console.log("lat: " + this.deviceLocation?.latitude);
      console.log("long: " + this.deviceLocation?.longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  private async getLocationPermission(): Promise<boolean> {
    try {
      const result = await Geolocation.requestPermissions();
      if (result.location === 'granted') {
        console.log("location permission granted");
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

  private clearMarkers(): void {
    console.log('markers cleared!');
    // this.mapService.clearMarkers();
  }

  private async markerClickedFunction(spot: Spot): Promise<void> {
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