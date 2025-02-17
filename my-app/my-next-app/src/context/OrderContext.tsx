'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "@/context/AuthContext"; // Adjust the path based on your directory structure
import { useRouter } from 'next/navigation';

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
  acceptOrder: (orderId: string) => Promise<void>;
  currentOrder: Order | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const router = useRouter();

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

  const acceptOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/delivery/orders/${orderId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept order');
      }

      const acceptedOrder = await response.json();
      setCurrentOrder(acceptedOrder);
      
      // Navigate to the delivery tracking page
      router.push(`/driver/delivery/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept order');
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
    // Set up polling to refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    orders,
    loading,
    error,
    fetchOrders,
    activeOrder,
    setActiveOrder,
    acceptOrder,
    currentOrder
  };

  return (
    <OrderContext.Provider value={value}>
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
