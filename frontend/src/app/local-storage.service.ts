import { Injectable } from '@angular/core';
import { LoggedInUser } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setLoggedInUser(userData: LoggedInUser): void {
    const user = JSON.stringify(userData);
    if (localStorage.getItem('userData') !== user) {
      localStorage.setItem('userData', user);
    }
    console.log('user data in local storage: ' + localStorage.getItem('userData'));
  }

  public getCurrentUsername(): string {
    const data = localStorage.getItem('userData');
    if (data !== null) {
      const dataJSON = JSON.parse(data);
      return dataJSON.username ?? '';
    } else {
      return '';
    }
  }
}
