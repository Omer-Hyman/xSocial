import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit, Output, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SpotViewComponent } from '../spot-view/spot-view.component';
import { Coordinates, Spot } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/ApiService/api.service';
import Leaflet from 'leaflet';
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

  private map!: Leaflet.Map;
  private mapElement?: HTMLElement;
  private markers: Leaflet.Marker[] = [];
  private spots!: Spot[];
  
  @Input() public zoomLevel = 14;
  @Input() public zoomable = true;
  @Input() public mapCenter?: Coordinates;
  @Input() public temporaryMarker?: Coordinates;
  @Input() public displayDbMarkers = true;
  @Output() public mapClicked = new EventEmitter<Coordinates>(); 

  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private stateManagementService: StateManagementService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() : void {
    setTimeout(() => {
      this.initialiseMap();
    }, 1000);

  }

  private async initialiseMap(): Promise<void> {
    this.mapElement = document.getElementById("map") ?? undefined;

    if (!this.mapElement) {
      console.warn('Not found map div!');
      return;
    }

    this.map = Leaflet.map(this.mapElement, {
      zoomControl: false,
      minZoom: this.zoomable ? undefined : this.zoomLevel,
      maxZoom: this.zoomable ? undefined : this.zoomLevel,
      center: [
        this.mapCenter?.latitude ?? this.stateManagementService.deviceLocation?.latitude ?? 0,
        this.mapCenter?.longitude ?? this.stateManagementService.deviceLocation?.longitude ?? 0
      ],
      zoom: this.zoomLevel 
    });

    console.log(this.map.getCenter());

    const layer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.map.addLayer(layer);

    if (this.displayDbMarkers)
      await this.setMarkersFromDB();

    // const marker = this.stateManagementService.getMainMarkerCoordinates();
    if (this.temporaryMarker) {
      this.setMarker(this.temporaryMarker);
      this.map.panTo(new Leaflet.LatLng(this.temporaryMarker.latitude, this.temporaryMarker.longitude));
    }

    this.setupMapClickedEventListener();

    this.map.flyToBounds(this.generateBoundsArray()); // may need .pad(0.1)
  }

  private generateBoundsArray(): Leaflet.LatLngBounds {
    const locations: Leaflet.LatLng[] = [];

    // const lat = this.mapCenter?.latitude ?? this.stateManagementService.deviceLocation?.latitude;
    // const long = this.mapCenter?.longitude ?? this.stateManagementService.deviceLocation?.longitude;

    // for (let marker of this.markers)
    // {
    //   if (marker.getLatLng().lat > lat + 1 ||  )
    //   locations.push(marker.getLatLng());
    // }

    // TODO: Can see where this is going ^^
    // just +/- 1 from center of map include those

    console.log(Leaflet.latLngBounds(locations));

    return Leaflet.latLngBounds(locations);
  }

  public async setMarkersFromDB(): Promise<void> {
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
      Leaflet.DomEvent.stopPropagation(event);

      // Is it ok for this navigate to be here or should it be from home page? From home page just adds complexity
      this.mapClicked.next({latitude: event.latlng.lat, longitude: event.latlng.lng});
      this.stateManagementService.setTemporaryMarkerCoordinates({latitude: event.latlng.lat, longitude: event.latlng.lng});
    });
  }

  public setMarker(coords: Coordinates, spotID?: number): Leaflet.Marker {
    const marker = Leaflet.marker([coords.latitude, coords.longitude]).addTo(this.map);
    this.markers.push(marker);
    return marker;
  }

  public panToLocation(coords: Coordinates): void {
    this.map.panTo(new Leaflet.LatLng(coords.latitude, coords.longitude));
  }
  
  private setMarkerUsingSpot(spot: Spot) : Leaflet.Marker {
    console.log("Setting marker on spot:\n" + spot.name);
    const marker = Leaflet.marker([spot.latitude, spot.longitude]).addTo(this.map).on('click', (e) => {
      console.log('markerClicked');
      Leaflet.DomEvent.stopPropagation(e);
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
    var greenIcon = Leaflet.icon({
      iconUrl: "assets/icon/favicon.ico",
      iconSize:     [38, 95], 
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    });

    this.map.clearAllEventListeners();

    Leaflet.marker([51.512, -0.161], {icon: greenIcon}).addTo(this.map).on('click', function(e) {
      console.log('markerClicked');
      Leaflet.DomEvent.stopPropagation(e);
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