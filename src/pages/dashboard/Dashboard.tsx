import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { TripCard } from '../../components/dashboard/TripCard';
import { getTrips } from '../../services/api';
import { Trip } from '../../types';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTrips = async () => {
      if (!currentUser?.id) return;
      
      try {
        const userTrips = await getTrips(currentUser.id);
        setTrips(userTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrips();
  }, [currentUser]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {currentUser?.name}! Here's an overview of your trips.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/new-trip">
            <Button leftIcon={<Plus size={18} />}>
              Create New Trip
            </Button>
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-xl font-medium mb-2">No trips yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You haven't created any trips yet. Start planning your first adventure!
          </p>
          <Link to="/new-trip">
            <Button>Create Your First Trip</Button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {trips.map((trip) => (
              <motion.div key={trip.id} variants={item}>
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Memories</h2>
            <Link to="/memories" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              View all memories
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Relive your previous adventures and share them with friends.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;