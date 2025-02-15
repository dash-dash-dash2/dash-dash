"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Category from "@/app/home/component/category";
import Swal from "sweetalert2"; // Import SweetAlert2 for popups

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
  status: string;
  totalAmount: number;
}

const RestaurantOrdersPage: React.FC = () => {
  const { onerestorantid } = useParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchMenuItems(), fetchOrders()]);
      setLoading(false); // Set loading to false after both fetches
    };

    fetchData();
  }, [onerestorantid]);

  const handleSupplementChange = (supplementId: number) => {
    setSelectedSupplements((prev) =>
      prev.includes(supplementId) ? prev.filter(id => id !== supplementId) : [...prev, supplementId]
    );
  };

  const handleAddToOrder = async () => {
    if (!selectedItem) return;

    const token = localStorage.getItem("token");
    const orderData = {
      restaurantId: onerestorantid,
      menuId: selectedItem.id,
      quantity,
      selectedSupplements,
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Success", "Order added successfully!", "success");
      setSelectedItem(null);
      setQuantity(1);
      setSelectedSupplements([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error adding order:", error.response ? error.response.data : error.message);
      Swal.fire("Error", "Failed to add order.", "error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px", backgroundColor: "white" }}>
      <Navbar />
      <div style={{ display: "flex", gap: "24px" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Category />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px" }}>
            {menuItems.map((item) => (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => setSelectedItem(item)}>Select</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No voiding orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id}>
              <h2>Order ID: {order.id}</h2>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount}</p>
            </div>
          ))
        )}
      </div>
      {selectedItem && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", width: "400px" }}>
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.imageUrl} alt={selectedItem.name} style={{ width: "100%", borderRadius: "8px" }} />
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>${selectedItem.price ? selectedItem.price.toFixed(2) : "0.00"}</p>
            <h3>Choose Quantity:</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
            />
            <h3>Select Supplements:</h3>
            {selectedItem.supplements.map((supplement) => (
              <label key={supplement.id} style={{ display: "block", marginBottom: "8px" }}>
                <input
                  type="checkbox"
                  checked={selectedSupplements.includes(supplement.id)}
                  onChange={() => handleSupplementChange(supplement.id)}
                />
                {supplement.name} (+${supplement.price.toFixed(2)})
              </label>
            ))}
            <h3>Order Summary:</h3>
            <p>Menu Price: ${selectedItem.price.toFixed(2)} x {quantity} = ${(selectedItem.price * quantity).toFixed(2)}</p>
            <p>Supplements Cost: ${selectedSupplements.reduce((acc, id) => acc + (selectedItem.supplements.find(s => s.id === id)?.price || 0), 0).toFixed(2)}</p>
            <p>Delivery Cost: $5.00</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setSelectedItem(null)} style={{ padding: "8px 12px", cursor: "pointer" }}>Close</button>
              <button onClick={handleAddToOrder} style={{ padding: "8px 12px", backgroundColor: "#FFB800", color: "white", cursor: "pointer" }}>Add to Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantOrdersPage;