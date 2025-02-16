"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Category from "@/app/home/component/category";
import Swal from "sweetalert2"; // Import SweetAlert2 for popups
import styles from './RestaurantOrdersPage.module.css'; // Import CSS module for styling
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon

interface MenuItem {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  id: number;
  supplements: { id: number; name: string; price: number }[];
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
  selectedSupplements: number[];
}

const RestaurantOrdersPage: React.FC = () => {
  const { onerestorantid } = useParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showOrdersModal, setShowOrdersModal] = useState<boolean>(false); // State to control orders modal visibility
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(3); // Set to 3 orders per page
  const [newOrderCount, setNewOrderCount] = useState<number>(0); // Counter for new orders
  const [orderHistory, setOrderHistory] = useState<Order[]>([]); // State for order history
  const [cart, setCart] = useState<CartItem[]>([]); // State for cart items
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null); // State for selected order details
  const [showCartModal, setShowCartModal] = useState<boolean>(false); // State for cart modal visibility
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/menus/restaurant/${onerestorantid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenuItems(response.data);
      } catch (err) {
        setError("Failed to fetch menu items");
        console.error(err);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setNewOrderCount(response.data.length); // Set initial order count
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      }
    };

    const fetchOrderHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/orders/history", {
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
      }
    };

    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      await Promise.all([fetchMenuItems(), fetchOrders(), fetchOrderHistory()]);
      loadCartFromLocalStorage();
      setLoading(false); // Set loading to false after both fetches
    };

    fetchData();
  }, [onerestorantid]);

  const handleSupplementChange = (supplementId: number) => {
    setSelectedSupplements((prev) =>
      prev.includes(supplementId) ? prev.filter(id => id !== supplementId) : [...prev, supplementId]
    );
  };

  const handleAddToCart = (menuId: number, quantity: number, selectedSupplements: number[]) => {
    const newCartItem: CartItem = { menuId, quantity, selectedSupplements };
    const updatedCart = [...cart, newCartItem];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to local storage
    Swal.fire("Success", "Item added to cart!", "success");
  };

  const handleQuantityChange = (menuId: number, newQuantity: number) => {
    const updatedCart = cart.map(item => 
      item.menuId === menuId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const handleDeleteFromCart = (menuId: number) => {
    const updatedCart = cart.filter(item => item.menuId !== menuId);
    setCart(updatedCart);
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
    const token = localStorage.getItem("token");
    const userId = user.id // Retrieve user ID from local storage

    if (!userId) {
      Swal.fire("Error", "User ID is not available. Please log in.", "error");
      return; // Exit the function if user ID is not found
    }

    const totalAmount = calculateTotal() + 5; // Add delivery cost of $5
    const orderData = {
      restaurantId: onerestorantid,
      userId: userId,
      totalAmount: totalAmount,
      status: "PENDING", // Set initial status to "PENDING"
      menuId: selectedMenuId, // Assuming you have a selected menu item ID
      quantity: selectedQuantity, // Assuming you have a selected quantity
      price: selectedPrice, // Assuming you have the price of the selected menu item
    };

    console.log("Order Data:", orderData); // Log the order data being sent

    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Success", "Order created successfully!", "success");
      setCart([]); // Clear cart after order creation
      localStorage.removeItem("cart"); // Remove cart from local storage
      setShowCartModal(false); // Close cart modal
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire("Error", "Failed to create order", "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.main}>
          <header className={styles.header}>
            <h1 className={styles.title}>Menu</h1>
            <div className={styles.cartIcon} onClick={() => setShowCartModal(true)}>
              <FaShoppingCart size={30} />
              {cart.length > 0 && <span className={styles.notificationCount}>{cart.length}</span>}
            </div>
          </header>
          <Category />
          <div className={styles.menuGrid}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.menuCard}>
                <img src={item.imageUrl} alt={item.name} className={styles.menuImage} />
                <h3 className={styles.menuName}>{item.name}</h3>
                <p className={styles.menuDescription}>{item.description}</p>
                <p className={styles.menuPrice}>${item.price.toFixed(2)}</p>
                <button className={styles.selectButton} onClick={() => handleSelectItem(item)}>Select</button>
              </div>
            ))}
          </div>
          <h2>Order History</h2>
          {orderHistory.length === 0 ? (
            <p>No completed orders found.</p>
          ) : (
            orderHistory.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <h3>Order ID: {order.id}</h3>
                <p>Restaurant: {order.restaurant.name}</p>
                <p>Total: ${order.totalAmount.toFixed(2)}</p>
                <p>Status: {order.status}</p>
              </div>
            ))
          )}
          
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <button onClick={() => console.log("Proceed to Checkout")}>Checkout</button>
        </div>
      </div>
      {showOrdersModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Your Orders</h2>
            {currentOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              currentOrders.map((order) => {
                const menuItem = menuItems.find(item => item.id === order.menuId);
                return (
                  <div key={order.id} className={styles.orderCard}>
                    <img src={menuItem?.imageUrl} alt={menuItem?.name} className={styles.orderImage} />
                    <div>
                      <h3>{menuItem?.name}</h3>
                      <p>Quantity: {order.quantity}</p>
                      <p>Total: ${order.totalAmount.toFixed(2)}</p>
                      <button className={styles.deleteButton} onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                    </div>
                  </div>
                );
              })
            )}
            <h3 className={styles.totalPrice}>Total Price: ${calculateTotal().toFixed(2)}</h3>
            <button className={styles.confirmTotalButton} onClick={handleConfirmTotal}>Confirm Total</button>
            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <button className={styles.closeButton} onClick={toggleOrdersModal}>Close</button>
          </div>
        </div>
      )}
      {selectedItem && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.imageUrl} alt={selectedItem.name} className={styles.modalImage} />
            <p className={styles.modalPrice}>${selectedItem.price.toFixed(2)}</p>
            <h3>Choose Quantity:</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className={styles.quantityInput}
            />
            <h3>Select Supplements:</h3>
            {selectedItem.supplements.length > 0 ? (
              selectedItem.supplements.map((supplement) => (
                <label key={supplement.id} className={styles.supplementLabel}>
                  <input
                    type="checkbox"
                    checked={selectedSupplements.includes(supplement.id)}
                    onChange={() => handleSupplementChange(supplement.id)}
                  />
                  {supplement.name} (+${supplement.price.toFixed(2)})
                </label>
              ))
            ) : (
              <p>No supplements available for this menu item.</p>
            )}
            <h3>Order Summary:</h3>
            <p>Menu Price: ${selectedItem.price.toFixed(2)} x {quantity} = ${(selectedItem.price * quantity).toFixed(2)}</p>
            <p>Supplements Cost: ${selectedSupplements.reduce((acc, id) => acc + (selectedItem.supplements.find(s => s.id === id)?.price || 0), 0).toFixed(2)}</p>
            <p>Total Amount: ${((selectedItem.price * quantity) + selectedSupplements.reduce((acc, id) => acc + (selectedItem.supplements.find(s => s.id === id)?.price || 0), 0)).toFixed(2)}</p>
            <div className={styles.modalActions}>
              <button className={styles.closeButton} onClick={() => setSelectedItem(null)}>Close</button>
              <button className={styles.addButton} onClick={() => handleAddToCart(selectedItem.id, quantity, selectedSupplements)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
      {selectedOrderDetails && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Order Details</h2>
            <p>Order ID: {selectedOrderDetails.id}</p>
            <p>Restaurant: {selectedOrderDetails.restaurant.name}</p>
            <p>Status: {selectedOrderDetails.status}</p>
            <p>Total Amount: ${selectedOrderDetails.totalAmount.toFixed(2)}</p>
            <h3>Menu Items:</h3>
            {selectedOrderDetails.menuItems.map(item => (
              <div key={item.id}>
                <p>{item.name} - ${item.price.toFixed(2)}</p>
              </div>
            ))}
            <h3>Supplements:</h3>
            {selectedOrderDetails.supplements.map(supplement => (
              <div key={supplement.id}>
                <p>{supplement.name} - ${supplement.price.toFixed(2)}</p>
              </div>
            ))}
            <button onClick={() => setSelectedOrderDetails(null)}>Close</button>
          </div>
        </div>
      )}
      {showCartModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              cart.map((cartItem, index) => {
                const menuItem = menuItems.find(item => item.id === cartItem.menuId);
                return (
                  <div key={index} className={styles.orderCard}>
                    <img src={menuItem?.imageUrl} alt={menuItem?.name} className={styles.cartItemImage} />
                    <div className={styles.cartItemDetails}>
                      <h3>{menuItem?.name}</h3>
                      <p>Price: ${menuItem?.price.toFixed(2)}</p>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(cartItem.menuId, Number(e.target.value))}
                        className={styles.quantityInput}
                      />
                      <button className={styles.removeButton} onClick={() => handleDeleteFromCart(cartItem.menuId)}>Remove</button>
                    </div>
                  </div>
                );
              })
            )}
            <h3 style={{ fontWeight: 'bold' }}>Total: ${calculateTotal().toFixed(2)}</h3>
            <h4 style={{ fontWeight: 'bold' }}>Delivery Cost: $5.00</h4>
            <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
            <button className={styles.closeButton} onClick={() => setShowCartModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantOrdersPage;