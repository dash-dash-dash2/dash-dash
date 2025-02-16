import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from "@/context/AuthContext"; // Adjust the path based on your directory structure

interface Order {
  id: string;
  restaurant: {
    latitude: number;
    longitude: number;
    name: string;
  };
  deliveryLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  menuItem: {
    name: string;
    description: string;
    price: number;
  };
  customer: {
    name: string;
  };
  User: {
    address: {
      latitude: number;
      longitude: number;
    };
  };
}

interface OrderContextType {
  orders: Order[];
  activeOrder: Order | null;
  fetchOrders: () => Promise<void>;
  acceptOrder: (orderId: string) => Promise<void>;
  setActiveOrder: (order: Order | null) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { token, user } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/delivery/available', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      const response = await axios.post(`/api/delivery/${orderId}/accept`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActiveOrder(response.data);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  useEffect(() => {
    if (token && user?.role === 'DRIVER') fetchOrders();
  }, [token, user]);

  return (
    <OrderContext.Provider value={{ 
      orders, 
      activeOrder,
      fetchOrders, 
      acceptOrder,
      setActiveOrder
    }}>
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
