import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onCategoryAdded: () => void
  restaurantId: number
}

export function AddCategoryModal({ isOpen, onClose, onCategoryAdded, restaurantId }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found')

      await axios.post(
        'http://localhost:5000/api/restaurant-owner/category/add',
        { name: categoryName, restaurantId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      onCategoryAdded()
      onClose()
      setCategoryName('')
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Category</h2>
          <p>Enter the name of the new category you want to add to your restaurant.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Category</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
