import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/LocalStorageService/local-storage.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  @Input() title = '';
  @Input() displayLogout = true;
  @Output() titleClicked = new EventEmitter<void>();
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

  public emitTitleClickedEvent(): void {
    this.titleClicked.emit();
  }
}
