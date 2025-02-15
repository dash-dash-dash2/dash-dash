'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from "@/context/AuthContext"; // Adjust the path based on your directory structure

interface Order {
  id: string;
  // Add order properties
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  acceptOrder: (orderId: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token, user } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      await axios.post(`/api/orders/${orderId}/accept`, { driverId: user?.id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, acceptOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 
