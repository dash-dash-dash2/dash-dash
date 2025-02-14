"use client";

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistics = ({ users, restaurants }) => {
  // Prepare data for the bar chart
  const userData = {
    labels: ['Total Users', 'Active Users', 'Banned Users'],
    datasets: [
      {
        label: 'User Statistics',
        data: [
          users.length,
          users.filter(user => !user.banned).length,
          users.filter(user => user.banned).length,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  // Group restaurants by cuisineType
  const cuisineCounts = restaurants.reduce((acc, restaurant) => {
    const cuisineType = restaurant.cuisineType || 'Unknown'; // Default to 'Unknown' if no cuisine type
    acc[cuisineType] = (acc[cuisineType] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the pie chart
  const restaurantData = {
    labels: Object.keys(cuisineCounts),
    datasets: [
      {
        label: 'Restaurant Statistics by Cuisine Type',
        data: Object.values(cuisineCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Statistics</h2>
      <Bar data={userData} options={{ responsive: true }} />
      <h2 className="text-xl font-bold mb-4 mt-8">Restaurant Statistics by Cuisine Type</h2>
      <Pie data={restaurantData} options={{ responsive: true }} />
    </div>
  );
};

export default Statistics; 