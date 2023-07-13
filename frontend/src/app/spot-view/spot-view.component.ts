import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../interfaces';
import { ApiService } from '../api.service';

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
    private api: ApiService
    ) { }

  public async ngOnInit(): Promise<void> {
    const users = await this.api.getUsers();
    if (users) {
      this.spotUsername = users.find(user => user.id === this.spot.createdBy)?.username;
      // TODO: Change a spot to save the user's name not the id!!!
    }
  }
}