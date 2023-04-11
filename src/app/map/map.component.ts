import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MapService } from '../map.service';
import { Spot } from '../interfaces';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(
    private router: Router,
    private mapService: MapService,
    private route: ActivatedRoute
  ) { }

  // FIXME: content goes below device bottom border?

  async ngOnInit(): Promise<void> {
    await this.mapService.initialiseMap();
    // this.mapService.clearMarkers();
    this.mapService.setMarkersFromDB();
    google.maps.event.addListener(this.mapService.getMap(), 'click', ((event) => {
      this.router.navigate(['/create-spot'], { state: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
    }))
    
  }
}