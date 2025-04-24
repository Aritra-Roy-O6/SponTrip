import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Users } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg" 
            alt="Travel Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Plan Your Spontaneous Adventure
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover new places, create unforgettable memories, and connect with friends on impromptu trips.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/signup" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Planning
              </Link>
              <Link 
                to="/login" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SponTrip Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Plan your impromptu trips with ease, connect with friends, and create lasting memories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MapPin size={32} className="text-primary-500" />}
              title="Choose Location"
              description="Select a destination for your impromptu trip."
            />
            <FeatureCard 
              icon={<Clock size={32} className="text-primary-500" />}
              title="Set Duration"
              description="Decide how long your trip will last."
            />
            <FeatureCard 
              icon={<Users size={32} className="text-primary-500" />}
              title="Invite Friends"
              description="Share your trip plans and collaborate with friends."
            />
            <FeatureCard 
              icon={<Navigation size={32} className="text-primary-500" />}
              title="Explore"
              description="Get AI-powered suggestions tailored to your preferences."
            />
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See SponTrip in Action</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch how SponTrip can help you plan your next adventure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
            {/* Video placeholder - replace with actual video embed */}
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">Video Placeholder</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up today and start planning your spontaneous trips with friends.
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg inline-block transition-colors"
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <MapPin size={24} className="text-primary-500" />
                <span className="text-xl font-bold text-white">SponTrip</span>
              </div>
              <p className="mt-2">Plan spontaneous trips with ease.</p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} SponTrip. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default Landing;