"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  Menu as MenuIcon,
  X,
  LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
    // Call the logout function from auth context
    logout();
    
    // Show success toast
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      duration: 3000,
    });

    // Redirect to home page
    router.push('/home');
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              DishDash
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="nav-link">
              Home
            </Link>
            <Link href="/home/allrestorant" className="nav-link">
              Restaurants
            </Link>
            <Link href="/orders" className="nav-link">
              Orders
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2"
                  onClick={() => router.push('/profile')}
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  onClick={() => router.push('/auth?mode=register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/home" className="block py-2">
              Home
            </Link>
            <Link href="/home/allrestorant" className="block py-2">
              Restaurants
            </Link>
            <Link href="/orders" className="block py-2">
              Orders
            </Link>
            <Link href="/about" className="block py-2">
              About
            </Link>
            <div className="pt-4 border-t">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => router.push('/profile')}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mt-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="default"
                    className="w-full"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/auth?mode=register')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;