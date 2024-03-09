import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { StateManagementService } from 'src/app/services/StateManagementService/state-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(
    private stateManagementService: StateManagementService
  ) { }

  async ngOnInit() {
    await this.stateManagementService.getDeviceLocation();
    if (this.stateManagementService.deviceLocation)
      this.stateManagementService.setMainMarkerCoordinates(this.stateManagementService.deviceLocation);
  }

}
