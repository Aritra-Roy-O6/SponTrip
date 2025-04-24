import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  LayoutDashboard, 
  PlusCircle, 
  Image, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center space-x-3 px-4 py-3 rounded-lg
        ${isActive 
          ? 'bg-primary-500 text-white' 
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}
        transition-colors duration-200
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        className={`
          fixed top-0 left-0 bottom-0 z-40
          w-64 bg-white dark:bg-gray-900 shadow-xl
          transform transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-primary-500">SponTrip</h2>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <SidebarLink 
            to="/profile" 
            icon={<User size={20} />} 
            label="Profile" 
            onClick={closeSidebar}
          />
          <SidebarLink 
            to="/dashboard" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            onClick={closeSidebar}
          />
          <SidebarLink 
            to="/new-trip" 
            icon={<PlusCircle size={20} />} 
            label="New Trip" 
            onClick={closeSidebar}
          />
          <SidebarLink 
            to="/memories" 
            icon={<Image size={20} />} 
            label="Memories" 
            onClick={closeSidebar}
          />
          <SidebarLink 
            to="/friends" 
            icon={<Users size={20} />} 
            label="Friends" 
            onClick={closeSidebar}
          />
          <SidebarLink 
            to="/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            onClick={closeSidebar}
          />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            onClick={() => {
              logout();
              closeSidebar();
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};