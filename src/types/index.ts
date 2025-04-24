export interface User {
    id?: string;
    name: string;
    email: string;
    age: number;
    location: string;
    password?: string;
    profilePicture?: string;
  }
  
  export interface Trip {
    id?: string;
    name: string;
    location: string;
    duration: string;
    mood: string;
    people: number;
    date: string;
    plan?: string;
    userId: string;
    collaborators?: string[];
    comments?: Comment[];
    createdAt: string;
  }
  
  export interface Comment {
    id: string;
    text: string;
    userId: string;
    userName: string;
    createdAt: string;
  }
  
  export interface Memory {
    id?: string;
    name: string;
    tripId: string;
    userId: string;
    date: string;
    images: string[];
  }
  
  export interface Friend {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
  }