import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    // private storage: LocalStorageService
  ) {}

  // public ngOnInit(): void {
  //   this.storage.clearStorage();
  // }

  // public ngOnDestroy(): void {
  //   this.storage.clearStorage();
  // }
}

  // TODO: function keyword - still don't know

