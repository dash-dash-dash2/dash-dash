import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card } from "@/components/ui/card";
import io from 'socket.io-client';
import { OrderStatus, RestaurantOrder } from "@/types/order";

export const OrdersSection = () => {
  const [orders, setOrders] = useState<RestaurantOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Initialize socket connection
    const socket = io("http://localhost:5000", {
      auth: { token },
      transports: ['websocket']
    });

    // Listen for new orders
    socket.on('newOrder', (newOrder: RestaurantOrder) => {
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play().catch(console.error);

      // Show notification
      Swal.fire({
        title: 'New Order!',
        html: `
          <div>
            <p><strong>Order #${newOrder.id}</strong></p>
            <p><strong>Customer:</strong> ${newOrder.user.name}</p>
            <p><strong>Total:</strong> $${newOrder.totalAmount.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul style="list-style-type: none; padding: 0;">
              ${newOrder.orderItems.map(item => `
                <li>${item.quantity}x ${item.menu.name}</li>
              `).join('')}
            </ul>
          </div>
        `,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'View Order',
        showCancelButton: true,
        cancelButtonText: 'Close',
        position: 'center'
      }).then((result) => {
        if (result.isConfirmed) {
          const orderElement = document.getElementById(`order-${newOrder.id}`);
          if (orderElement) {
            orderElement.scrollIntoView({ behavior: 'smooth' });
            orderElement.classList.add('highlight-animation');
          }
        }
      });

      // Update orders list
      setOrders(prevOrders => [newOrder, ...prevOrders]);
    });

    // Fetch initial orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/restaurant-owner/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();

    // Cleanup
    return () => {
      socket.off('newOrder');
      socket.disconnect();
    };
  }, []);

  const handleStatusUpdate = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING':
        return 'bg-blue-100 text-blue-800';
      case 'READY_FOR_PICKUP':
        return 'bg-green-100 text-green-800';
      case 'DELIVERED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            id={`order-${order.id}`}
            className="border p-4 rounded-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  Customer: {order.user.name}
                </p>
                <p className="text-sm text-gray-600">
                  Address: {order.user.address}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.user.phone}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
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
              <p className="mt-2 font-semibold">
                Total: ${order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              {order.status === 'PENDING' && (
                <button
                  onClick={() => handleStatusUpdate(order.id, 'PREPARING')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Accept & Start Preparing
                </button>
              )}
              {order.status === 'PREPARING' && (
                <button
                  onClick={() => handleStatusUpdate(order.id, 'READY_FOR_PICKUP')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Mark as Ready
                </button>
              )}
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

// Add this CSS to your global styles or module
const styles = `
  @keyframes highlightAnimation {
    0% {
      background-color: #fef3c7;
      transform: scale(1);
    }
    50% {
      background-color: #fef3c7;
      transform: scale(1.02);
    }
    100% {
      background-color: transparent;
      transform: scale(1);
    }
  }

  .highlight-animation {
    animation: highlightAnimation 2s ease-in-out;
  }
`;