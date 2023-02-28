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
    location: string; // possibly an object
}

