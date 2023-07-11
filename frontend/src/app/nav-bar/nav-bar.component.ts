import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, AfterViewInit {

  @Input() title = '';
  public username = '';

  constructor(
    private storage: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.username = this.storage.getCurrentUsername();
  }

  public ngAfterViewInit(): void {
  }
}
