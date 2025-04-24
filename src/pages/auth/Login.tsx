import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/FormElements';
import { Button } from '../../components/ui/Button';
import { Navbar } from '../../components/layout/Navbar';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
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
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-2">
              <MapPin size={28} className="text-primary-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SponTrip</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Welcome back</h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Sign in to your account to continue planning your adventures
            </p>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail size={18} />}
                className="mb-4"
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftIcon={<Lock size={18} />}
                className="mb-6"
              />
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="mb-4"
              >
                Sign In
              </Button>
              
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
        
        {/* Right side - Image */}
        <motion.div 
          className="hidden lg:block lg:w-1/2 relative overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg"
            alt="Travel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/40 to-primary-900/40"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;