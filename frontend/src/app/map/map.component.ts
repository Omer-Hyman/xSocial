import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map.service';
import { ModalController } from '@ionic/angular';
import { SpotViewComponent } from '../spot-view/spot-view.component';
import { Spot } from '../interfaces';
import { Subscription } from 'rxjs';

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
    await this.mapService.initialiseMap();
    this.mapService.clearMarkers();
    this.mapService.setMarkersFromDB();
    const map = this.mapService.getMap();
    if (map) {
      google.maps.event.addListener(map, 'click', ((event) => {
        this.router.navigate(['/create-spot', this.activatedRoute.snapshot.paramMap.get('id')], { state: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
      }));
    } else {
      console.log('no map exists for event listener!');
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public clearMarkers(): void {
    console.log('markers cleared!');
    this.mapService.clearMarkers();
  }

  private async markerClicked(spot: Spot): Promise<void> {
    console.log('marker clicked');
    console.log(spot);
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