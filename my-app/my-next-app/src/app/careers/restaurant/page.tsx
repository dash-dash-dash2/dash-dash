"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Store, User, Mail, Phone, MapPin, Lock, UtensilsCrossed } from 'lucide-react';
import axios from 'axios';

const RestaurantApplication = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    restaurantName: '',
    address: '',
    cuisineType: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/restaurant-owner/', {
        ownerName: formData.ownerName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        restaurantName: formData.restaurantName,
        address: formData.address,
        cuisineType: formData.cuisineType
      });
      
      toast({
        title: "Application Submitted",
        description: "Your restaurant application has been submitted successfully. You can now login as a restaurant owner.",
      });

      router.push('/auth?role=restaurant');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Partner Your Restaurant</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Owner Name */}
              <div>
                <label className="text-sm font-medium">Owner Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="text"
                    placeholder="Restaurant owner's name"
                    className="pl-10"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="email"
                    placeholder="Contact email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="Contact phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="text-sm font-medium">Restaurant Name</label>
                <div className="relative">
                  <Store className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="text"
                    placeholder="Your restaurant's name"
                    className="pl-10"
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium">Restaurant Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    placeholder="Restaurant's address"
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              {/* Cuisine Type */}
              <div>
                <label className="text-sm font-medium">Cuisine Type</label>
                <div className="relative">
                  <UtensilsCrossed className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    required
                    className="w-full pl-10 p-3 bg-background border rounded-md"
                    value={formData.cuisineType}
                    onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
                  >
                    <option value="">Select cuisine type</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="American">American</option>
                    <option value="French">French</option>
                    <option value="Mediterranean">Mediterranean</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="password"
                    placeholder="Create a password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantApplication; 