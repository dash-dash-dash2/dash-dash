"use client";
import React from "react";
import Navbar from "./Navbar";

// Updated MenuItem Interface with Category
interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string; // New field for categorizing menu items
}

// MenuCard Component
const MenuCard: React.FC<MenuItem> = ({ name, description, price, imageUrl }) => {
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
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <img src={imageUrl} alt={name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
      <div style={{ padding: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{name}</h3>
        <p style={{ fontSize: "14px", color: "#666666", marginBottom: "12px" }}>{description}</p>
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#FFB800" }}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Restaurant Component
const Restaurant: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      name: "Cheeseburger",
      description: "Juicy beef patty with melted cheese, lettuce, and tomato.",
      price: 9.99,
      imageUrl: "https://via.placeholder.com/250x160",
      category: "Main Courses", // Category added
    },
    {
      name: "Margherita Pizza",
      description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
      price: 12.99,
      imageUrl: "https://via.placeholder.com/250x160",
      category: "Main Courses", // Category added
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with Caesar dressing and croutons.",
      price: 7.99,
      imageUrl: "https://via.placeholder.com/250x160",
      category: "Starters", // Category added
    },
    {
      name: "Tiramisu",
      description: "Rich coffee-flavored dessert with layers of mascarpone cream.",
      price: 6.99,
      imageUrl: "https://via.placeholder.com/250x160",
      category: "Desserts", // Category added
    },
  ];

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
      <Navbar />
      {Object.entries(groupedMenuItems).map(([category, items]) => (
        <div key={category}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>{category}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {items.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurant;









// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";

// // Updated MenuItem Interface with Category
// interface MenuItem {
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: string; // New field for categorizing menu items
// }

// // MenuCard Component
// const MenuCard: React.FC<MenuItem> = ({ name, description, price, imageUrl }) => {
//   return (
//     <div
//       style={{
//         borderRadius: "12px",
//         backgroundColor: "#ffffff",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         overflow: "hidden",
//         transition: "transform 0.2s, box-shadow 0.2s",
//         cursor: "pointer",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-4px)";
//         e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "none";
//         e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
//       }}
//     >
//       <img src={imageUrl} alt={name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
//       <div style={{ padding: "16px" }}>
//         <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{name}</h3>
//         <p style={{ fontSize: "14px", color: "#666666", marginBottom: "12px" }}>{description}</p>
//         <p style={{ fontSize: "16px", fontWeight: "bold", color: "#FFB800" }}>${price.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// // Restaurant Component
// const Restaurant: React.FC = () => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get("https://your-api-endpoint.com/menu-items");
//         setMenuItems(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch menu items");
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Group menu items by category
//   const groupedMenuItems = menuItems.reduce((acc, item) => {
//     if (!acc[item.category]) {
//       acc[item.category] = [];
//     }
//     acc[item.category].push(item);
//     return acc;
//   }, {} as Record<string, MenuItem[]>);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
//       <Navbar />
//       {Object.entries(groupedMenuItems).map(([category, items]) => (
//         <div key={category}>
//           <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>{category}</h2>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//               gap: "24px",
//             }}
//           >
//             {items.map((item, index) => (
//               <MenuCard key={index} {...item} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Restaurant;