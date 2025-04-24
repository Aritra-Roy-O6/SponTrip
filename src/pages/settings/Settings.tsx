import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/Button';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Theme</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Switch between light and dark theme
              </p>
            </div>
            
            <Button
              variant={theme === 'light' ? 'primary' : 'outline'}
              leftIcon={theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Notifications</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Notification settings will be available in a future update.
          </p>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Privacy</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Privacy settings will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;