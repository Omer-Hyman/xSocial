import { Injectable } from '@angular/core';
import { Coordinates } from 'src/app/interfaces';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  private userID!: number;
  private temporaryMarker?: Coordinates;
  public deviceLocation?: Coordinates;

  constructor() {}

  public getUserID(): number {
    return this.userID;
  }

  public setUserID(userID: number): void {
    this.userID = userID;
  }

  public getTemporaryMarkerCoordinates(): Coordinates | undefined {
    return this.temporaryMarker;
  }

  public setTemporaryMarkerCoordinates(coords: Coordinates): void {
    this.temporaryMarker = coords;
  }

  public deleteTemporaryMarker(): void {
    this.temporaryMarker = undefined;
  }

  private async getLocationPermission(): Promise<boolean> {
    try {
      const result = await Geolocation.requestPermissions();
      if (result.location === 'granted') {
        console.log("location permission granted");
        return true;
      } else {
        console.warn('Location permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission', error);
      return false;
    }
  }

  public async setDeviceLocation(): Promise<void> {
    if (!await this.getLocationPermission)
      return;

    try {
      const deviceLocation = await Geolocation.getCurrentPosition();
      this.deviceLocation = {latitude: deviceLocation.coords.latitude, longitude: deviceLocation.coords.longitude};
      console.log("Device location:");
      console.log("lat: " + this.deviceLocation?.latitude);
      console.log("long: " + this.deviceLocation?.longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }
}
