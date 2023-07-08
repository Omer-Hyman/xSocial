import { Injectable } from '@angular/core';
import { LoggedInUser, Spot, User } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly username = 'admin';
  private readonly password = 'REDACTED_SENSITIVE_INFO';

  constructor() { }

  public async getSpots(): Promise<Spot[] | undefined> {
    try {
      console.log('Attempting to get spots from database.');
      const results = await fetch('http://localhost:8000/spots/', {
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
      return undefined;
    }
  }

  public async postSpot(spot: Spot): Promise<void> {
    try {
      console.log("Attempting to post: " + spot);
      console.log(JSON.stringify(spot));
      const results = await fetch('http://localhost:8000/spots/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spot)
      });
      console.log(results);
    } catch (error) {
      console.log('Create spot POST failed: ' + error);
    }
  }

  public async createNewUser(user: User): Promise<number> {
    try {
      console.log("Attempting to post: " + user);
      console.log(JSON.stringify(user));
      const results = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      console.log(results);
      return results.status;
    } catch (error) {
      console.log('Create user POST failed: ' + error);
      return -1;
    }
  }

  public async login(username: string, password: string): Promise<LoggedInUser | undefined> {
    try {
      const request = await fetch('http://127.0.0.1:8000/api-user-login/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      const result = await request.json();
      console.log(result);
      return {
        id: result.id,
        token: result.token,
        username: result.username
      };
    } catch (error) {
      console.log('Login user failed: ' + error);
      return undefined;
    }
    // return this.http.post(
    //   'http://127.0.0.1:8000/api-user-login/', { username, password }
    //   ) as Observable;
  }

  public async getUsers(): Promise<User[] | undefined> {
    try {
      console.log("Attempting to get users");
      // console.log(JSON.stringify(user));
      const results = await fetch('http://localhost:8000/users/', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
          'Content-Type': 'application/json',
        }
      });
      const data = await results.json();
      console.log(data.results);
      return data.results;
    } catch (error) {
      console.log('GET user failed: ' + error);
      return undefined;
    }
  }
}
