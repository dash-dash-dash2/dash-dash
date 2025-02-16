"use client"
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface AddRestaurantForm {
  name: string;
  cuisineType: string;
  location: string;
  imageUrl?: string;
}

const AddRestaurantModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddRestaurantForm>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: AddRestaurantForm) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      await axios.post("http://localhost:5000/api/restaurant-owner/add", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Restaurant added successfully!");
      reset();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add restaurant");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Restaurant</h2>
        
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            type="text"
            placeholder="Restaurant Name"
            {...register("name", { required: "Restaurant name is required" })}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="text"
            placeholder="Cuisine Type"
            {...register("cuisineType", { required: "Cuisine type is required" })}
            className="border p-2 w-full rounded"
          />
          {errors.cuisineType && <p className="text-red-500">{errors.cuisineType.message}</p>}

          <input
            type="text"
            placeholder="Location (lat,lng)"
            {...register("location", { required: "Location is required" })}
            className="border p-2 w-full rounded"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}

          <input
            type="text"
            placeholder="Image URL (optional)"
            {...register("imageUrl")}
            className="border p-2 w-full rounded"
          />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
              {loading ? "Adding..." : "Add Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
