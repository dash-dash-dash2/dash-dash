"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Package, CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface OrderItem {
  id: number;
  quantity: number;
  menu: {
    name: string;
    price: number;
  };
}

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  restaurant: {
    name: string;
    imageUrl: string;
  };
  orderItems: OrderItem[];
}

const OrdersPage = () => {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
          router.push('/auth');
          return;
        }

        // Fetch active orders (PENDING, PREPARING, DELIVERING)
        const activeResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch order history (DELIVERED)
        const historyResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setActiveOrders(activeResponse.data);
        setOrderHistory(historyResponse.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          router.push('/auth');
        } else {
          toast({
            title: "Error",
            description: error.response?.data?.error || "Failed to fetch orders",
            variant: "destructive"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERING':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination calculations
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentActiveOrders = activeOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentHistoryOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalActivePages = Math.ceil(activeOrders.length / ordersPerPage);
  const totalHistoryPages = Math.ceil(orderHistory.length / ordersPerPage);

  const PaginationControls = ({ totalPages }: { totalPages: number }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className="w-8 h-8"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Loading orders...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </Card>
                ))}
              </div>
            ) : currentActiveOrders.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No active orders</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentActiveOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
                <PaginationControls totalPages={totalActivePages} />
              </>
            )}
          </TabsContent>

          <TabsContent value="history">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </Card>
                ))}
              </div>
            ) : currentHistoryOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No order history</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentHistoryOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
                <PaginationControls totalPages={totalHistoryPages} />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const router = useRouter();
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">{order.restaurant.name}</h3>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {order.status}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.menu.name}</span>
              <span className="text-gray-600">${item.menu.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total Amount</span>
            <span className="font-bold text-primary">${order.totalAmount.toFixed(2)}</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push(`/orders/${order.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrdersPage; 