import React from 'react';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/context/AuthContext';
import { socket } from '@/utils/socket';
import type { Order } from '@/types';

const OrdersList = () => {
  const { orders, loading, error, acceptOrder } = useOrders();
  const { user } = useAuth();

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await acceptOrder(orderId);
      
      // Join the order tracking room
      socket.emit('joinOrderTracking', orderId);
      
      // Start location tracking
      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
          (position) => {
            socket.emit('updateLocation', {
              orderId,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => console.error('Geolocation error:', error),
          {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000
          }
        );
      }
    } catch (err) {
      console.error('Error accepting order:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center p-8">
        <img 
          src="/empty-orders.svg" 
          alt="No orders" 
          className="w-24 h-24 mb-4 opacity-50"
        />
        <p className="text-gray-500">No available orders at the moment</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order: Order) => (
        <div 
          key={order.id} 
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold mb-2">{order.restaurant.name}</h3>
          <div className="space-y-2">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.menu.name} x{item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-2 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
          
          {order.status === 'PENDING' && user?.role === 'DELIVERYMAN' && (
            <button
              onClick={() => handleAcceptOrder(order.id.toString())}
              className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Accept Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersList; 