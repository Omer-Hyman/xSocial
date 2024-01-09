import { Injectable } from '@angular/core';
import { LocalStorageService } from '../LocalStorageService/local-storage.service';
import { Spot, User } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly username = 'admin';
  private readonly password = 'REDACTED_SENSITIVE_INFO';
  // private readonly ngrokUrl = 'https://91a3-86-19-167-105.ngrok-free.app';
  private readonly ngrokUrl = 'http://localhost:8000';

  constructor(
    private storage: LocalStorageService
  ) { }

  public async getSpot(spotID: number): Promise<Spot> {
    try {
      console.log('Attempting to get spot ' + spotID + ' from database.');
      const results = await fetch(this.ngrokUrl + '/spot/' + spotID, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        }
      });
      const data = await results.json();
      return data.results;
    } catch (error) {
      console.log('Failed to get spot: ' + error);
      return {} as Spot;
    }
  }

  public async getSpots(): Promise<Spot[]> {
    try {
      console.log('Attempting to get spots from database.');
      const results = await fetch(this.ngrokUrl + '/spots/', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        }
      });
      const data = await results.json();
      return data.results;
    } catch (error) {
      console.log('Failed to get spots: ' + error);
      return [];
    }
  }

  // public async getImage(url: string): Promise<any> {
  //   try {
  //     console.log('Attempting to get image from database.');
  //     const results = await fetch('http://localhost:8000/media/27052bda-9532-41cb-9cd8-4fd78926653b.jpg', {
  //       method: 'GET',
  //       headers: new Headers({
  //         'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
  //         'Content-Type': 'image/jpeg',
  //         // 'ngrok-skip-browser-warning': 'true'
  //       })
  //     });
  //     return results;
  //   } catch (error) {
  //     console.log('Failed to get image: ' + error);
  //     return undefined;
  //   }
  // }

  public async postSpot(spot: Spot): Promise<boolean> {
    console.log(spot);
    try {
      console.log("Attempting to post: " + JSON.stringify(spot));
      const response = await fetch(this.ngrokUrl + '/spots/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spot)
      });
      
      return response.ok;
      
    } catch (error) {
      console.log('Create spot POST failed: ' + error);
      return false;
    }
  }

  public async createNewUser(user: User): Promise<string[]> {
    try {
      console.log("Attempting to post: " + JSON.stringify(user));
      const results = await fetch(this.ngrokUrl + '/api-user-registration/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      if (results.status !== 201) {
        const jsonResults = await results.json();
        const errors = [];
        if (jsonResults.username) {
          for (const error of jsonResults.username) {
            errors.push(error);
          }
        }
        if (jsonResults.password) {
          for (const error of jsonResults.password) {
            errors.push(error);
          }
        }
        return errors;
      } else {
        return ['ok']
      }
    } catch (error) {
      console.log('Create user POST failed: ' + error);
      return ['failed'];
    }
  }

  public async login(username: string, password: string): Promise<boolean> {
    try {
      const request = await fetch(this.ngrokUrl + '/api-user-login/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      const result = await request.json();
      if (request.status === 200) {
        this.storage.setLoggedInUser({
          id: result.id,
          token: result.token,
          username: result.username
        });
        return true;
      } else {
        console.log(result);
        return false;
      }
    } catch (error) {
      console.log('Login user failed: ' + error);
      return false;
    }
  }

  public async getUsers(): Promise<User[] | undefined> {
    try {
      console.log("Attempting to get users");
      const results = await fetch(this.ngrokUrl + '/users/', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        }
      });
      const data = await results.json();
      return data.results;
    } catch (error) {
      console.log('GET user failed: ' + error);
      return undefined;
    }
  }

  public async getUsername(userID: string): Promise<string> {
    try {
      const results = await fetch(this.ngrokUrl + `/users/${userID}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        }
      });
      const data = await results.json();
      return data.results;
    } catch (error) {
      console.log('GET user failed: ' + error);
      return '';
    }
  }
}

// TODO: log out users at some point - displaying username in top nav bar