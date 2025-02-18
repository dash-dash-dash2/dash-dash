"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  // Sample data - replace with real data from your API
  const monthlyOrders = [
    { month: 'Jan', orders: 65 },
    { month: 'Feb', orders: 59 },
    { month: 'Mar', orders: 80 },
    { month: 'Apr', orders: 81 },
    { month: 'May', orders: 56 },
    { month: 'Jun', orders: 55 },
  ];

  const userGrowth = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 500 },
    { month: 'Mar', users: 600 },
    { month: 'Apr', users: 750 },
    { month: 'May', users: 850 },
    { month: 'Jun', users: 1000 },
  ];

  const pieData = [
    { name: 'Restaurants', value: 45 },
    { name: 'Customers', value: 35 },
    { name: 'Drivers', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-green-500 text-sm">+12% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">5,678</p>
          <p className="text-green-500 text-sm">+8% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">$12,345</p>
          <p className="text-green-500 text-sm">+15% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Restaurants</h3>
          <p className="text-3xl font-bold">89</p>
          <p className="text-green-500 text-sm">+5% from last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Orders</h3>
          <BarChart width={500} height={300} data={monthlyOrders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#8884d8" />
          </BarChart>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <LineChart width={500} height={300} data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>
    </div>
  );
};

export default Analytics; 