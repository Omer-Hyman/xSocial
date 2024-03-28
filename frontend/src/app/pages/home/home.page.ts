import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/components/map/map.component';
import { Coordinates } from 'src/app/interfaces';
import { StateManagementService } from 'src/app/services/StateManagementService/state-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(
    private stateManagementService: StateManagementService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.stateManagementService.setDeviceLocation();
    // if (this.stateManagementService.deviceLocation)
    //   this.stateManagementService.setTemporaryMarkerCoordinates(this.stateManagementService.deviceLocation);
  }

  public navigateToCreateSpot(coords: Coordinates): void {
    this.router.navigate(['/create-spot', coords.latitude, coords.longitude]);
  }
}