"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  icon: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:5000/api/Category/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Calculate the total width required for all categories
  const categoryWidth = 132; // Width of each category button (100px + padding + gap)
  const containerWidth = categories.length * categoryWidth;

  return (
    <section style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Category</h2>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "16px",
            width: `${containerWidth}px`, // Set the container width dynamically
            overflowX: "auto", // Allow horizontal scrolling if the screen is too small
            paddingBottom: "16px",
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              style={{
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "center",
                // minWidth: "100px",
                // borderRadius: "12px",
                // backgroundColor: "#ffffff",
                // padding: "16px",
                // transition: "background-color 0.2s, color 0.2s",
                // // cursor: "pointer",
                // flexShrink: 0, // Prevent the button from shrinking
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFB800";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
            >
              <span style={{ fontSize: "24px", marginBottom: "8px" }}>{category.icon}</span>
              <span style={{ fontSize: "14px" }}>{category.name}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Category;