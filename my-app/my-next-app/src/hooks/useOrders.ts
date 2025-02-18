import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Order } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`);
      if (response.data) {
        setOrders(response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      await api.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}/accept`);
      // Refresh orders after accepting
      await fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
    // Set up polling to refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  return { orders, loading, error, acceptOrder };
}; 