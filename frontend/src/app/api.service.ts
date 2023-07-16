import { Injectable } from '@angular/core';
import { Spot, User } from './interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly username = 'admin';
  private readonly password = 'REDACTED_SENSITIVE_INFO';
  private readonly ngrokUrl = 'http://localhost:8000';
  // private readonly ngrokUrl = 'https://8eeb-92-13-230-104.ngrok-free.app';

  constructor(
    private storage: LocalStorageService
  ) { }

  public async getSpots(): Promise<Spot[] | undefined> {
    try {
      console.log('Attempting to get spots from database.');
      const results = await fetch(this.ngrokUrl + '/spots/', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const data = await results.json();
      for (const spot of data.results) {
        // console.log(spot.image);
        spot.image = spot.image.slice(21);
        // console.log(spot.image);
        spot.image = this.ngrokUrl + spot.image;
        console.log(spot.image);
      }
      return data.results;
    } catch (error) {
      console.log('Failed to get spots: ' + error);
      return undefined;
    }
  }

  public async postSpot(spot: Spot): Promise<void> {
    try {
      console.log("Attempting to post: " + JSON.stringify(spot));
        await fetch(this.ngrokUrl + '/spots/', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(spot)
        });
    } catch (error) {
      console.log('Create spot POST failed: ' + error);
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
          'ngrok-skip-browser-warning': 'true'
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
          'ngrok-skip-browser-warning': 'true'
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
          'ngrok-skip-browser-warning': 'true'

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
          'ngrok-skip-browser-warning': 'true',

        }
      });
      const data = await results.json();
      return data.results;
    } catch (error) {
      console.log('GET user failed: ' + error);
      return '';
    }
  }

  // public getNgrokUrl(): string {
  //   return this.ngrokUrl;
  // }
}

// TODO: log out users at some point - displaying username in top nav bar