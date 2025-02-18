import { PrismaClient } from '@prisma/client';
import { clearCache } from '../middleware/cacheMiddleware.js';
import cacheService from '../services/cacheService.js';
import geolib from 'geolib';
import dbManager from '../utils/dbConnectionManager.js';

const prisma = new PrismaClient();

// Create restaurant
const createRestaurant = async (req, res) => {
  const { name, cuisineType, location } = req.body;
  const userId = req.user.id;

  try {
    const result = await dbManager.withTransaction(async (prisma) => {
      const restaurant = await prisma.restaurant.create({
        data: {
          name,
          cuisineType,
          location,
          userId
        }
      });

      await prisma.audit.create({
        data: {
          action: 'CREATE_RESTAURANT',
          userId,
          restaurantId: restaurant.id
        }
      });

      return restaurant;
    });

    // Clear the restaurants cache when a new restaurant is created
    clearCache('restaurants');
    
    res.status(201).json(result);
  } catch (error) {
    console.error("Restaurant creation error:", error);
    res.status(500).json({ error: "Failed to create restaurant" });
  }
};

// Get all restaurants with connection pooling
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await dbManager.executeWithRetry(async () => {
      return dbManager.prisma.restaurant.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          menus: true
        }
      });
    });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Restaurant fetch error:", error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// Get all restaurants near user's location
const getNearbyRestaurants = async (req, res) => {
  const { latitude, longitude } = req.query; // Get latitude and longitude from query parameters

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  try {
    // Fetch all restaurants from the database
    const restaurants = await prisma.restaurant.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    let distance = 5000; // Initial distance in meters
    let nearbyRestaurants = [];

    // Function to filter restaurants based on distance
    const filterRestaurantsByDistance = (distance) => {
      return restaurants.filter(restaurant => {
        const [lat, lon] = restaurant.location.split(',').map(Number); // Convert location string to numbers
        const calculatedDistance = geolib.getDistance(
          { latitude: Number(latitude), longitude: Number(longitude) },
          { latitude: lat, longitude: lon }
        );
        return calculatedDistance <= distance; // Check if within the specified distance
      });
    };

    // Search for restaurants until found or maximum distance reached
    while (nearbyRestaurants.length === 0 && distance <= 20000) { // Maximum distance of 20 km
      nearbyRestaurants = filterRestaurantsByDistance(distance);
      distance += 5000; // Increase distance by 5000 meters
    }

    res.status(200).json(nearbyRestaurants);
  } catch (error) {
    console.error("Nearby restaurants fetch error:", error);
    res.status(500).json({ error: "Failed to fetch nearby restaurants", details: error.message });
  }
};

// Clear restaurant cache when updating
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { name, cuisineType, location } = req.body;

  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: { name, cuisineType, location }
    });

    // Clear all restaurant-related caches
    cacheService.clearNamespace('restaurants');

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Restaurant update error:", error);
    res.status(500).json({ error: "Failed to update restaurant", details: error.message });
  }
};

export {
  createRestaurant,
  getAllRestaurants,
  getNearbyRestaurants,
  updateRestaurant
}; 