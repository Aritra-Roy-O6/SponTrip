import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLandingPage 
        ? 'bg-transparent backdrop-blur-sm text-white py-6'
        : 'bg-white dark:bg-gray-900 shadow-sm text-gray-800 dark:text-white py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin size={28} className="text-primary-500" />
          <span className="text-xl font-display font-bold">SponTrip</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <Link to="/dashboard" className="hover:text-primary-500 transition-colors">
              Dashboard
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`hover:text-primary-500 transition-colors ${
                  isLandingPage ? 'text-white' : 'text-gray-800 dark:text-white'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};