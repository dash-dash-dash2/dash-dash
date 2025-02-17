import React from 'react';
import { useOrders } from '@/context/OrderContext';

export default function OrdersList() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return <div className="flex justify-center p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (orders.length === 0) {
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
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold mb-2">Order #{order.id}</h3>
          <div className="space-y-2">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.menu.name} x{item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-2 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${order.total}</span>
            </div>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 