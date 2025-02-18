"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Category from "@/app/home/component/category";
import Swal from "sweetalert2"; // Import SweetAlert2 for popups
import styles from './RestaurantOrdersPage.module.css'; // Import CSS module for styling
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import { io } from "socket.io-client"; // Import Socket.IO client
import Footer from "@/components/Footer";
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Globe, 
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  ChevronDown,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  restaurantId: number;
  supplements: Array<{
  id: number;
    name: string;
    price: number;
  }>;
}

interface Order {
  id: number;
  menuId: number; // Added to link order to menu item
  quantity: number;
  totalAmount: number;
  status: string;
  restaurant: { name: string }; // Include restaurant name
  supplements: { id: number; name: string; price: number }[]; // Include supplements
}

interface CartItem {
  menuId: number;
  quantity: number;
  name: string;
  price: number;
  selectedSupplements: Array<{
    id: number;
    name: string;
    price: number;
  }>;
}

interface OrderItem {
  menuId: number;
  quantity: number;
  price: number;
}

interface OrderDetails extends Order {
  menuItems: {
    id: number;
    name: string;
    price: number;
  }[];
}

interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisineType: string;
  location: string;
  phone: string;
  website: string;
  openingHours: string;
  imageUrl: string;
  menu: MenuItem[];
  averageRating: number;
  totalRatings: number;
  ratings: Array<{
    id: number;
    score: number;
    comment: string;
    user: { name: string };
    createdAt: string;
  }>;
}

interface CartItems {
  [key: number]: number;
}

interface SelectedSupplements {
  [key: number]: number[];
}

