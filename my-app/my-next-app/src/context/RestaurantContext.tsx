'use client'
import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface Restaurant {
  id: string;
  name: string;
  cuisineType: string;
  location: string;
  imageUrl: string;
  averageRating?: number;
  totalRatings?: number;
  ratings?: any[];
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  fetchRestaurants: () => Promise<void>;
  getRestaurantById: (id: string) => Restaurant | undefined;
  selectedRestaurant: any;
  setSelectedRestaurant: (restaurant: any) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurants`);
      setRestaurants(response.data);
      console.log(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantById = (id: string) => {
    return restaurants.find((restaurant) => restaurant.id === id);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, loading, error, fetchRestaurants, getRestaurantById, selectedRestaurant, setSelectedRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurants() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurants must be used within a RestaurantProvider");
  }
  return context;
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
