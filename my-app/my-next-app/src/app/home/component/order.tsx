"use client"; // Mark this component as a Client Component
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: string;
  items: string[];
  total: number;
  status: string;
  statusColor: string;
}

const Order: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        // Make the API request
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
    console.log("order",orders);
  }, []);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const orderContainerStyle: React.CSSProperties = {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const orderHeaderStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#1f2937',
  };

  const orderListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const orderItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const orderDetailsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const orderIdStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
  };

  const orderItemsStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
  };

  const orderTotalStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
  };

  const orderStatusStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
  };

  const viewDetailsButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: '#FFB800',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={orderContainerStyle}>
      <h2 style={orderHeaderStyle}>Your Orders</h2>
      <div style={orderListStyle}>
        {orders.map((order) => (
          <div key={order.id} style={orderItemStyle}>
            <div style={orderDetailsStyle}>
              <span style={orderIdStyle}>Order {order.id}</span>
              <span style={orderItemsStyle}>
                {Array.isArray(order.items) ? order.items.join(', ') : 'No items'}
              </span>
              <span style={orderTotalStyle}>
                Total: ${typeof order.total === 'number' ? order.total.toFixed(2) : 'N/A'}
              </span>
            </div>
            <div>
              <span
                style={{
                  ...orderStatusStyle,
                  backgroundColor: order.statusColor,
                  color: '#ffffff',
                }}
              >
                {order.status}
              </span>
              <button style={viewDetailsButtonStyle} onClick={() => openModal(order)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedOrder && (
        <>
          <div style={overlayStyle} onClick={closeModal} />
          <div style={modalStyle}>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Items:</strong> {Array.isArray(selectedOrder.items) ? selectedOrder.items.join(', ') : 'No items'}</p>
            <p><strong>Total:</strong> ${typeof selectedOrder.total === 'number' ? selectedOrder.total.toFixed(2) : 'N/A'}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;