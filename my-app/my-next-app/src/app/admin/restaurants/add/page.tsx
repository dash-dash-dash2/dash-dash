"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/restaurants`, {
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
      console.error('Error adding restaurant:', error);
      setError('Failed to add restaurant.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Add Restaurant</h1>
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">Add Restaurant</button>
      </form>
    </AdminLayout>
  );
};

export default AddRestaurant; 