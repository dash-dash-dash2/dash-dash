"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

interface AddCategoryProps {
  restaurantId: string
  fetchCategories: () => void
  onClose: () => void
}

const AddCategory: React.FC<AddCategoryProps> = ({ restaurantId, fetchCategories, onClose }) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No token found")

      await axios.post(
        `http://localhost:5000/api/category/restaurants/${restaurantId}/categories`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      fetchCategories()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add category")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Add Category</h2>
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" required />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </Button>
      </div>
    </form>
  )
}

export default AddCategory

