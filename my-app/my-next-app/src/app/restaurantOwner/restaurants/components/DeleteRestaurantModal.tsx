"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Restaurant {
  id: string
  name: string
}

const DeleteRestaurantModal = ({
  isOpen,
  onClose,
  restaurant,
}: {
  isOpen: boolean
  onClose: () => void
  restaurant: Restaurant | null
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleDelete = async () => {
    if (!restaurant) return
    
    setLoading(true)
    setError("")
    
    try {
      const token = localStorage.getItem("token")
      const restaurantId = typeof restaurant.id === 'string' ? parseInt(restaurant.id) : restaurant.id
      
      // Update to use PUT instead of DELETE
      const response = await axios.put(`http://localhost:5000/api/restaurant-owner/soft-delete/${restaurantId}`, 
        { isDeleted: true },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      if (response.status === 200) {
        alert("Restaurant deleted successfully!")
        router.refresh()
        onClose()
      } else {
        throw new Error(response.data?.message || 'Failed to delete restaurant')
      }
    } catch (err: any) {
      console.error("Delete error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      setError(err.response?.data?.message || "Failed to delete restaurant")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !restaurant) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Delete Restaurant</h2>

        {error && <p className="text-red-500">{error}</p>}

        <p className="mb-4">Are you sure you want to delete the restaurant "{restaurant.name}"?</p>

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={handleDelete} disabled={loading} variant="destructive">
            {loading ? "Deleting..." : "Delete Restaurant"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRestaurantModal

