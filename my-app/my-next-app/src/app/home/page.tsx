"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRestaurants } from '@/context/RestaurantContext';
import { toast } from "@/components/ui/use-toast";

const HomePage = () => {
  const router = useRouter();
  const { restaurants, loading } = useRestaurants();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Featured categories with icons
  const categories = [
    { id: 1, name: 'Fast Food', icon: '🍔', color: '#FFB800' },
    { id: 2, name: 'Pizza', icon: '🍕', color: '#FF6B6B' },
    { id: 3, name: 'Sushi', icon: '🍣', color: '#4ECDC4' },
    { id: 4, name: 'Healthy', icon: '🥗', color: '#95E1D3' },
    { id: 5, name: 'Desserts', icon: '🍰', color: '#F9ED69' },
    { id: 6, name: 'Indian', icon: '🍛', color: '#F38181' }
  ];

  const findNearbyRestaurants = async () => {
    setIsLoadingLocation(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Fetch nearby restaurants from your API
          const response = await fetch(
            `http://localhost:5000/api/restaurants/nearby?latitude=${latitude}&longitude=${longitude}`
          );
          const data = await response.json();
          setNearbyRestaurants(data);
          router.push('/home/allrestorant');
        });
      } else {
        toast({
          title: "Location Error",
          description: "Geolocation is not supported by your browser",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find nearby restaurants",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-6 text-center animate-fade-in">
            Discover the Best Food in Your Area
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl animate-fade-in opacity-90">
            From local favorites to new adventures, find the perfect meal for every craving
          </p>
          
          {/* Location Button */}
          <Button
            size="lg"
            onClick={findNearbyRestaurants}
            className="bg-white text-primary hover:bg-gray-100 transition-colors animate-fade-in"
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <>
                <span className="animate-spin mr-2">
                  <Navigation className="h-5 w-5" />
                </span>
                Finding restaurants...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-5 w-5" />
                Find Restaurants Near Me
              </>
            )}
          </Button>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mt-8 flex gap-4 animate-fade-in">
            <div className="flex-1 relative">
              <Input 
                type="text"
                placeholder="Search for restaurants or cuisines..."
                className="w-full h-12 pl-12 bg-white/90 backdrop-blur-sm text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Button 
              className="h-12 px-8 bg-accent hover:bg-accent-dark text-white"
              onClick={() => router.push('/home/allrestorant')}
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push('/home/allrestorant')}
              >
                <div className="p-6 text-center">
                  <div 
                    className="text-4xl mb-3 transform group-hover:scale-110 transition-transform"
                    style={{ color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Restaurants</h2>
            <Button variant="link" onClick={() => router.push('/restaurants')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              Array(6).fill(null).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </Card>
              ))
            ) : (
              restaurants.slice(0, 6).map((restaurant) => (
                <Card 
                  key={restaurant.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                >
                  <img 
                    src={restaurant.imageUrl || '/default-restaurant.jpg'} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {restaurant.averageRating?.toFixed(1) || '0.0'}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {restaurant.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        25-35 min
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Find Restaurant',
                description: 'Browse through our curated list of top restaurants in your area'
              },
              {
                icon: '🍽️',
                title: 'Choose Your Meal',
                description: 'Select from a wide variety of delicious dishes and customization options'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Get your food delivered to your doorstep quickly and safely'
              }
            ].map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 