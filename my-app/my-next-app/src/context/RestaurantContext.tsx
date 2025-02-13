'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface Restaurant {
  id: string
  name: string
  address: string
  image?: string
  rating?: number
  cuisine?: string
  // Add other restaurant properties as needed
}

interface RestaurantContextType {
  restaurants: Restaurant[]
  loading: boolean
  error: string | null
  fetchRestaurants: () => Promise<void>
  getRestaurantById: (id: string) => Restaurant | undefined
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRestaurants = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/api/restaurants')
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants')
      }
      const data = await response.json()
      setRestaurants(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getRestaurantById = (id: string) => {
    return restaurants.find(restaurant => restaurant.id === id)
  }

  // Fetch restaurants when the provider mounts
  useEffect(() => {
    fetchRestaurants()
  }, [])

  return (
    <RestaurantContext.Provider 
      value={{ 
        restaurants, 
        loading, 
        error, 
        fetchRestaurants,
        getRestaurantById
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurants() {
  const context = useContext(RestaurantContext)
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider')
  }
  return context
} 