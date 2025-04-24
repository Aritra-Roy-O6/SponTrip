import { User, Trip, Memory, Friend } from '../types';

// This file simulates API endpoints
// In a real app, these would be replaced with actual API calls

// Mock data storage
let users: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    age: 28,
    location: 'New York, NY',
    password: 'password'
  }
];

let trips: Trip[] = [
  {
    id: '1',
    name: 'Weekend Getaway',
    location: 'Miami Beach',
    duration: '2 days',
    mood: 'relaxing',
    people: 2,
    date: '2025-06-15',
    plan: 'Day 1: Beach relaxation and seafood dinner\nDay 2: Spa treatment and shopping',
    userId: '1',
    createdAt: '2025-05-01T12:00:00Z'
  }
];

let memories: Memory[] = [
  {
    id: '1',
    name: 'Beach Fun',
    tripId: '1',
    userId: '1',
    date: '2025-06-15',
    images: [
      'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
      'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg'
    ]
  }
];

let friends: Friend[] = [
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  }
];

// User API
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = users.find(u => u.email === email);
  return user || null;
};

export const createUser = async (user: User): Promise<User> => {
  const newUser = {
    ...user,
    id: Math.random().toString(36).substr(2, 9)
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = async (user: User): Promise<User> => {
  if (!user.id) throw new Error('User ID is required');
  
  const index = users.findIndex(u => u.id === user.id);
  if (index === -1) throw new Error('User not found');
  
  users[index] = { ...users[index], ...user };
  return users[index];
};

// Trip API
export const getTrips = async (userId: string): Promise<Trip[]> => {
  return trips.filter(trip => trip.userId === userId);
};

export const getTrip = async (tripId: string): Promise<Trip | null> => {
  const trip = trips.find(t => t.id === tripId);
  return trip || null;
};

export const createTrip = async (trip: Trip): Promise<Trip> => {
  const newTrip = {
    ...trip,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  trips.push(newTrip);
  return newTrip;
};

export const updateTrip = async (trip: Trip): Promise<Trip> => {
  if (!trip.id) throw new Error('Trip ID is required');
  
  const index = trips.findIndex(t => t.id === trip.id);
  if (index === -1) throw new Error('Trip not found');
  
  trips[index] = { ...trips[index], ...trip };
  return trips[index];
};

export const deleteTrip = async (tripId: string): Promise<boolean> => {
  const initialLength = trips.length;
  trips = trips.filter(t => t.id !== tripId);
  return trips.length < initialLength;
};

// Memory API
export const getMemories = async (userId: string): Promise<Memory[]> => {
  return memories.filter(memory => memory.userId === userId);
};

export const createMemory = async (memory: Memory): Promise<Memory> => {
  const newMemory = {
    ...memory,
    id: Math.random().toString(36).substr(2, 9)
  };
  memories.push(newMemory);
  return newMemory;
};

// Friend API
export const searchUsers = async (query: string): Promise<User[]> => {
  return users.filter(
    user => user.email.includes(query) || user.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const getFriends = async (userId: string): Promise<Friend[]> => {
  // In a real app, this would fetch from a friends relation
  return friends;
};

export const addFriend = async (userId: string, friendId: string): Promise<boolean> => {
  // Mock implementation
  console.log(`User ${userId} added friend ${friendId}`);
  return true;
};

// Trip planning API with AI
export const generateTripPlan = async (
  location: string,
  duration: string,
  mood: string,
  people: number
): Promise<string> => {
  // This would call a real AI API like Gemini in production
  console.log("Generating trip plan for:", location, duration, mood, people);
  
  return `
## ${mood.charAt(0).toUpperCase() + mood.slice(1)} Trip to ${location}

### Day 1
- Morning: Visit local attractions
- Afternoon: Enjoy local cuisine at recommended restaurants
- Evening: Relax at your accommodation

### Day 2
- Morning: Outdoor activities suited to your ${mood} preferences
- Afternoon: Shopping for souvenirs
- Evening: Experience local nightlife

This plan is designed for ${people} people and optimized for a ${mood} experience.
  `;
};

// Map directions API
export const getDirections = async (
  origin: string,
  destination: string
): Promise<string> => {
  // This would call a real maps API in production
  console.log("Getting directions from", origin, "to", destination);
  
  return `
// This is where you would integrate with a maps API
// Example using Google Maps:
// https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=YOUR_API_KEY
  `;
};