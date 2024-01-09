import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

// TODO: Can probs be changed to a page, just the actual map that needs to be a component

export class MapComponent implements OnInit {

  private map!: L.Map;
  private mapElement?: HTMLElement;
  private mapCLicked = new Subject<Coordinates>();
  private markerClicked = new Subject<Spot>();
  private markers: L.Marker[] = [];
  private deviceLat?: number;
  private deviceLong?: number;
  private spots!: Spot[];
  // private mapClickedSubscription: Subscription;
  // private markerClickedSubscription: Subscription;

  constructor(
    private router: Router,
    // private mapService: MapService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    // this.subscription = this.mapService.getMarkerObservable().subscribe((spot) => {
    //   this.markerClicked(spot);
    // });

    // MAP CLICKED:
    // this.mapClickedSubscription = this.leafletMapService.getMapClickedObservable().subscribe((Coordinates) => {
    //   this.router.navigate(['/create-spot', this.activatedRoute.snapshot.paramMap.get('id')], { state: 
    //     { lat: Coordinates.latitude, lng: Coordinates.longitude } 
    //   });
    // });

    // MARKER CLICKED:
    // this.markerClickedSubscription = this.leafletMapService.getMarkerClickedObservable().subscribe((Spot) => {
    //   this.markerClickedFunction(Spot);
    // })
  }

  async ngOnInit(): Promise<void> {
    // TODO: get rid of the '?? 0's after
    await this.getAndSetDeviceLocation();

    // ID can also be gotten from localstorage

    // await this.leafletMapService.setMarkersFromDB();
    // await this.placeMarkersFromDatabase();
    // this.leafletMapService.testingMarkerClicked();
  }

  ionViewDidEnter()
  {
    this.initialiseMap({latitude: this.deviceLat ?? 0, longitude: this.deviceLong ?? 0});
    this.setMarker({latitude: this.deviceLat ?? 0, longitude: this.deviceLong ?? 0});
  }

  private initialiseMap(coords?: Coordinates, zoom?: number): void {
    this.mapElement = document.getElementById("map") ?? undefined;
    if (!this.mapElement)
    {
      console.warn('Not found map div!');
      return;
    }

    console.log("lat and long:");
    console.log(coords?.latitude);
    console.log(coords?.longitude);
    this.map = L.map(this.mapElement).setView([coords?.latitude ?? 51.505, coords?.longitude?? -0.09], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    //   minZoom: 0,
    //   maxZoom: 20,
    //   attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map);

    // this.map.on('click', (event) => {
    //   L.DomEvent.stopPropagation(event);
    //   const lat = event.latlng.lat;
    //   const long = event.latlng.lng;
    //   this.setMarker({latitude: lat, longitude: long});
    //   this.mapCLicked.next({latitude: lat, longitude: long});
    // });
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

  private getMapClickedObservable(): Observable<Coordinates> {
    return this.mapCLicked.asObservable();
  }
  private getMarkerClickedObservable(): Observable<Spot> {
    return this.markerClicked.asObservable();
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
      this.markerClicked.next(spot);
    });
    this.markers.push(marker);
    return marker;
  }
  
  private setMarkerUsingSpot(spot: Spot) : L.Marker {
    console.log("Setting marker on spot:\n" + spot.name);
    const marker = L.marker([spot.latitude, spot.longitude]).addTo(this.map).on('click', (e) => {
      console.log('markerClicked');
      L.DomEvent.stopPropagation(e);
      this.markerClicked.next(spot);
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

  

  // private async placeMarkersFromDatabase(): Promise<void> {
  //   this.spots = await this.apiService.getSpots();
  //   for (var spot of this.spots)
  //     this.leafletMapService.setMarkerUsingSpot(spot);
  // }

  // private async setDeviceCoords(): Promise<void> {
  //   if (await this.getLocationPermission)
  //   {
  //     const deviceLocation = await this.getDeviceLocation();
  //     this.deviceLat = deviceLocation!.coords.latitude;
  //     this.deviceLong = deviceLocation!.coords.longitude;
  //     // this.moveMap({latitude: this.deviceLat, longitude: this.deviceLong});
  //   }
  // }

  // public ngOnDestroy(): void {
  //   this.mapClickedSubscription.unsubscribe();
  // }

  private async getAndSetDeviceLocation(): Promise<void> {
    if (await this.getLocationPermission)
    {
      try {
        const deviceLocation = await Geolocation.getCurrentPosition();
        this.deviceLat = deviceLocation.coords.latitude;
        this.deviceLong = deviceLocation.coords.longitude;
      } catch (error) {
        console.error('Error getting location', error);
      }
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