"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

// Add interface for Restaurant type
interface Restaurant {
  id: string;
  name: string;
  cuisineType: string;
  location: string;
}

const RestaurantDetails = ({ params }: { params: { restaurantId: string } }) => {
  const { restaurantId } = params;
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
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
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError('Failed to fetch restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push('/admin/restaurants');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setError('Failed to delete restaurant.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Restaurant Details</h1>
      {restaurant && (
        <>
          <p><strong>ID:</strong> {restaurant.id}</p>
          <p><strong>Name:</strong> {restaurant.name}</p>
          <p><strong>Cuisine Type:</strong> {restaurant.cuisineType}</p>
          <p><strong>Location:</strong> {restaurant.location}</p>
          <button onClick={() => router.push(`/admin/restaurants/edit/${restaurant.id}`)} className="bg-blue-600 text-white p-2 rounded-lg">Edit</button>
          <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded-lg ml-2">Delete</button>
        </>
      )}
      <button onClick={() => router.back()} className="bg-gray-300 p-2 rounded-lg ml-2">Back</button>
    </AdminLayout>
  );
};

export default RestaurantDetails; 