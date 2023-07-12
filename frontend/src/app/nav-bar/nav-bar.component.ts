import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  @Input() title = '';
  public username = '';

  constructor(
    private storage: LocalStorageService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.username = this.storage.getCurrentUser()?.username ?? '';
  }

  public logout(): void {
    this.router.navigate(['/login']);
  }
}
