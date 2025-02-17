"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { uploadImage } from "@/app/utils/cloudinary";
import Navbar from "@/components/Navbar";

import defaultProfileImage from "@/app/default-profile.jpg";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  imageUrl: string;
  location: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch user profile data
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token);
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-8">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-yellow-400 p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500 text-bold">
          Profile
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            {formData.imageUrl || profile.imageUrl ? (
              <img
                src={formData.imageUrl || profile.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center">
                  No Profile Picture
                </span>
              </div>
            )}
            {editMode && (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="text-white text-lg">Upload</span>
              </label>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-orange-500 text-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-orange-500 text-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-orange-500 text-bold">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg text-bold font-medium text-orange-500 text-bold">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-orange-500 text-bold">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-700"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
