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
    /** Username */
    createdBy?: number; 
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
    suitableFor: ('skateboard' | 'bmx' | 'scooter' | 'roller')[];
    image: string;
}

export interface LoggedInUser {
    id: number;
    token: string;
    username: string;
  }
