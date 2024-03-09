import { Injectable } from '@angular/core';
import { LoggedInUser } from '../../interfaces';
import { StateManagementService } from '../StateManagementService/state-management.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private stateManagementService: StateManagementService
  ) { }

  public setLoggedInUser(userData: LoggedInUser): void {
    this.stateManagementService.setUserID(userData.id);
    const user = JSON.stringify(userData);
    if (localStorage.getItem('userData') !== user) {
      localStorage.setItem('userData', user);
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
