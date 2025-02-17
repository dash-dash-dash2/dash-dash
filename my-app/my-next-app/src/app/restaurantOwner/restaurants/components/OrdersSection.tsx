import { useState, useEffect } from "react";
import axios from "axios";
import { RestaurantOrder } from "@/types";
import Swal from "sweetalert2";
import { Card } from "@/components/ui/card";
import io from 'socket.io-client';

export const OrdersSection = () => {
  const [orders, setOrders] = useState<RestaurantOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = io(); // Connect to the socket server

  useEffect(() => {
    fetchOrders();

    // Listen for new orders
    socket.on('newOrder', (newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]); // Update the orders state
    });

    return () => {
      socket.off('newOrder'); // Clean up the listener on component unmount
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/restaurant-owner/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  From: {order.restaurant.name}
                </p>
              </div>
              <span className="text-lg font-bold">${order.totalAmount}</span>
            </div>
            <div className="mt-4">
              <p>Status: {order.status}</p>
              <p>Customer: {order.user.name}</p>
              <p>Address: {order.user.address}</p>
              <p>Phone: {order.user.phone}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    {item.quantity}x {item.menu.name} - ${item.menu.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-gray-500 text-center">No orders found</p>
        )}
      </div>
    </Card>
  );
};