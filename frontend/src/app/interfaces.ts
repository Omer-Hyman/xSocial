export interface User {
    id?: number;
    username: string;
    password: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    gender?: 'male' | 'female';
    sports?: [string];
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
