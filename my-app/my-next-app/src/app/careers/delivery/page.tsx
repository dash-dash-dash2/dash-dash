"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, MapPin, Car, Lock } from 'lucide-react';
import axios from 'axios';

const DeliveryApplication = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    vehicleType: '',
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
      const response = await axios.post('http://localhost:5000/api/deliveryman/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        vehicleType: formData.vehicleType
      });
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. You can now login as a delivery partner.",
      });

      router.push('/auth?role=deliveryman');
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
          <h1 className="text-2xl font-bold mb-6">Become a Delivery Partner</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="text"
                    placeholder="Your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    placeholder="Your email address"
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
                    placeholder="Your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Your address"
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="text-sm font-medium">Vehicle Type</label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    required
                    className="w-full pl-10 p-3 bg-background border rounded-md"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                  >
                    <option value="">Select vehicle type</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
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

export default DeliveryApplication; 