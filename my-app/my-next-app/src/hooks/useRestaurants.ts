import { useState, useEffect } from 'react';
import api from '../utils/api';

interface Restaurant {
  id: number;
  name: string;
  cuisineType: string;
  location: string;
  imageUrl?: string;
}

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await api.get('/restaurants');
        if (response.data) {
          setRestaurants(response.data);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants');
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
}; 