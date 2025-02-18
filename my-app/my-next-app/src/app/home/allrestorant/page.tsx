"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import ReviewsPopup from './ReviewsPopup';
import Footer from "@/components/Footer";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Filter,
  ChevronDown,
  Heart
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RatingPopup from '@/components/RatingPopup';

interface Review {
  id: string;
  score: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt?: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisineType: string;
  location: string;
  averageRating: number;
  ratings: Review[];
  totalRatings: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

// Function to render stars based on the rating
const renderStars = (rating: number) => {
  const filledStars = Math.round(rating); // Round the rating to the nearest whole number
  const totalStars = 5; // Total number of stars
  return (
    <span style={{ color: '#ffcc00' }}>
      {'★'.repeat(filledStars)} {/* Filled stars in gold */}
      <span style={{ color: 'gray' }}>{'☆'.repeat(totalStars - filledStars)}</span> {/* Empty stars in gray */}
    </span>
  );
};

// RestaurantCard component with click handler
const RestaurantCard: React.FC<Restaurant & { 
  onRatingAdded: (newRating: Review) => void;
  onReviewClick: (id: string) => void;
  onRateClick: (id: string) => void;
}> = ({
  id,
  name,
  cuisineType,
  location,
  averageRating,
  totalRatings,
  imageUrl,
  ratings,
  onRatingAdded,
  onReviewClick,
  onRateClick
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const router = useRouter();

  // Convert ratings to Review type
  const reviews: Review[] = ratings.map(rating => ({
    id: Math.random(), // You might want to add proper IDs in your data
    score: rating.score,
    comment: rating.comment || '', // Provide default empty string for undefined comments
    user: rating.user,
    createdAt: new Date().toISOString() // You might want to add proper dates in your data
  }));

  const handleClick = () => {
    if (!showPopup) {
      console.log(`Clicked restaurant ID: ${id}`);
      router.push(`/home/onerestorant/${id}`);
    }
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        padding: "16px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
      onClick={handleClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ) : (
        <div style={{ width: "100%", height: "150px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <p style={{ textAlign: "center", padding: "50px 0", color: "#999" }}>No Image Available</p>
        </div>
      )}
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "8px" }}>
        {name}
      </h3>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        Cuisine: {cuisineType}
      </p>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        Location: {location}
      </p>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        Average Rating: {renderStars(typeof averageRating === 'number' ? averageRating : averageRating.score)} ({totalRatings} ratings)
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}>Rate</button>
        <button onClick={(e) => { e.stopPropagation(); setShowReviews(true); }}>Show All Reviews</button> {/* Button to show reviews */}
      </div>
      
      {showPopup && (
        <RatingPopup
          restaurantId={id}
          onClose={() => setShowPopup(false)}
          onRatingAdded={(newRating) => {
            onRatingAdded(newRating);
            setShowPopup(false);
          }}
        />
      )}
      {showReviews && (
        <ReviewsPopup
          reviews={reviews}
          onClose={() => setShowReviews(false)}
        />
      )}
    </div>
  );
};