const RestaurantOrdersPage: React.FC = () => {
  const params = useParams() as { onerestorantid: string };
  const { onerestorantid } = params;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplements>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showOrdersModal, setShowOrdersModal] = useState<boolean>(false); // State to control orders modal visibility
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(3); // Set to 3 orders per page
  const [newOrderCount, setNewOrderCount] = useState<number>(0); // Counter for new orders
  const [orderHistory, setOrderHistory] = useState<Order[]>([]); // State for order history
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderDetails | null>(null); // State for selected order details
  const [showCartModal, setShowCartModal] = useState<boolean>(false); // State for cart modal visibility
  const [user, setUser] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]); // State for notifications
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [showCart, setShowCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Get user data from localStorage after component mounts
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/menus/restaurant/${onerestorantid}`);
        const menuData: MenuItem[] = response.data;
        setMenuItems(menuData);
        
        // Find restaurant data from the first menu item
        const restaurantData = menuData[0]?.restaurantId === parseInt(onerestorantid as string) 
          ? {
              id: menuData[0].restaurantId,
              name: menuData[0].name,
              description: '',
              cuisineType: '',
              location: '',
              phone: '',
              website: '',
              openingHours: '',
              imageUrl: '',
              menu: menuData,
              averageRating: 0,
              totalRatings: 0,
              ratings: []
            }
          : null;
        setRestaurant(restaurantData);
        
        const uniqueCategories = Array.from(new Set(menuData.map(item => item.category)));
        setCategories(uniqueCategories as string[]);
        setFilteredMenu(menuData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to fetch menu items");
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setNewOrderCount(response.data.length); // Set initial order count
      } catch (err) {
        setError("Failed to fetch orders");
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch orders. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchOrderHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderHistory(response.data); // Set order history
      } catch (err) {
        console.error("Failed to fetch order history", err);
        Swal.fire("Error", "Failed to fetch order history", "error");
      }
    };

    const loadCartFromLocalStorage = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
        setCartItems(JSON.parse(storedCart));
      }
    };

    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      await fetchMenuItems();
      
      // Only fetch orders if there are existing orders
      if (orders.length > 0) {
        await fetchOrders();
      }
      
      fetchOrderHistory();
      loadCartFromLocalStorage();
      setLoading(false); // Set loading to false after both fetches

      // Socket.IO connection
      const socket = io("http://localhost:5000", {
        auth: { token: localStorage.getItem("token") }
      });

      socket.on("connect", () => {
        console.log("Socket.IO connection established");
      });

      socket.on("orderStatusUpdate", (data) => {
        // Handle order status update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === data.orderId ? { ...order, status: data.status } : order
          )
        );
        setNotifications((prev) => [
          ...prev,
          `Order ID ${data.orderId} status updated to: ${data.status}`,
        ]);

        // Show SweetAlert notification
        Swal.fire({
          title: 'Order Status Updated',
          text: `Order ID ${data.orderId} status updated to: ${data.status}`,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      });

      socket.on("newOrder", (newOrder) => {
        // Add the new order to the state
        setOrders((prevOrders) => [...prevOrders, newOrder]);

        // Show SweetAlert notification for the new order
        Swal.fire({
          title: 'New Order Received',
          text: `Order ID ${newOrder.id} has been added.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });

      socket.on("disconnect", () => {
        console.log("Socket.IO connection closed");
      });

      return () => {
        socket.disconnect(); // Clean up the Socket.IO connection on component unmount
      };
    };

    fetchData();
  }, [onerestorantid]);

  useEffect(() => {
    const total = Object.entries(cartItems).reduce((sum, [id, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(id));
      if (!item) return sum;
      
      const itemSupplements = selectedSupplements[parseInt(id)] || [];
      const supplementsTotal = itemSupplements.reduce((supSum, supId) => {
        const supplement = item.supplements.find(s => s.id === supId);
        return supSum + (supplement?.price || 0);
      }, 0);

      return sum + ((item.price + supplementsTotal) * quantity);
    }, 0);
    
    setCartTotal(total);
  }, [cartItems, menuItems, selectedSupplements]);

  useEffect(() => {
    const count = Object.values(cartItems).reduce((sum, quantity) => sum + (quantity as number), 0);
    setCartItemCount(count);
  }, [cartItems]);

  const handleSupplementChange = (menuId: number, supplementId: number) => {
    setSelectedSupplements(prev => {
      const currentSupplements = prev[menuId] || [];
      const exists = currentSupplements.includes(supplementId);
      
      return {
        ...prev,
        [menuId]: exists 
          ? currentSupplements.filter(id => id !== supplementId)
          : [...currentSupplements, supplementId]
      };
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      router.push('/auth');
      return;
    }

    // Show supplements modal if item has supplements
    if (item.supplements && item.supplements.length > 0) {
      Swal.fire({
        title: 'Select Supplements',
        html: `
          <div class="supplement-list">
            ${item.supplements.map(sup => `
              <div class="supplement-item">
                <input type="checkbox" id="sup-${sup.id}" value="${sup.id}">
                <label for="sup-${sup.id}">${sup.name} (+$${sup.price.toFixed(2)})</label>
              </div>
            `).join('')}
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add to Cart',
        preConfirm: () => {
          return Array.from(document.querySelectorAll('.supplement-item input:checked'))
            .map((el: any) => parseInt(el.value));
        }
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedSupplements(prev => ({
            ...prev,
            [item.id]: result.value
          }));
          setCartItems(prev => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1
          }));
          toast({
            title: "Added to cart",
            description: "Item and supplements added to cart",
          });
        }
      });
    } else {
      // Add item without supplements
      setCartItems(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1
      }));
      toast({
        title: "Added to cart",
        description: "Item added to cart",
      });
    }
  };

  const handleQuantityChange = (menuId: number, newQuantity: number) => {
    const updatedCart = cart.map(item => 
      item.menuId === menuId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    setCartItems(prev => ({ ...prev, [menuId]: newQuantity }));
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const handleDeleteFromCart = (menuId: number) => {
    const updatedCart = cart.filter(item => item.menuId !== menuId);
    setCart(updatedCart);
    setCartItems(prev => {
      const newItems = { ...prev };
      delete newItems[menuId];
      return newItems;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
    Swal.fire("Success", "Item removed from cart!", "success");
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const menuItem = menuItems.find(menu => menu.id === item.menuId);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
    const deliveryCost = 5; // Fixed delivery cost
    return subtotal + deliveryCost;
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedSupplements([]); // Reset selected supplements when a new item is selected
    setSelectedMenuId(item.id); // Set selected menu ID
    setSelectedPrice(item.price); // Set selected price
    setSelectedQuantity(1); // Reset quantity to 1
  };

  const handleConfirmTotal = async () => {
    const deliveryCost = orders.length === 0 ? 0 : 5; // Free delivery for the first order, $5 for subsequent orders
    const totalAmount = calculateTotal() + deliveryCost; // Calculate total amount including delivery

    // Show SweetAlert with total and delivery cost
    const result = await Swal.fire({
      title: 'Confirm Total',
      text: `Total Amount: $${totalAmount.toFixed(2)} (Delivery Cost: $${deliveryCost})`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        // Update all orders' status to "sent"
        const updatePromises = orders.map(order => 
          axios.put(`http://localhost:5000/api/orders/${order.id}/status`, { status: 'SENT' }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        await Promise.all(updatePromises); // Wait for all update requests to complete

        Swal.fire("Success", "All orders confirmed successfully!", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to confirm orders", "error");
      }
    }
  };

  const handleViewOrderDetails = async (orderId: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedOrderDetails(response.data); // Set the selected order details
    } catch (err) {
      console.error("Failed to fetch order details", err);
      Swal.fire("Error", "Failed to fetch order details", "error");
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to place an order",
        variant: "destructive"
      });
      router.push('/auth');
      return;
    }

    try {
      const orderItems = Object.entries(cartItems).map(([menuId, quantity]) => {
        const item = menuItems.find(item => item.id === parseInt(menuId));
        return {
          menuId: parseInt(menuId),
          quantity: quantity,
          price: item?.price || 0
        };
      });

      const totalAmount = orderItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      const response = await axios.post(
        'http://localhost:5000/api/orders',
        {
          restaurantId: parseInt(onerestorantid as string),
          items: orderItems,
          totalAmount: totalAmount
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 201) {
        toast({
          title: "Order placed successfully!",
          description: "Your order has been sent to the restaurant",
        });
        setCartItems({});
        setSelectedSupplements({});
        setShowCart(false);
      }
    } catch (error: any) {
      toast({
        title: "Failed to place order",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const getOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await getOrders(); // Refresh orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
      Swal.fire('Error', 'Failed to delete order', 'error');
    }
  };

  const toggleOrdersModal = () => {
    setShowOrdersModal(!showOrdersModal);
  };

  // Function to clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleUpdateQuantity = (menuId: number, increment: boolean) => {
    setCartItems(prev => {
      const currentQuantity = prev[menuId] || 0;
      const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
      
      if (newQuantity <= 0) {
        const { [menuId]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [menuId]: newQuantity
      };
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{restaurant?.name}</h1>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            {restaurant?.averageRating && restaurant?.totalRatings > 0 && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{restaurant.averageRating.toFixed(1)}</span>
                <span className="ml-1">({restaurant.totalRatings} reviews)</span>
              </div>
            )}
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>123 Restaurant Street, City</span>
          </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Mon-Sun: 9:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards with fake data */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
                    <div>
                <h3 className="font-semibold">Contact</h3>
                <p className="text-gray-600">
                  +216 {restaurant?.name ? restaurant.name.length + 20 : ''} {restaurant?.name ? restaurant.name.length + 100 : ''} {restaurant?.name ? restaurant.name.length + 200 : ''}
                </p>
                  </div>
            </div>
          </Card>
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Website</h3>
                <a 
                  href={`https://${restaurant?.name.toLowerCase().replace(/\s+/g, '')}@restaurant.tn`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  {restaurant?.name.toLowerCase().replace(/\s+/g, '')}@restaurant.tn
                </a>
              </div>
          </div>
          </Card>
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Hours</h3>
                <p className="text-gray-600">
                  Mon-Fri: 9:00 AM - 10:00 PM<br />
                  Sat-Sun: 10:00 AM - 11:00 PM
                </p>
        </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Menu</h2>
          <div className="flex gap-4">
            {categories.map((category) => (
              <Button
                key={`category-${category}`}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <Card key={`menu-item-${item.id}`} className="overflow-hidden group bg-white">
              <div className="relative h-48">
                <img
                  src={item.imageUrl || '/default-dish.jpg'}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-primary hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  {cartItems[item.id] ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, false)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{cartItems[item.id]}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="default"
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          variant="default"
          size="lg"
          className={`rounded-full p-6 shadow-lg ${
            cartItemCount > 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
          } text-white transition-colors`}
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 bg-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Your Cart ({cartItemCount} items)</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Modal Content */}
              <div className="space-y-4 mb-4">
                {Object.entries(cartItems).map(([id, quantity]) => {
                  const item = menuItems.find(item => item.id === parseInt(id));
                  const itemSupplements = selectedSupplements[parseInt(id)] || [];
                  if (!item) return null;
                  
                  const supplementsTotal = itemSupplements.reduce((total, supId) => {
                    const supplement = item.supplements.find(s => s.id === supId);
                    return total + (supplement?.price || 0);
                  }, 0);

                return (
                    <div key={`cart-item-${id}`} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${(item.price + supplementsTotal).toFixed(2)} × {quantity}
                          </p>
                          {itemSupplements.length > 0 && (
                            <div className="text-sm text-gray-500 mt-1">
                              <p className="font-medium">Supplements:</p>
                              <ul className="list-disc list-inside">
                                {itemSupplements.map(supId => {
                                  const supplement = item.supplements.find(s => s.id === supId);
                                  return supplement && (
                                    <li key={`supplement-${supId}`}>
                                      {supplement.name} (+${supplement.price.toFixed(2)})
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:bg-gray-200"
                            onClick={() => handleUpdateQuantity(parseInt(id), false)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-gray-800">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:bg-gray-200"
                            onClick={() => handleUpdateQuantity(parseInt(id), true)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="font-bold text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                  </div>
          </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RestaurantOrdersPage;