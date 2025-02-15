"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Category from "@/app/home/component/category";
import Order from "@/app/home/component/order";

interface MenuItem {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const ingredientsList = ["Cheese", "Tomatoes", "Lettuce", "Onions", "Bacon", "Mushrooms"];

const MenuCard: React.FC<MenuItem & { onClick: (item: MenuItem) => void }> = ({ name, description, price, imageUrl, onClick }) => {
  const formattedPrice = typeof price === "number" ? price.toFixed(2) : "0.00";

  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onClick={() => onClick({ name, description, price, imageUrl  })}
    >
      <img src={imageUrl} alt={name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
      <div style={{ padding: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{name}</h3>
        <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{description}</p>
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#FFB800" }}>${formattedPrice}</p>
      </div>
    </div>
  );
};

const Restaurant: React.FC = () => {
  const { onerestorantid } = useParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust this based on your auth setup
        const response = await axios.get(`http://localhost:5000/api/menus/restaurant/${onerestorantid}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setMenuItems(response.data);
      } catch (err) {
        setError("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [onerestorantid]);

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((item) => item !== ingredient) : [...prev, ingredient]
    );
  };

  const handleAddToOrder = async () => {
    if (!selectedItem) return;

    const token = localStorage.getItem("token"); // Adjust this based on your auth setup

    // Log the selected item to check its structure
    console.log("Selected Item:", selectedItem);

    // Ensure totalAmount is set correctly
    const orderData = {
      restaurantId: onerestorantid,
      items: [
        {
          menuId: selectedItem.id, // Use menuId instead of foodId
          quantity: 1,
          price: selectedItem.price,
        },
      ],
      totalAmount: selectedItem.price, // Ensure this is set
    };

    console.log("Order Data:", orderData); // Log the order data for debugging

    try {
      const response = await axios.post(`http://localhost:5000/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Order Response:", response.data); // Log the response from the API
      alert("Order added successfully!");
      setSelectedItem(null); // Reset selected item after adding to order
    } catch (error) {
      console.error("Error adding order:", error.response ? error.response.data : error.message);
      alert("Failed to add order.");
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
              <MenuCard
                key={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </div>
        <div style={{ width: "300px", backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Order />
        </div>
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
            <h3>Choose Ingredients:</h3>
            <div>
              {ingredientsList.map((ingredient) => (
                <label key={ingredient} style={{ display: "block", marginBottom: "8px" }}>
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientChange(ingredient)}
                  />
                  {ingredient}
                </label>
              ))}
            </div>
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

export default Restaurant;