// RestaurantList component to fetch and display restaurants
const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const router = useRouter();
  const { toast } = useToast();
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Cuisine types for filter
  const cuisineTypes = ['All', 'Italian', 'Japanese', 'Indian', 'American', 'Mexican', 'Chinese'];

    const fetchNearbyRestaurants = async (latitude: number, longitude: number) => {
      try {
      setLoading(true);
        const response = await fetch(
        `http://localhost:5000/api/restaurants/nearby?latitude=${latitude}&longitude=${longitude}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
        if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth'); // Redirect to login if unauthorized
          return;
        }
        throw new Error("Failed to fetch nearby restaurants");
      }
      
        const data = await response.json();
      const restaurantsWithRatings = await Promise.all(
        data.map(async (restaurant: Restaurant) => {
          try {
            const ratingsResponse = await fetch(
              `http://localhost:5000/api/ratings/restaurant/${restaurant.id}`,
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              }
            );
            
            if (!ratingsResponse.ok) {
              return {
                ...restaurant,
                ratings: [],
                totalRatings: 0,
                averageRating: 0
              };
            }

          const ratingsData = await ratingsResponse.json();
            return {
              ...restaurant,
              ratings: (ratingsData.ratings || []).map((rating: any) => ({
                id: rating.id || String(Math.random()),
                score: rating.score || 0,
                comment: rating.comment || "",
                user: {
                  name: rating.user?.name || "Anonymous"
                },
                createdAt: rating.createdAt
              })),
              totalRatings: ratingsData.totalRatings || 0,
              averageRating: ratingsData.averageRating || 0
            };
          } catch (error) {
            return {
              ...restaurant,
              ratings: [],
              totalRatings: 0,
              averageRating: 0
            };
          }
        })
      );

        setRestaurants(restaurantsWithRatings);
      } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch nearby restaurants",
        variant: "destructive",
      });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
          fetchNearbyRestaurants(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            setError("Unable to retrieve your location.");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
  }, []);

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.cuisineType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisineType === selectedCuisine;
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (typeof b.averageRating === 'number' ? b.averageRating : 0) - 
               (typeof a.averageRating === 'number' ? a.averageRating : 0);
      }
      return 0;
    });

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/home/onerestorant/${restaurantId}`);
  };

  const handleRateClick = (restaurantId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setSelectedRestaurantId(restaurantId);
    setShowRatingPopup(true);
  };

  const handleShowReviews = (restaurantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRestaurantId(restaurantId);
    setShowReviews(true);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleRatingAdded = (restaurantId: string, newRating: Review) => {
    setRestaurants(prevRestaurants => 
      prevRestaurants.map(restaurant => 
        restaurant.id === restaurantId
          ? {
              ...restaurant,
              ratings: [newRating, ...(restaurant.ratings || [])],
              totalRatings: (restaurant.totalRatings || 0) + 1,
              averageRating: 
                ((restaurant.averageRating || 0) * (restaurant.totalRatings || 0) + newRating.score) / 
                ((restaurant.totalRatings || 0) + 1)
            }
          : restaurant
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary-dark/90 py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Discover Amazing Restaurants
          </h1>
          <p className="text-xl mb-8 animate-fade-in opacity-90">
            Find and review the best local restaurants in your area
          </p>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Input 
                type="text"
                placeholder="Search restaurants..."
                className="w-full h-12 pl-12 bg-white/90 backdrop-blur-sm text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="h-12 px-6">
                  <Filter className="w-5 h-5 mr-2" />
                  {selectedCuisine}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {cuisineTypes.map((cuisine) => (
                  <DropdownMenuItem
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                  >
                    {cuisine}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="h-12 px-6"
              onClick={() => {
                setIsNearby(!isNearby);
                if (!isNearby) {
                  // Get user location and fetch nearby restaurants
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ lat: latitude, lng: longitude });
                        fetchNearbyRestaurants(latitude, longitude);
                      },
                      (error) => {
                        toast({
                          title: "Location Error",
                          description: "Unable to get your location",
                          variant: "destructive",
                        });
                      }
                    );
                  }
                }
              }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              {isNearby ? 'Show All' : 'Near Me'}
            </Button>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <Card
                key={restaurant.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleRestaurantClick(restaurant.id)}
        style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={restaurant.imageUrl || '/default-restaurant.jpg'}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {typeof restaurant.averageRating === 'number' 
                        ? restaurant.averageRating.toFixed(1) 
                        : '0.0'}
                      <span className="text-gray-400 ml-1">
                        ({restaurant.totalRatings})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {userLocation && restaurant.latitude && restaurant.longitude ? (
                        <span>
                          {calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            restaurant.latitude,
                            restaurant.longitude
                          ).toFixed(1)} km away
                        </span>
                      ) : (
                        restaurant.location
                      )}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      25-35 min
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">
                      {restaurant.cuisineType}
                    </span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleShowReviews(restaurant.id, e)}
                        className="hover:bg-primary hover:text-white"
                      >
                        See Reviews
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={(e) => handleRateClick(restaurant.id, e)}
                        className="bg-primary hover:bg-primary-dark"
                      >
                        Rate
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
        ))}
      </div>
        )}
      </section>
      
      {/* Rating Popup */}
      {showRatingPopup && selectedRestaurantId && (
        <RatingPopup
          restaurantId={selectedRestaurantId}
          onClose={() => setShowRatingPopup(false)}
          onRatingAdded={(newRating) => {
            handleRatingAdded(selectedRestaurantId, newRating);
            toast({
              title: "Rating Submitted",
              description: "Thank you for your review!",
              duration: 3000,
            });
            setShowRatingPopup(false);
          }}
        />
      )}

      {/* Reviews Popup */}
      {showReviews && selectedRestaurantId && (
        <ReviewsPopup
          reviews={
            restaurants
              .find(r => r.id === selectedRestaurantId)
              ?.ratings?.map(rating => ({
                id: rating.id,
                score: rating.score,
                comment: rating.comment || "",
                user: rating.user || { name: "Anonymous" },
                createdAt: rating.createdAt
              })) || []
          }
          onClose={() => setShowReviews(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default RestaurantList;