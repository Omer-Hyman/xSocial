import { Injectable } from '@angular/core';
import { LoggedInUser } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setLoggedInUser(userData?: LoggedInUser): void {
    if (userData) {
      const user = JSON.stringify(userData);
      if (localStorage.getItem('userData') !== user) {
        localStorage.setItem('userData', user);
      }
    } else {
      localStorage.setItem('userData', ''); 
      // this or just remove property
    }
    console.log('user data in local storage: ' + localStorage.getItem('userData'));
  }

  public getCurrentUser(): LoggedInUser | undefined {
    const data = localStorage.getItem('userData');
    if (data) {
      const dataJSON = JSON.parse(data);
      return dataJSON;
    } else {
      return undefined;
    }
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
