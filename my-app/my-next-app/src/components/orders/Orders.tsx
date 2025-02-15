import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { FaBox, FaMapMarkerAlt, FaClock, FaUser, FaStore } from 'react-icons/fa';

interface Order {
  id: string;
  status: string;
  customerId: string;
  restaurantId: string;
  totalPrice: number;
  createdAt: string;
  deliveryAddress: string;
  customer: {
    name: string;
    email: string;
  };
  restaurant: {
    name: string;
  };
}

const Orders = () => {
  const { orders, acceptOrder } = useOrders();
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await acceptOrder(orderId);
    } catch (err) {
      setError('Failed to accept order. Please try again later.');
      console.error('Error accepting order:', err);
    }
  };

 

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaBox className="mr-2 text-yellow-500" />
        Available Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <FaBox className="mx-auto text-4xl mb-4" />
          <p>No available orders at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    <FaClock className="inline mr-1" />
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <FaStore className="mt-1 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {order.restaurant?.name || 'Restaurant name not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUser className="mt-1 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {order.customer?.name || 'Customer name not available'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.customer?.email || 'Email not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Delivery Location</p>
                    <p className="text-sm text-gray-500">
                      {order.deliveryAddress || 'Address not available'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleAcceptOrder(order.id)}
                className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Accept Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;