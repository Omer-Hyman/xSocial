import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SpotViewComponent } from '../spot-view/spot-view.component';
import { Coordinates, Spot } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/ApiService/api.service';
import L from 'leaflet';
import { StateManagementService } from 'src/app/services/StateManagementService/state-management.service';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: {
    class: 'component'
  }
})

export class MapComponent implements AfterViewInit {

  private map!: L.Map;
  private mapElement?: HTMLElement;
  private markers: L.Marker[] = [];
  private deviceLocation?: Coordinates;
  private spots!: Spot[];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private stateManagementService: StateManagementService    
  ) {}


  ngAfterViewInit() : void {
    setTimeout(() => {
      this.initialiseMap();
      // this.setMarkersFromDB();
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
    this.map.addLayer(
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ));
    this.map.setView([
      this.deviceLocation?.latitude ?? 51.505,
      this.deviceLocation?.longitude ?? -0.09
    ], 15);

    this.setupMapClickedEventListener();

    var marker = this.stateManagementService.getMainMarkerCoordinates();
    if (marker) {
      this.setMarker(marker);
      this.map.panTo(new L.LatLng(marker.latitude, marker.longitude));
      this.stateManagementService.deleteMainMarker();
    }
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
      this.router.navigate(['/create-spot']);
      this.stateManagementService.setMainMarkerCoordinates({latitude: event.latlng.lat, longitude: event.latlng.lng});
    });
  }

  public setMarker(coords: Coordinates, spotID?: number): L.Marker {
    const marker = L.marker([coords.latitude, coords.longitude]).addTo(this.map);
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

  public clearAllMarkersFrontend(): void {
    for (const marker of this.markers)
      marker.remove();
  }

  public clearAllMarkersFully(): void {
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
    // this.stateManagementService.setMarkersFromDB(); // very hacky fix
  }
}