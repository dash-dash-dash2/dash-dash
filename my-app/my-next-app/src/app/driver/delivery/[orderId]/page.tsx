'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DeliveryTracking from '@/components/DeliveryTracking';
import { useOrders } from '@/context/OrderContext';

export default function DeliveryPage() {
  const { orderId } = useParams();
  const { currentOrder } = useOrders();
  const [loading, setLoading] = useState(!currentOrder);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState(currentOrder);

  useEffect(() => {
    if (!currentOrder && orderId) {
      fetch(`/api/orders/${orderId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch order');
          return res.json();
        })
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [orderId, currentOrder]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!order) {
    return <div className="text-center p-4">Order not found</div>;
  }

  return <DeliveryTracking order={order} />;
} 