import { useState } from "react";
import axios from "axios";

const AddMenu = ({ restaurants, onClose, fetchMenus }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(""); // State to store selected restaurant ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedRestaurantId) {
      setError("Please select a restaurant.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "http://localhost:5000/api/restaurant-owner/menu/add",
        {
          restaurantId: selectedRestaurantId, // Use the selected restaurant ID
          name,
          imageUrl,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Menu item added successfully!");
      setName("");
      setImageUrl("");
      setPrice("");
      setSelectedRestaurantId(""); // Reset selected restaurant
      onClose(); // Close the modal
      fetchMenus(); // Refresh the menu list
    } catch (err) {
      setError("Failed to add menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Dropdown to select a restaurant */}
        <select
          value={selectedRestaurantId}
          onChange={(e) => setSelectedRestaurantId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="" disabled>
            Select a restaurant
          </option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Menu Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Menu Item"}
        </button>
      </form>
      <button
        onClick={onClose}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
      >
        Close
      </button>
    </div>
  );
};

export default AddMenu;
