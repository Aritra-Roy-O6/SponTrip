import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, MapPin, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormElements';
import { User } from '../../types';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<Partial<User>>({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    age: currentUser?.age || 0,
    location: currentUser?.location || ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleSave = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await updateUser({
        ...currentUser,
        ...userData,
      });
      
      if (success) {
        setIsEditing(false);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-primary-500 h-32 relative">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 p-1">
              <div className="w-full h-full rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-500">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                leftIcon={<UserIcon size={18} />}
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                leftIcon={<Mail size={18} />}
                disabled
              />
              
              <div className="flex gap-4">
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  value={userData.age || ''}
                  onChange={handleChange}
                  className="w-1/3"
                  leftIcon={<Calendar size={18} />}
                />
                
                <Input
                  label="Location"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="w-2/3"
                  leftIcon={<MapPin size={18} />}
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                </div>
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                    <p className="font-medium">{currentUser.age}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">{currentUser.location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <Button 
              variant="outline" 
              leftIcon={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;