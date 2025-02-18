'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "@/context/AuthContext"; // Adjust the path based on your directory structure

interface User {
  id: string;
  name: string;
  role: 'CUSTOMER' | 'DELIVERYMAN' | 'RESTAURANT_OWNER' | 'ADMIN';
}

interface Order {
  id: string;
  orderItems: {
    id: string;
    quantity: number;
    price: number;
    menu: {
      name: string;
      price: number;
      description: string;
    };
  }[];
  status: string;
  total: number;
  restaurant: {
    name: string;
    latitude: number;
    longitude: number;
  };
  user: {
    name: string;
    address: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  deliveryLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  // Add other order properties as needed
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: any) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/orders`);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Set up polling to refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrder = (orderId: string, updates: any) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      loading, 
      error, 
      fetchOrders,
      activeOrder,
      setActiveOrder,
      addOrder,
      updateOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  console.log(context);
  return context;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
} 
