import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/FormElements';
import { Button } from '../../components/ui/Button';
import { Navbar } from '../../components/layout/Navbar';
import { User as UserType } from '../../types';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [userData, setUserData] = useState<Partial<UserType>>({
    name: '',
    email: '',
    age: 0,
    location: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!userData.name || !userData.email || !userData.age || !userData.location || !userData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await signup(userData as UserType);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex min-h-screen">
        {/* Left side - Image */}
        <motion.div 
          className="hidden lg:block lg:w-1/2 relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
            alt="Travel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary-600/40 to-primary-900/40"></div>
        </motion.div>
        
        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-2">
              <MapPin size={28} className="text-primary-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SponTrip</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create an account</h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Join SponTrip to start planning your spontaneous adventures
            </p>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                name="name"
                placeholder="John Doe"
                value={userData.name}
                onChange={handleChange}
                required
                className="mb-4"
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={userData.email}
                onChange={handleChange}
                required
                className="mb-4"
              />
              
              <div className="flex gap-4 mb-4">
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  min="13"
                  placeholder="25"
                  value={userData.age || ''}
                  onChange={handleChange}
                  required
                  className="w-1/3"
                />
                
                <Input
                  label="Location"
                  name="location"
                  placeholder="New York, NY"
                  value={userData.location}
                  onChange={handleChange}
                  required
                  className="w-2/3"
                />
              </div>
              
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleChange}
                required
                className="mb-6"
              />
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="mb-4"
              >
                Create Account
              </Button>
              
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;