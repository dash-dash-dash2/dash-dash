"use client";

import React, { useState, useEffect, ChangeEvent, use } from "react";
import api from '@/lib/axios';
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  location?: string;
  imageUrl?: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    imageUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const getProfile = async() =>{
    try {
      const response = await api.get("/users/profile")
      console.log("getProfile", response)

    } catch(err) {
       console.log(err)
    }
     
  }

  useEffect(() => {
    // First load data from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData: User = JSON.parse(userString);
      setUser(userData);
      setFormData({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        address: userData.address || "",
        location: userData.location || "",
        imageUrl: userData.imageUrl || "",
      });
    }

    // Then fetch updated data from the server
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        const serverData = response.data;
        
        // Update both user and formData with server data
        setUser(serverData);
        setFormData({
          id: serverData.id,
          name: serverData.name,
          email: serverData.email,
          phone: serverData.phone || "",
          address: serverData.address || "",
          location: serverData.location || "",
          imageUrl: serverData.imageUrl || "",
        });
        
        // Update localStorage with the latest data
        localStorage.setItem("user", JSON.stringify(serverData));
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Notify user that the image is uploading
      toast.success("Uploading image...");

      // Upload the image to the server
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await api.post("/upload", formData);

        // Set the image URL in formData
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: response.data.url, // Set the image URL from the response
        }));

        // Notify user that the image has been uploaded successfully
        toast.success(
          "Image uploaded successfully! Wait 4 seconds before submitting..."
        );
         
        // Optional: Delay before allowing submission

        // if(upload) {
        //   toast.success("image uploaded ")

        //   setTimeout(() => {
        //     // You can enable the save button or show a message here if needed
        //     setupload(false)
        //   }, 5000);
        // }
        // Wait for 4 seconds
      } catch (error) {
        console.error("Error uploading image:", error);
        // toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
    
    try {
      const response = await api.post("/upload", formData);

      // setupload(true)

      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = formData.imageUrl;

      // Upload new image if a file is selected
      if (file) {
        imageUrl = await uploadImageToCloudinary(file);
      }

      // Update user data with the new image URL
      const updatedUserData = { ...formData, imageUrl };

      // Send the update request using Axios
      const response = await api.put("/users/profile", updatedUserData);

      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setEditMode(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <div className="text-center text-yellow-500">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Profile
        </h1>
        {editMode ? (
          <div className="space-y-4">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <img
                src={  formData.imageUrl || user.imageUrl }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="imageUrl"
                />
                <label
                  htmlFor="imageUrl"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Editable Fields */}
            {["name", "email", "phone", "address", "location"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize text-yellow-300">
                  {field}:
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof User] || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-yellow-400 rounded bg-gray-900 focus:ring-2 focus:ring-orange-500"
                />
              </div>
            ))}

            {/* Save and Cancel Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Non-edit mode UI
          <div className="space-y-4">
            {/* Display User Info */}
            <div className="flex items-center justify-center space-x-4">
              <img
                src={user.imageUrl || "https://i.sstatic.net/l60Hf.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover self-center"
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between">
                <strong className="text-yellow-300">Name:</strong>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-yellow-300">Email:</strong>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-yellow-300">Phone:</strong>
                <span>{user.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-yellow-300">Address:</strong>
                <span>{user.address || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-yellow-300">Location:</strong>
                <span>{user.location || "N/A"}</span>
              </div>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;