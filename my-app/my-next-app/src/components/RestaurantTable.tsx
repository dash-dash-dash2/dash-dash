"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RestaurantTable = ({ restaurants }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 10; // Number of restaurants per page

  // Calculate the index of the last restaurant on the current page
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  // Calculate the index of the first restaurant on the current page
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  // Get the current restaurants
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const handleDelete = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.reload(); // Reload the page to fetch updated restaurant data
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleViewDetails = (restaurantId) => {
    router.push(`/admin/restaurants/${restaurantId}`); // Navigate to restaurant details page
  };

  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  return (
    <>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b text-left">ID</th>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Cuisine Type</th>
            <th className="py-3 px-4 border-b text-left">Location</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRestaurants.map(restaurant => (
            <tr key={restaurant.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-2 px-4 border-b">{restaurant.id}</td>
              <td className="py-2 px-4 border-b">{restaurant.name}</td>
              <td className="py-2 px-4 border-b">{restaurant.cuisineType}</td>
              <td className="py-2 px-4 border-b">{restaurant.location}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleViewDetails(restaurant.id)} className="text-blue-500 hover:underline">View</button>
                <button onClick={() => handleDelete(restaurant.id)} className="text-red-500 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-gray-300 p-2 rounded-lg mr-2">
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-gray-300 p-2 rounded-lg ml-2">
          Next
        </button>
      </div>
    </>
  );
};

export default RestaurantTable; 