export interface User {
    username: string;
    displayName?: string;
    password: string;
    firstName?: string;
    lastName?: string;
    gender?: 'male' | 'female';
    sports?: [string];
    // password?
    // change sport type?
}

export interface Spot {
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
    suitableFor: ('skateboard' | 'bmx' | 'scooter' | 'roller')[]
}

export interface LoggedInUser {
    id: number,
    token: string,
    username: string
  }
