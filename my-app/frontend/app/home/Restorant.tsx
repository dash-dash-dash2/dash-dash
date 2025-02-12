"use client";
import React, { useState } from "react";

// Simple Navbar Component
const Navbar: React.FC = () => (
  <nav style={{ padding: "16px", background: "#333", color: "#fff", textAlign: "center" }}>
    <h2>Restaurant Menu</h2>
  </nav>
);

// Simple Sidebar Component
const Sidebar: React.FC = () => (
  <aside style={{ width: "200px", background: "#f4f4f4", padding: "16px" }}>
    <h3>Sidebar</h3>
    <ul>
      <li>Home</li>
      <li>Menu</li>
      <li>Orders</li>
    </ul>
  </aside>
);

// Simple Category Component
const Category: React.FC = () => (
  <div style={{ marginBottom: "16px" }}>
    <h3>Categories</h3>
    <p>Select your favorite meal</p>
  </div>
);

// Simple Order Component
const Order: React.FC = () => (
  <div style={{ width: "200px", background: "#f4f4f4", padding: "16px" }}>
    <h3>Order Summary</h3>
    <p>No items selected</p>
  </div>
);

// Ingredient & Product Interfaces
interface Ingredient {
  name: string;
  price: number;
  default: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  calories: number;
  preparationTime: string;
  ingredients: Ingredient[];
}

// Product List
const products: Product[] = [
  {
    id: 1,
    name: "Burger Deluxe",
    description: "Juicy beef burger with fresh toppings.",
    basePrice: 8.99,
    image: "/images/burger.jpg",
    calories: 650,
    preparationTime: "15 minutes",
    ingredients: [
      { name: "Lettuce", price: 0, default: true },
      { name: "Tomato", price: 0, default: true },
      { name: "Cheese", price: 1.5, default: false },
      { name: "Bacon", price: 2, default: false },
    ],
  },
];

// Simple Dialog Component
const Dialog: React.FC<{ open: boolean; onOpenChange: () => void; children?: React.ReactNode }> = ({
  open,
  onOpenChange,
  children,
}) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onOpenChange}
    >
      <div
        style={{ background: "#fff", padding: "20px", borderRadius: "10px", width: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onOpenChange} style={{ marginTop: "10px", padding: "5px", width: "100%" }}>
          Close
        </button>
      </div>
    </div>
  );
};

// Simple Checkbox Component
const Checkbox: React.FC<{ checked: boolean; onCheckedChange: () => void; disabled?: boolean }> = ({
  checked,
  onCheckedChange,
  disabled,
}) => (
  <input type="checkbox" checked={checked} onChange={onCheckedChange} disabled={disabled} />
);

// Main Restaurant Component
const Restaurant: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedIngredients(new Set(product.ingredients.filter((ing) => ing.default).map((ing) => ing.name)));
  };

  const handleIngredientToggle = (ingredientName: string) => {
    setSelectedIngredients((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(ingredientName) ? newSelected.delete(ingredientName) : newSelected.add(ingredientName);
      return newSelected;
    });
  };

  const calculateTotalPrice = (product: Product, selectedIngs: Set<string>) => {
    return (
      product.basePrice +
      product.ingredients
        .filter((ing) => selectedIngs.has(ing.name) && !ing.default)
        .reduce((sum, ing) => sum + ing.price, 0)
    );
  };

  return (
    <div style={{ padding: "24px" }}>
      <Navbar />
      <div style={{ display: "flex", gap: "24px" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Category />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px" }}>
            {products.map((product) => (
              <div key={product.id} style={{ cursor: "pointer" }} onClick={() => handleProductSelect(product)}>
                <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "12px" }} />
                <h3>{product.name}</h3>
                <p>${product.basePrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <Order />
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", borderRadius: "12px" }} />
            <p>{selectedProduct.description}</p>
            <h3>Ingredients</h3>
            {selectedProduct.ingredients.map((ingredient) => (
              <div key={ingredient.name} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
                <Checkbox
                  checked={selectedIngredients.has(ingredient.name)}
                  onCheckedChange={() => handleIngredientToggle(ingredient.name)}
                  disabled={ingredient.default}
                />
                <span>
                  {ingredient.name} {ingredient.default ? "(Included)" : `+ $${ingredient.price.toFixed(2)}`}
                </span>
              </div>
            ))}
            <p><strong>Total: ${calculateTotalPrice(selectedProduct, selectedIngredients).toFixed(2)}</strong></p>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Restaurant;
