"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

const UserRoleManagement = ({ params }) => {
  const { userId } = params;
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleRoleChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`, { role }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push('/admin/users');
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Manage User Role</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <form onSubmit={handleRoleChange} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-1">Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required className="border border-gray-300 rounded-lg p-2 w-full">
            <option value="CUSTOMER">Customer</option>
            <option value="DELIVERYMAN">Deliveryman</option>
            <option value="RESTAURANT_OWNER">Restaurant Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">Update Role</button>
      </form>
      <button onClick={() => router.back()} className="bg-gray-300 p-2 rounded-lg ml-2">Back</button>
    </AdminLayout>
  );
};

export default UserRoleManagement; 