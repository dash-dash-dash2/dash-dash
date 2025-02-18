"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  Utensils, 
  Settings, 
  BarChart2,
  LogOut,
  Menu
} from 'lucide-react';
import styles from './styles/AdminStyles.module.css';
import { useState } from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Restaurants', icon: Utensils, path: '/admin/restaurants' },
    { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-md transition-all duration-300`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className={`text-2xl font-bold text-gray-800 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            Admin
          </h1>
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 