import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../interfaces';

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

  constructor(
    ) { }

  public ngOnInit(): void {
    console.log(this.spot);
  }

}
