"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface UpdateRestaurantForm {
  name: string
  cuisineType: string
  location: string
  imageUrl?: string
}

interface Restaurant extends UpdateRestaurantForm {
  id: number
}

interface UpdateRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: {
    id: number;
    name: string;
    cuisineType: string;
    location: string;
    imageUrl?: string;
  };
  fetchRestaurants: () => void
}

const UpdateRestaurantModal = ({
  isOpen,
  onClose,
  restaurant,
  fetchRestaurants,
}: UpdateRestaurantModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateRestaurantForm>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loadingImage, setLoadingImage] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    if (restaurant) {
      reset(restaurant)
      setPreviewImage(restaurant.imageUrl || "")
    }
  }, [restaurant, reset])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleImageUpload = async () => {
    if (!file) return

    setLoadingImage(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default") // Use your preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/doxjp0kvo/image/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.secure_url) {
        return data.secure_url
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setLoadingImage(false)
    }
  }

  const onSubmit = async (data: UpdateRestaurantForm) => {
    if (!restaurant) return
    
    setLoading(true)
    setError("")

    try {
      let imageUrl = data.imageUrl
      if (file) {
        imageUrl = await handleImageUpload()
      }

      const token = localStorage.getItem("token")
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurant-owner/update/${restaurant.id}`,
        { ...data, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      alert("Restaurant updated successfully!")
      onClose()
      fetchRestaurants() // Fetch updated restaurant list
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update restaurant")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !restaurant) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Restaurant</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label htmlFor="name">Restaurant Name</Label>
            <Input id="name" {...register("name", { required: "Restaurant name is required" })} className="w-full" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="cuisineType">Cuisine Type</Label>
            <Input
              id="cuisineType"
              {...register("cuisineType", { required: "Cuisine type is required" })}
              className="w-full"
            />
            {errors.cuisineType && <p className="text-red-500">{errors.cuisineType.message}</p>}
          </div>

          <div>
            <Label htmlFor="location">Location (lat,lng)</Label>
            <Input id="location" {...register("location", { required: "Location is required" })} className="w-full" />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>

          <div>
            <Label htmlFor="imageUpload">Restaurant Image</Label>
            <Input id="imageUpload" type="file" onChange={handleFileChange} className="w-full" />
            {previewImage && (
              <div className="mt-2">
                <Image
                  src={previewImage}
                  alt="Restaurant preview"
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || loadingImage}>
              {loading ? "Updating..." : "Update Restaurant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateRestaurantModal

