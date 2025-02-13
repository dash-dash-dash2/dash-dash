'use client'

import { useRestaurants } from '@/context/RestaurantContext'

export default function RestaurantsPage() {
  const { restaurants, loading, error } = useRestaurants()

  if (loading) return <div>Loading restaurants...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {restaurants.map((restaurant) => (
        <div 
          key={restaurant.id} 
          className="border rounded-lg p-4 shadow-sm"
        >
          {restaurant.image && (
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <h2 className="text-xl font-bold mt-2">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.address}</p>
          {restaurant.cuisine && (
            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
          )}
          {restaurant.rating && (
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{restaurant.rating}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 