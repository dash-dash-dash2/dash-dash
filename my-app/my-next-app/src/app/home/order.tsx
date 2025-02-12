"use client"; // Mark this component as a Client Component
import React from 'react';

const Order: React.FC = () => {
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

  // Sample order data
  const orders = [
    {
      id: '#12345',
      items: ['Cheeseburger', 'Fries', 'Coke'],
      total: 19.99,
      status: 'Delivered',
      statusColor: '#10b981', // Green for delivered
    },
    {
      id: '#12346',
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: 24.99,
      status: 'Preparing',
      statusColor: '#f59e0b', // Yellow for preparing
    },
    {
      id: '#12347',
      items: ['Sushi Platter', 'Miso Soup'],
      total: 32.99,
      status: 'Pending',
      statusColor: '#ef4444', // Red for pending
    },
  ];

  return (
    <div style={orderContainerStyle}>
      <h2 style={orderHeaderStyle}>Your Orders</h2>
      <div style={orderListStyle}>
        {orders.map((order) => (
          <div key={order.id} style={orderItemStyle}>
            <div style={orderDetailsStyle}>
              <span style={orderIdStyle}>Order {order.id}</span>
              <span style={orderItemsStyle}>{order.items.join(', ')}</span>
              <span style={orderTotalStyle}>Total: ${order.total.toFixed(2)}</span>
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
              <button style={viewDetailsButtonStyle}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;










// "use client"; // Mark this component as a Client Component
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Order {
//   id: string;
//   items: string[];
//   total: number;
//   status: string;
//   statusColor: string;
// }

// const Order: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch orders from API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('https://your-api-endpoint.com/orders');
//         setOrders(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch orders');
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const orderContainerStyle: React.CSSProperties = {
//     padding: '24px',
//     backgroundColor: '#f9fafb',
//     borderRadius: '12px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   };

//   const orderHeaderStyle: React.CSSProperties = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '24px',
//     color: '#1f2937',
//   };

//   const orderListStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px',
//   };

//   const orderItemStyle: React.CSSProperties = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '16px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   };

//   const orderDetailsStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px',
//   };

//   const orderIdStyle: React.CSSProperties = {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#1f2937',
//   };

//   const orderItemsStyle: React.CSSProperties = {
//     fontSize: '14px',
//     color: '#6b7280',
//   };

//   const orderTotalStyle: React.CSSProperties = {
//     fontSize: '16px',
//     fontWeight: 'bold',
//     color: '#1f2937',
//   };

//   const orderStatusStyle: React.CSSProperties = {
//     padding: '8px 16px',
//     borderRadius: '20px',
//     fontSize: '14px',
//     fontWeight: '500',
//     textTransform: 'uppercase',
//   };

//   const viewDetailsButtonStyle: React.CSSProperties = {
//     padding: '8px 16px',
//     borderRadius: '8px',
//     backgroundColor: '#FFB800',
//     color: '#ffffff',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={orderContainerStyle}>
//       <h2 style={orderHeaderStyle}>Your Orders</h2>
//       <div style={orderListStyle}>
//         {orders.map((order) => (
//           <div key={order.id} style={orderItemStyle}>
//             <div style={orderDetailsStyle}>
//               <span style={orderIdStyle}>Order {order.id}</span>
//               <span style={orderItemsStyle}>{order.items.join(', ')}</span>
//               <span style={orderTotalStyle}>Total: ${order.total.toFixed(2)}</span>
//             </div>
//             <div>
//               <span
//                 style={{
//                   ...orderStatusStyle,
//                   backgroundColor: order.statusColor,
//                   color: '#ffffff',
//                 }}
//               >
//                 {order.status}
//               </span>
//               <button style={viewDetailsButtonStyle}>View Details</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Order;