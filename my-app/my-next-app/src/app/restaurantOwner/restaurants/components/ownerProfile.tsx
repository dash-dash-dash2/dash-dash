import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, User, X } from "lucide-react";
import Image from "next/image";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  imageUrl: string;
}

const Profile = ({ onClose }: { onClose: () => void }) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<ProfileData>(profile);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: No token found");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/restaurant-owner/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data?.message || "Failed to load profile");
        } else {
          toast.error("Failed to load profile");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: No token found");
        return;
      }

      await axios.put("http://localhost:5000/api/restaurant-owner/profile", updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Failed to update profile");
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUpdatedProfile(profile);
    setIsEditing(false);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      await handleImageUpload(e.target.files[0]); // Automatically upload the image
    }
  };
  const handleImageUpload = async (file: File) => {
    if (!file) return;
  setLoadingImage(true);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Use your preset
  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/doxjp0kvo/image/upload", {
      method: "POST",
      body: formData,
    });
  const data = await response.json();
  if (data.secure_url) {
    setUpdatedProfile((prev) => ({ ...prev, imageUrl: data.secure_url }));
  }
  } catch (error) {
    console.error("Error uploading image:", error);
  } finally {
    setLoadingImage(false);
  }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="w-[600px] max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 z-50 bg-white border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex justify-center">
              {profile.imageUrl ? (
                <div className="relative w-24 h-24">
                  <Image
                    src={profile.imageUrl || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Upload New Profile Picture</Label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md"
                />
                {updatedProfile.imageUrl && (
                  <div className="mt-2">
                    <Image
                      src={updatedProfile.imageUrl || "/placeholder.svg"}
                      alt="Profile preview"
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={isEditing ? updatedProfile.name : profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={isEditing ? updatedProfile.email : profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={isEditing ? updatedProfile.phone : profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={isEditing ? updatedProfile.location : profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={isEditing ? updatedProfile.address : profile.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="sticky bottom-0 z-50 bg-white border-t p-4">
          <div className="flex justify-end gap-4 w-full">
            {isEditing ? (
              <>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;