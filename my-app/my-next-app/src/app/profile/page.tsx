"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Camera, Edit2, Save, X } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  location?: string;
  imageUrl?: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      toast.info("Image selected. Save changes to update your profile picture.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ghassen123');
    formData.append('cloud_name', 'dqh6arave');
    
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dqh6arave/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let imageUrl = formData.imageUrl;
      
      if (file) {
        imageUrl = await uploadImageToCloudinary(file);
      }

      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        { ...formData, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser(response.data);
      setFormData(response.data);
      setFile(null);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-8"></div>
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <ToastContainer />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <Button
                variant={editMode ? "outline" : "default"}
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2"
              >
                {editMode ? (
                  <>
                    <X className="w-4 h-4" /> Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={previewUrl || formData.imageUrl || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editMode && (
                    <label
                      htmlFor="profile-picture"
                      className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:bg-primary-dark transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                      <input
                        type="file"
                        id="profile-picture"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
                <p className="text-gray-500">{formData.email}</p>
              </div>

              {/* Profile Details Section */}
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="email"
                        value={formData.email}
                        disabled
                        className="pl-10 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {editMode && (
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleSave}
                      className="flex items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin">⌛</span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;