"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { 
  ArrowUpRight, 
  Users, 
  Utensils, 
  DollarSign, 
  ShoppingBag,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  // Sample data
  const revenueData = [
    { date: '2024-01', revenue: 12000 },
    { date: '2024-02', revenue: 19000 },
    { date: '2024-03', revenue: 15000 },
    { date: '2024-04', revenue: 22000 },
    { date: '2024-05', revenue: 28000 },
    { date: '2024-06', revenue: 25000 },
  ];

  const recentOrders = [
    { id: 1, customer: 'John Doe', restaurant: 'Pizza Palace', total: 45.99, status: 'Completed' },
    { id: 2, customer: 'Jane Smith', restaurant: 'Burger Hub', total: 32.50, status: 'In Progress' },
    { id: 3, customer: 'Mike Johnson', restaurant: 'Sushi Bar', total: 78.25, status: 'Pending' },
    // Add more orders as needed
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stats-card card-hover">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Total Revenue</h3>
              <p className="stats-value">$45,231</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-success text-sm mt-2 flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            +15% from last month
          </p>
        </Card>

        <Card className="stats-card card-hover">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Total Orders</h3>
              <p className="stats-value">1,234</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <p className="text-success text-sm mt-2 flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            +8% from last month
          </p>
        </Card>

        <Card className="stats-card card-hover">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Active Users</h3>
              <p className="stats-value">892</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-success text-sm mt-2 flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            +12% from last month
          </p>
        </Card>

        <Card className="stats-card card-hover">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Restaurants</h3>
              <p className="stats-value">156</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Utensils className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-success text-sm mt-2 flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            +5% from last month
          </p>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6 card-hover">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Revenue Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const [year, month] = date.split('-');
                  return `${month}/${year.slice(2)}`;
                }}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                formatter={(value) => [`$${value}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="p-6 card-hover">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <Clock className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Restaurant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-sm">#{order.id}</td>
                  <td className="py-3 px-4 text-sm">{order.customer}</td>
                  <td className="py-3 px-4 text-sm">{order.restaurant}</td>
                  <td className="py-3 px-4 text-sm">${order.total}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`
                      badge
                      ${order.status === 'Completed' ? 'badge-success' : ''}
                      ${order.status === 'In Progress' ? 'badge-warning' : ''}
                      ${order.status === 'Pending' ? 'badge-danger' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 