import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, UserPlus, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormElements';
import { searchUsers, getFriends } from '../../services/api';
import { User, Friend } from '../../types';

export const Friends: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFriends = async () => {
      if (!currentUser?.id) return;
      
      try {
        const userFriends = await getFriends(currentUser.id);
        setFriends(userFriends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFriends();
  }, [currentUser]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      const results = await searchUsers(searchQuery);
      // Filter out current user and already added friends
      const filteredResults = results.filter(
        user => user.id !== currentUser?.id &&
        !friends.some(friend => friend.id === user.id)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleAddFriend = async (user: User) => {
    if (!currentUser?.id || !user.id) return;
    
    try {
      // Mock adding friend
      const newFriend: Friend = {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      };
      
      setFriends(prev => [...prev, newFriend]);
      setSearchResults(prev => prev.filter(u => u.id !== user.id));
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Friends</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Your Friends</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : friends.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">No friends yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Search for users to add them as friends.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      {friend.profilePicture ? (
                        <img 
                          src={friend.profilePicture} 
                          alt={friend.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-medium">
                          {friend.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{friend.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{friend.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Find Friends</h2>
            
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex">
                <Input
                  placeholder="Search by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none"
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none"
                  isLoading={isSearching}
                >
                  <Search size={18} />
                </Button>
              </div>
            </form>
            
            {searchResults.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Search Results</h3>
                <div className="space-y-4">
                  {searchResults.map((user) => (
                    <motion.div 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          {user.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt={user.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                              {user.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        leftIcon={<UserPlus size={16} />}
                        onClick={() => handleAddFriend(user)}
                      >
                        Add
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;