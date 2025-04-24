import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ImageOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { MemoryCollection } from '../../components/memories/MemoryCollection';
import { getMemories } from '../../services/api';
import { Memory } from '../../types';

export const Memories: React.FC = () => {
  const { currentUser } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMemories = async () => {
      if (!currentUser?.id) return;
      
      try {
        const userMemories = await getMemories(currentUser.id);
        setMemories(userMemories);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMemories();
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
          <h1 className="text-3xl font-bold mb-2">Memories</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Capture and revisit your favorite moments from your trips.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/memories/new">
            <Button leftIcon={<Plus size={18} />}>
              Create Memory Collection
            </Button>
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square animate-pulse"></div>
          ))}
        </div>
      ) : memories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <ImageOff size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-xl font-medium mb-2">No memories yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You haven't created any memory collections yet. Start by creating your first one!
          </p>
          <Link to="/memories/new">
            <Button>Create Memory Collection</Button>
          </Link>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {memories.map((memory) => (
            <motion.div key={memory.id} variants={item}>
              <MemoryCollection memory={memory} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Memories;