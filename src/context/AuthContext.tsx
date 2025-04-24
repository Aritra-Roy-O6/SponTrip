import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (user: User) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('spontrip_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // In a real app, these would connect to a backend
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Mock API call
      // This would be replaced with a real API call in production
      console.log("Logging in with:", email, password);
      
      // Mock successful login with demo user
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          age: 28,
          location: 'New York, NY'
        };
        
        setCurrentUser(user);
        localStorage.setItem('spontrip_user', JSON.stringify(user));
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const signup = async (user: User): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Mock API call
      console.log("Signing up user:", user);
      
      // Mock successful signup
      const newUser: User = {
        ...user,
        id: Math.random().toString(36).substr(2, 9)
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('spontrip_user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('spontrip_user');
  };

  const updateUser = async (user: User): Promise<boolean> => {
    try {
      // Mock API call
      console.log("Updating user:", user);
      
      const updatedUser = { ...currentUser, ...user };
      setCurrentUser(updatedUser);
      localStorage.setItem('spontrip_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};