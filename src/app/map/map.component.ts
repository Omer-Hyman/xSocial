import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import assert from 'assert';
import { Loader } from 'google-maps';
import mapStyleOptions from '../../mapStyleOptions.json'
import { MapService } from '../map.service';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  constructor(
    private router: Router,
    private mapService: MapService
  ) { }

  // FIXME: content goes below device bottom border?

  async ngOnInit(): Promise<void> {
    await this.mapService.initialiseMap();
    google.maps.event.addListener(this.mapService.getMap(), 'click', ((event) => {
      this.router.navigate(['/create-spot'], { state: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
    }))
  }
}