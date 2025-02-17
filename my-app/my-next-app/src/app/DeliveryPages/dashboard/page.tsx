"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Order {
  id: number;
  status: string;
  restaurant: {
    name: string;
    address: string;
  };
  user: {
    name: string;
    address: string;
    phone: string;
  };
  totalAmount: number;
  orderItems: Array<{
    quantity: number;
    menu: {
      name: string;
    };
  }>;
}

const DeliveryDashboard = () => {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:5000", {
      auth: { token }
    });

    // Listen for new orders
    socket.on("newOrder", (order) => {
      if (order.status === "ACCEPTED") {
        Swal.fire({
          title: 'New Order Available!',
          text: `New order from ${order.restaurant.name}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'View Details',
          cancelButtonText: 'Not Now'
        }).then((result) => {
          if (result.isConfirmed) {
            setAvailableOrders(prev => [...prev, order]);
          }
        });
      }
    });

    // Listen for order assignments
    socket.on("orderAssigned", (orderId) => {
      setAvailableOrders(prev => 
        prev.filter(order => order.id !== orderId)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const [availableResponse, myOrdersResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/deliveryman/available-orders", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("http://localhost:5000/api/deliveryman/my-orders", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setAvailableOrders(availableResponse.data);
      setMyOrders(myOrdersResponse.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire('Error', 'Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/deliveryman/toggle-availability",
        { isAvailable: !isAvailable },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAvailable(!isAvailable);
      
      Swal.fire({
        title: `You are now ${!isAvailable ? 'Active' : 'Inactive'}`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      console.error("Error toggling availability:", error);
      Swal.fire('Error', 'Failed to update availability', 'error');
    }
  };

  const acceptOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/deliveryman/accept-order/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Move order from available to my orders
      const acceptedOrder = availableOrders.find(order => order.id === orderId);
      if (acceptedOrder) {
        setMyOrders(prev => [...prev, acceptedOrder]);
        setAvailableOrders(prev => prev.filter(order => order.id !== orderId));
      }

      Swal.fire({
        title: 'Order Accepted',
        text: 'You can now pick up the order',
        icon: 'success'
      });
    } catch (error) {
      console.error("Error accepting order:", error);
      Swal.fire('Error', 'Failed to accept order', 'error');
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMyOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );

      Swal.fire({
        title: 'Status Updated',
        text: `Order status updated to ${status}`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire('Error', 'Failed to update order status', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
        <button
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded-lg ${
            isAvailable 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-red-500 hover:bg-red-600'
          } text-white`}
        >
          {isAvailable ? 'Active' : 'Inactive'}
        </button>
      </div>

      {/* Available Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableOrders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{order.restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                </div>
                <span className="text-lg font-bold">${order.totalAmount}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm">Delivery to: {order.user.address}</p>
                <p className="text-sm">Items: {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
              </div>
              <button
                onClick={() => acceptOrder(order.id)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Accept Order
              </button>
            </div>
          ))}
        </div>
        {availableOrders.length === 0 && (
          <p className="text-gray-500 text-center">No available orders</p>
        )}
      </div>

      {/* My Active Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myOrders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{order.restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                </div>
                <span className="text-lg font-bold">${order.totalAmount}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm">Customer: {order.user.name}</p>
                <p className="text-sm">Phone: {order.user.phone}</p>
                <p className="text-sm">Address: {order.user.address}</p>
                <p className="text-sm">Status: {order.status}</p>
              </div>
              <div className="mt-4 flex gap-2">
                {order.status === 'ACCEPTED' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'PICKED_UP')}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                  >
                    <FaTruck className="inline mr-2" />
                    Picked Up
                  </button>
                )}
                {order.status === 'PICKED_UP' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    <FaCheckCircle className="inline mr-2" />
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {myOrders.length === 0 && (
          <p className="text-gray-500 text-center">No active orders</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;