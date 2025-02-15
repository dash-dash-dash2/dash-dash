"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
// import { getFullImageUrl } from '../utils/imageUtils';
import { useRouter } from 'next/navigation';

interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    imageUrl: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        password: '',
        imageUrl: user.imageUrl || '',
      });
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'File size too large. Maximum size is 5MB.'
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({
          type: 'error',
          text: 'Please upload an image file.'
        });
        return;
      }

      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (!user?.id) {
        throw new Error('Authentication required');
      }

      // Validate required fields
      if (!profile.name || !profile.email) {
        throw new Error('Name and email are required');
      }

      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      
      if (profile.password) {
        formData.append('password', profile.password);
      }
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (profile.imageUrl) {
        formData.append('imageUrl', profile.imageUrl);
      }

      await updateUser(user.id, formData);

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setTimeout(() => router.push('/home_driver'), 2000);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setMessage({ 
        type: 'error', 
        text: apiError.message || 
              apiError.response?.data?.message || 
              'Error updating profile. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400">
                {(previewUrl || profile.imageUrl) ? (
                  <img
                    src={previewUrl || getFullImageUrl(profile.imageUrl)}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/128';
                    }}
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
              </div>
              <label 
                htmlFor="image-upload" 
                className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                <FaCamera className="text-gray-800" />
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={profile.imageUrl}
                onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-200"
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-gray-800 px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;