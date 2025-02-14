"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import RestaurantTable from '@/components/RestaurantTable';

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/restaurants', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to fetch restaurants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    restaurant.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Restaurant Management</h1>
      <input 
        type="text" 
        placeholder="Search by name or cuisine..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <RestaurantTable restaurants={filteredRestaurants} />
      )}
    </AdminLayout>
  );
};

export default RestaurantManagement; 