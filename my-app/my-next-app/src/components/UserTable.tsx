"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaBan, FaUserCheck } from 'react-icons/fa';

const UserTable = ({ users }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleBan = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/ban`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh the window after banning
      window.location.reload();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status.");
    }
  };

  const handleUnban = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/unban`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh the window after unbanning
      window.location.reload();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b text-left">ID</th>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Role</th>
            <th className="py-3 px-4 border-b text-left">Banned</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.banned ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                {user.banned ? (
                  <button onClick={() => handleUnban(user.id)} className="text-green-500 hover:underline flex items-center">
                    <FaUserCheck className="mr-1" /> Unban
                  </button>
                ) : (
                  <button onClick={() => handleBan(user.id)} className="text-red-500 hover:underline flex items-center">
                    <FaBan className="mr-1" /> Ban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;