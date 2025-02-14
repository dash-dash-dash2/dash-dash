"use client";

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin

// Register the required components and the data labels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const Statistics = ({ users, restaurants }) => {
  // Prepare data for the doughnut chart without "Total Users"
  const activeUsers = users.filter(user => !user.banned).length;
  const bannedUsers = users.filter(user => user.banned).length;

  const userData = {
    labels: ['Active Users', 'Banned Users'], // Removed "Total Users"
    datasets: [
      {
        label: 'User Statistics',
        data: [
          activeUsers,
          bannedUsers,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  // Group restaurants by cuisineType and assign colors
  const cuisineCounts = restaurants.reduce((acc, restaurant) => {
    const cuisineType = restaurant.cuisineType || 'Unknown'; // Default to 'Unknown' if no cuisine type
    acc[cuisineType] = (acc[cuisineType] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the bar chart with unique colors
  const restaurantData = {
    labels: Object.keys(cuisineCounts),
    datasets: [
      {
        label: 'Restaurant Statistics by Cuisine Type',
        data: Object.values(cuisineCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const optionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'User Statistics',
      },
    },
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Restaurant Statistics by Cuisine Type',
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%'; // Calculate percentage
          return percentage; // Return percentage as label
        },
        color: 'white', // Color of the labels
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">User Statistics</h2>
        <div className="relative h-64">
          <Doughnut data={userData} options={optionsDoughnut} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Restaurant Statistics</h2>
        <div className="relative h-64">
          <Bar data={restaurantData} options={optionsBar} />
        </div>
      </div>
    </div>
  );
};

export default Statistics; 