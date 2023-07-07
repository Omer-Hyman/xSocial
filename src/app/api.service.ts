import { Injectable } from '@angular/core';
import { Spot } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly username = 'admin';
  private readonly password = 'REDACTED_SENSITIVE_INFO';

  constructor() { }

  public async getSpots(): Promise<Spot[] | undefined> {
    try {
      console.log('Attempting to get spots.');
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
}
