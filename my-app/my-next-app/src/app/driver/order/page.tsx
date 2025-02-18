"use client";

import DeliveryTracking from '../../../components/DeliveryTracking';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Order {
  id: string;
  orderItems: any[];
  restaurant: {
    id: string;
    name: string;
    location: string;
  };
  user: {
    id: string;
    name: string;
    address: string;
  };
  status?: string;
  totalAmount?: number;
}

export default function DeliveryPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fetch order details using orderId
    if (orderId) {
      // Add your order fetching logic here
    }
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return <DeliveryTracking order={order} />;
}