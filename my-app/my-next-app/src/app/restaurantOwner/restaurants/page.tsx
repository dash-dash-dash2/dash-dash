"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Building2, DollarSign, ListOrdered, MenuSquare } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import axios from "axios"
import AddRestaurantModal from "./components/AddRestaurantModal"
import { useRouter } from "next/navigation" // Import useRouter here
import Profile from "./components/ownerProfile"
import AddMenu from "./components/AddMenu"
import {RatingsModal} from "./components/ratings-modal" // Import RatingsModal
import { AddCategoryModal } from "./components/AddCategoryModal" // Added import
import { RestaurantOrder, OrderStatus } from "@/types"
import Swal from "sweetalert2"
import { io, Socket } from "socket.io-client"

const Sidebar = ({ selected, setSelected }) => {
    const menuItems = [
      { name: "Dashboard", icon: Building2 },
      { name: "Restaurants", icon: Building2 },
      { name: "Categories", icon: ListOrdered },
      { name: "Menu Items", icon: MenuSquare },
      { name: "Analytics", icon: DollarSign },
      { name: "Settings", icon: MenuSquare },
    ]

    return (
      <div className="w-64 bg-white border-r">
        <div className="p-4 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-red-500" />
          <span className="font-semibold text-lg">RestaurantOS</span>
        </div>
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelected(item.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm rounded-lg w-full text-left",
                selected === item.name ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    )
  }

  const RestaurantList = ({ restaurants }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const handleUpdate = async (restaurantId: number) => {
      try {
        console.log("Update restaurant with ID:", restaurantId);
      } catch (err) {
        console.error("Error updating restaurant:", err);
      }
    };

    const handleDelete = async (restaurantId: number) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.delete(`http://localhost:5000/api/restaurant-owner/delete/${restaurantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Restaurant deleted successfully:", response.data);
      } catch (err) {
        console.error("Error deleting restaurant:", err);
      }
    };

    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">My Restaurants</h2>
        <div className="space-y-4">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant)}
                className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 w-full text-left"
              >
                <Image
                  src={restaurant.imageUrl || "/placeholder.svg"}
                  alt={restaurant.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{restaurant.name}</h3>
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                      {restaurant.averageRating || "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{restaurant.cuisineType}</p>
                  <p className="text-xs text-gray-400 mt-1">{restaurant.location}</p>
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(restaurant.id);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer"
                  >
                    Update
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(restaurant.id);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No restaurants found.</p>
          )}
        </div>
        <RatingsModal
          isOpen={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          ratings={selectedRestaurant?.ratings || []}
          restaurantName={selectedRestaurant?.name || ""}
        />
      </Card>
    );
  };


  const RevenueChart = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
      <div className="h-[300px] flex items-end gap-4">
        {[60, 80, 40, 50, 70, 90, 30].map((height, i) => (
          <div key={i} className="flex-1 bg-red-500 rounded-t-lg" style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i}>Day {i + 1}</div>
        ))}
      </div>
    </Card>
  )

 

  const AnalyticsSection = () => {
    const [orders, setOrders] = useState<RestaurantOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
      // Initialize Socket.IO connection
      const token = localStorage.getItem("token");
      const newSocket = io("http://localhost:5000", {
        transports: ['websocket'],
        auth: {
          token
        }
      });

      setSocket(newSocket);

      // Socket event listeners
      newSocket.on("connect", () => {
        console.log("Socket connected successfully");
      });

      newSocket.on("orderStatusUpdate", (data) => {
        console.log("Received order update:", data);
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === data.orderId 
              ? { ...order, status: data.status }
              : order
          )
        );
        
        // Show notification
        Swal.fire({
          title: 'Order Updated',
          text: data.message,
          icon: 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      // Cleanup on unmount
      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }, []);

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/restaurant-owner/orders",
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
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

    useEffect(() => {
      fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId: number, newStatus: OrderStatus) => {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/orders/${orderId}/status`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Swal.fire("Success", `Order status updated to ${newStatus}`, "success");
        fetchOrders();
      } catch (error) {
        console.error("Error updating order status:", error);
        Swal.fire("Error", "Failed to update order status", "error");
      }
    };

    const filteredOrders = filter === 'ALL' 
      ? orders 
      : orders.filter(order => order.status === filter);

    const getTotalRevenue = () => {
      return orders.reduce((sum, order) => sum + order.totalAmount, 0);
    };

    const getOrdersByStatus = () => {
      return {
        pending: orders.filter(o => o.status === 'PENDING').length,
        preparing: orders.filter(o => o.status === 'PREPARING').length,
        ready: orders.filter(o => o.status === 'READY_FOR_PICKUP').length,
        delivered: orders.filter(o => o.status === 'DELIVERED').length
      };
    };

    if (loading) return <div>Loading analytics...</div>;

    const stats = getOrdersByStatus();

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold">${getTotalRevenue().toFixed(2)}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold">Preparing</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.preparing}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold">Ready for Pickup</h3>
            <p className="text-2xl font-bold text-green-600">{stats.ready}</p>
          </Card>
        </div>

        {/* Orders Management */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order Management</h2>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as OrderStatus | 'ALL')}
              className="border p-2 rounded"
            >
              <option value="ALL">All Orders</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="PREPARING">Preparing</option>
              <option value="READY_FOR_PICKUP">Ready for Pickup</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      Customer: {order.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Address: {order.user.address}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'PREPARING' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.menu.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-medium">
                    Total: ${order.totalAmount.toFixed(2)}
                  </div>
                </div>

                {/* Status Update Buttons */}
                {order.status === 'PENDING' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'ACCEPTED')}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Accept Order
                  </button>
                )}

                {order.status === 'ACCEPTED' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'PREPARING')}
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Start Preparing
                  </button>
                )}

                {order.status === 'PREPARING' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'READY_FOR_PICKUP')}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Mark as Ready
                  </button>
                )}
              </Card>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const DashboardPage = () => {
    const router = useRouter() // Now useRouter is defined
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedSection, setSelectedSection] = useState("Dashboard")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showAllRestaurants, setShowAllRestaurants] = useState(false)
    const [menus, setMenus] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [showProfile, setShowProfile] = useState(false)
    const [showAddMenuModal, setShowAddMenuModal] = useState(false)
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false) // Added state variable

    useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token found")

          const response = await axios.get("http://localhost:5000/api/restaurant-owner", {
            headers: { Authorization: `Bearer ${token}` },
          })

          setRestaurants(response.data)
        } catch (err: any) {
          setError(err.message || "Failed to fetch restaurants")
        } finally {
          setLoading(false)
        }
      }

      fetchRestaurants()
    }, [])

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found")

        const response = await axios.get("http://localhost:5000/api/restaurant-owner", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const allCategories = response.data.reduce((acc: any[], restaurant: any) => {
          if (restaurant.categories) {
            restaurant.categories.forEach((cat: any) => {
              if (!acc.find((c) => c.id === cat.category.id)) {
                acc.push(cat.category)
              }
            })
          }
          return acc
        }, [])

        setCategories(allCategories)
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories")
      }
    }

    useEffect(() => {
      fetchCategories()
    }, [restaurants])

    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found")

        const response = await axios.get("http://localhost:5000/api/restaurant-owner", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const allMenus = response.data.reduce((acc: any[], restaurant: any) => {
          if (restaurant.menus) {
            restaurant.menus.forEach((menu: any) => {
              if (!acc.find((m) => m.id === menu.id)) {
                acc.push({
                  ...menu,
                  restaurantName: restaurant.name,
                })
              }
            })
          }
          return acc
        }, [])

        setMenus(allMenus)
      } catch (err: any) {
        setError(err.message || "Failed to fetch menus")
      }
    }

    useEffect(() => {
      fetchMenus()
    }, [restaurants])

    if (loading) return <div>Loading restaurants...</div>
    if (error) return <div>Error: {error}</div>

    const restaurantsToDisplay = showAllRestaurants ? restaurants : restaurants.slice(0, 2)
    console.log("owner restaurants", restaurants)

    const handleLogout = () => {
      localStorage.removeItem("token")
      router.push("/auth") // Redirect to the auth page
    }

    const handleCategoryAdded = () => { // Added function
      fetchCategories()
    }

    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar selected={selectedSection} setSelected={setSelectedSection} />

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{selectedSection}</h1>
            {selectedSection === "Restaurants" && (
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setIsModalOpen(true)}>
                Add Restaurant
              </button>
            )}
            {selectedSection === "Menu Items" && (
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setShowAddMenuModal(true)}>
                Add Menu Item
              </button>
            )}
          </div>

          {/* Display Dashboard Contents */}
          {selectedSection === "Dashboard" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {[
                  { title: "Total Restaurants", value: restaurants.length, icon: Building2 },
                  { title: "Total Revenue", value: "$0.00", icon: DollarSign },
                  { title: "Categories", value: categories.length.toString(), icon: ListOrdered },
                  { title: "Menu Items", value: menus.length.toString(), icon: MenuSquare },
                ].map((stat, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <stat.icon className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Restaurant List & Revenue Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <RestaurantList restaurants={restaurantsToDisplay} />
                  {!showAllRestaurants && (
                    <div className="flex justify-center mt-4">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setShowAllRestaurants(true)}
                      >
                        View More
                      </button>
                    </div>
                  )}
                </div>
                <RevenueChart />
              </div>
            </>
          )}

          {/* Display Restaurant List in "Restaurants" section */}
          {selectedSection === "Restaurants" && <RestaurantList restaurants={restaurants} />}

          {/* Display Categories section */}
          {selectedSection === "Categories" && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4"> {/* Added div for button */}
                <h2 className="text-lg font-semibold">Categories</h2>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => setShowAddCategoryModal(true)}
                >
                  Add Category
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {categories.length === 0 && <p className="text-gray-500 text-sm">No categories found.</p>}
            </Card>
          )}

          {/* Display Menu Items section */}
          {selectedSection === "Menu Items" && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Restaurant Menus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menus.map((menu) => (
                  <div key={menu.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      {menu.imageUrl ? (
                        <Image
                          src={menu.imageUrl || "/placeholder.svg"}
                          alt={menu.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <MenuSquare className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{menu.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">From: {menu.restaurantName}</p>
                        {menu.price > 0 && <p className="text-sm text-gray-500 mt-1">Base price: ${menu.price}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {menus.length === 0 && <p className="text-gray-500 text-sm">No menus found.</p>}
            </Card>
          )}

          {/* Display Orders section */}
          {selectedSection === "Orders" && <OrdersSection />}

          {/* Display Analytics section */}
          {selectedSection === "Analytics" && <AnalyticsSection />}

          {/* Display Settings section */}
          {selectedSection === "Settings" && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setShowProfile(true)}
                >
                  View Profile
                </button>
                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </Card>
          )}
        </div>

        {/* Add Restaurant Modal */}
        <AddRestaurantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Add Menu Modal */}
        {showAddMenuModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <AddMenu
                fetchMenus={fetchMenus}
                restaurants={restaurants}
                restaurantId={restaurants[0]?.id}
                onClose={() => setShowAddMenuModal(false)}
              />
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {showProfile && <Profile onClose={() => setShowProfile(false)} />}

        {/* Add Category Modal */}
        {showAddCategoryModal && (
          <AddCategoryModal
            isOpen={showAddCategoryModal}
            onClose={() => setShowAddCategoryModal(false)}
            onCategoryAdded={handleCategoryAdded}
            restaurantId={restaurants[0]?.id}
          />
        )}
      </div>
    )
  }

  export default DashboardPage
