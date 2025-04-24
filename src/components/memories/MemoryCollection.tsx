import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Memory } from '../../types';

interface MemoryCollectionProps {
  memory: Memory;
}

export const MemoryCollection: React.FC<MemoryCollectionProps> = ({ memory }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/memories/${memory.id}`);
  };
  
  return (
    <motion.div 
      className="cursor-pointer group"
      whileHover={{ y: -5 }}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
        {memory.images.length > 0 ? (
          <>
            <img 
              src={memory.images[0]} 
              alt={memory.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-3">
              <h3 className="text-white font-medium">{memory.name}</h3>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Folder size={48} className="text-gray-400 dark:text-gray-500" />
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {memory.images.length} {memory.images.length === 1 ? 'photo' : 'photos'}
        </div>
      </div>
    </motion.div>
  );
};