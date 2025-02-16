"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vehicleType: '',
    licensePlate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(`/api/deliveryman/${user?.id}`);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          vehicleType: response.data.vehicleType,
          licensePlate: response.data.licensePlate
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setLoading(false);
      }
    };

    if (user) fetchDriverData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [userResponse, deliverymanResponse] = await Promise.all([
        axios.put(`/api/users/${user?.id}`, {
          name: formData.name,
          email: formData.email
        }),
        axios.put(`/api/deliveryman/${user?.id}`, {
          vehicleType: formData.vehicleType,
          licensePlate: formData.licensePlate
        })
      ]);
      
      updateUser(userResponse.data);
      setError(null);
      router.refresh();
    } catch (err) {
      setError('Failed to update profile');
    }
  };

    // if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Vehicle Type</label>
          <select
            value={formData.vehicleType}
            onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="CAR">Car</option>
            <option value="MOTORCYCLE">Motorcycle</option>
            <option value="BICYCLE">Bicycle</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">License Plate</label>
          <input
            type="text"
            value={formData.licensePlate}
            onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;