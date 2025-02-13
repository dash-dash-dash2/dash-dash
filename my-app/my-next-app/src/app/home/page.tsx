"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

interface RestaurantItem {
  name: string;
  cuisineType: string;
  location: string;
  averageRating: number | { score: number };
  categories?: (string | { name: string })[];
  imageUrl: string;
}

const RestaurantCard: React.FC<RestaurantItem> = ({ name, cuisineType, location, averageRating, categories = [], imageUrl }) => {
  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        padding: "16px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <img src={imageUrl} alt={name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "8px" }}>{name}</h3>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>Cuisine: {cuisineType}</p>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>Location: {location}</p>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        averageRating: {typeof averageRating === "number" ? `${averageRating} ⭐` : averageRating?.score ? `${averageRating.score} ⭐` : "No rating available"}
      </p>
      <p style={{ fontSize: "14px", color: "#666666" }}>
        Categories: {categories.length
          ? categories.map((cat) => (typeof cat === "string" ? cat : cat.name)).join(", ")
          : "No categories available"}
      </p>
    </div>
  );
};

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }
        const data = await response.json();
        console.log("Fetched restaurants:", data);
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
