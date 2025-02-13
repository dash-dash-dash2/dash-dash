"use client";

import { useRestaurants } from "@/context/RestaurantContext";
import { Card } from "@/components/ui/card";
import { Building2, DollarSign, ListOrdered, MenuSquare } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { restaurants, loading, error } = useRestaurants();

  if (loading) return <div>Loading restaurants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-red-500" />
          <span className="font-semibold text-lg">RestaurantOS</span>
        </div>
        <nav className="space-y-1 px-2">
          {[
            { name: "Dashboard", icon: Building2, active: true },
            { name: "Restaurants", icon: Building2 },
            { name: "Categories", icon: ListOrdered },
            { name: "Menu Items", icon: MenuSquare },
            { name: "Analytics", icon: DollarSign },
            { name: "Settings", icon: MenuSquare },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm rounded-lg",
                item.active
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Restaurants</p>
                  <p className="text-2xl font-semibold">{restaurants.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-semibold">$0.00</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <ListOrdered className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categories</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <MenuSquare className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Menu Items</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Restaurants List */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">My Restaurants</h2>
              <div className="space-y-4">
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{restaurant.name}</h3>
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                            {restaurant.averageRating|| "Inactive"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {restaurant.cuisineType
                          }
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {restaurant.address}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No restaurants found.
                  </p>
                )}
              </div>
            </Card>

            {/* Revenue Chart */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
              <div className="h-[300px] flex items-end gap-4">
                {[60, 80, 40, 50, 70, 90, 30].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-red-500 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i}>Day {i + 1}</div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
