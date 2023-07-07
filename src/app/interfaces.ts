export interface User {
    displayName: string;
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
    suitableFor: ['skateboard' | 'bmx' | 'scooter' | 'roller']
}

