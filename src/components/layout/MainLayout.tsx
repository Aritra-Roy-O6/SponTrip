import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar />
      <div className="lg:ml-64">
        <main className="container mx-auto px-4 py-8 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};