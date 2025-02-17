"use client"
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaHome, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { getFullImageUrl } from '../utils/imageUtils';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsSettingsOpen(false);
    router.push('/');
  };

  useEffect(() => {
    setImageError(false);
  }, [user?.imageUrl]);

  return (
    <nav className="bg-yellow-400 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home_driver" className="flex items-center space-x-2 hover:transform hover:scale-105 transition-transform">
          <FaHome className="text-gray-800 text-2xl" />
          <span className="text-gray-800 text-2xl font-extrabold tracking-wider">Dish-Dash</span>
        </Link>

        {user && (
          <div className="flex items-center space-x-6">
            <span className="text-gray-800 font-medium hidden md:block">
              Welcome, {user.name}
            </span>
            
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center space-x-3 focus:outline-none group"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white group-hover:border-yellow-200 transition-all duration-300 shadow-md transform group-hover:scale-105">
                  {user?.imageUrl && !imageError ? (
                    <img
                      src={getFullImageUrl(user.imageUrl)}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
                      <FaUserCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <FaCog className={`text-gray-800 text-xl transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''} group-hover:text-gray-900`} />
              </button>
              
              {isSettingsOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-yellow-100 transform transition-all duration-300">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-yellow-50 transition-colors duration-200"
                    onClick={() => setIsSettingsOpen(false)}
                  >
                    <FaUserCircle className="mr-3 text-yellow-500" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FaSignOutAlt className="mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;