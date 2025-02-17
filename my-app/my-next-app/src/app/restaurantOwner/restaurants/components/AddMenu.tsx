"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface Restaurant {
  id: string
  name: string
}

const AddMenu = ({
  restaurants,
  onClose,
  fetchMenus,
}: { restaurants: Restaurant[]; onClose: () => void; fetchMenus: () => void }) => {
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loadingImage, setLoadingImage] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      // Create a preview URL for the selected file
      setImageUrl(URL.createObjectURL(e.target.files[0]))
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
        setImageUrl(data.secure_url)
        return data.secure_url
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setLoadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!selectedRestaurantId) {
      setError("Please select a restaurant.")
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No token found")

      let finalImageUrl = imageUrl
      if (file) {
        finalImageUrl = (await handleImageUpload()) || ""
      }

      const response = await axios.post(
        "http://localhost:5000/api/restaurant-owner/menu/add",
        {
          restaurantId: selectedRestaurantId,
          name,
          imageUrl: finalImageUrl,
          price: Number.parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      alert("Menu item added successfully!")
      setName("")
      setImageUrl("")
      setPrice("")
      setSelectedRestaurantId("")
      setFile(null)
      onClose()
      fetchMenus()
    } catch (err) {
      setError("Failed to add menu item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="restaurant">Select Restaurant</Label>
          <Select value={selectedRestaurantId} onValueChange={setSelectedRestaurantId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a restaurant" />
            </SelectTrigger>
            <SelectContent>
              {restaurants.map((restaurant) => (
                <SelectItem key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Menu Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUpload">Menu Image</Label>
          <Input id="imageUpload" type="file" onChange={handleFileChange} />
          {imageUrl && (
            <div className="mt-2">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Menu item preview"
                width={100}
                height={100}
                className="object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <Button type="submit" disabled={loading || loadingImage}>
          {loading ? "Adding..." : "Add Menu Item"}
        </Button>
      </form>
      <Button onClick={onClose} variant="outline" className="mt-4 bg-gray-200 text-black hover:bg-gray-300">
        Close
      </Button>
    </div>
  )
}

export default AddMenu

