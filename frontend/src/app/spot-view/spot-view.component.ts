import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../interfaces';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-spot-view',
  templateUrl: './spot-view.component.html',
  styleUrls: ['./spot-view.component.scss'],
  host: {
    class: 'component'
  }
})
export class SpotViewComponent implements OnInit {
  @Input() spot!: Spot;
  public spotUsername?: string;

  constructor(
    private storage: LocalStorageService
    ) { }

  public ngOnInit(): void {
    this.spotUsername = this.storage.getCurrentUser()?.username;
  }
}