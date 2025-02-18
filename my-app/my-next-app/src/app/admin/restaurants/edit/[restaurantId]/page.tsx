"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

const EditRestaurant = ({ params }: { params: { restaurantId: string } }) => {
  const { restaurantId } = params;
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/restaurants/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const restaurant = response.data;
        setName(restaurant.name);
        setCuisineType(restaurant.cuisineType);
        setLocation(restaurant.location);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError('Failed to fetch restaurant details.');
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/restaurants/${restaurantId}`, {
        name,
        cuisineType,
        location,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push('/admin/restaurants');
    } catch (error) {
      console.error('Error updating restaurant:', error);
      setError('Failed to update restaurant.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Edit Restaurant</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border border-gray-300 rounded-lg p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Cuisine Type:</label>
          <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} required className="border border-gray-300 rounded-lg p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="border border-gray-300 rounded-lg p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">Update Restaurant</button>
      </form>
    </AdminLayout>
  );
};

export default EditRestaurant; 