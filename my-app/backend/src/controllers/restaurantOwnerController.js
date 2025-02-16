import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Register a new restaurant owner
const registerRestaurantOwner = async (req, res) => {
  const { name, email, password, phone, restaurantName, cuisineType, location } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'RESTAURANT_OWNER',
        restaurant: {
          create: {
            name: restaurantName,
            cuisineType,
            location,
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register restaurant owner' });
  }
};

// Get all restaurants by the authenticated owner
const getRestaurantsByOwner = async (req, res) => {
  const userId = req.user.id;

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        cuisineType: true,
        location: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        menus: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            price: true,
          },
        },
        ratings: {
          select: {
            id: true,
            score: true,
            comment: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ error: "No restaurants found for this owner" });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants by owner:", error);
    res.status(500).json({ error: "Failed to fetch restaurants", details: error.message });
  }
};

// Add a new restaurant for an authenticated owner
const addRestaurant = async (req, res) => {
  const userId = req.user?.id; // Ensure userId is available
  console.log("User ID from request:", userId);
  console.log("Request body:", req.body);

  const { name, cuisineType, location, imageUrl } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const owner = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!owner || owner.role !== "RESTAURANT_OWNER") {
      return res.status(403).json({ error: "Only restaurant owners can add restaurants" });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        cuisineType,
        location,
        imageUrl,
        userId,
      },
    });

    console.log("Restaurant created successfully:", restaurant);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "Failed to add restaurant", details: error.message });
  }
};

// Update an existing restaurant
const updateRestaurant = async (req, res) => {
  const userId = req.user.id;
  const { restaurantId } = req.params;
  const { name, cuisineType, location, imageUrl } = req.body;

  try {
    // Ensure the restaurant exists and belongs to the authenticated owner
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(restaurantId) },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this restaurant' });
    }

    // Update the restaurant details
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: Number(restaurantId) },
      data: {
        name: name || restaurant.name,
        cuisineType: cuisineType || restaurant.cuisineType,
        location: location || restaurant.location,
        imageUrl: imageUrl || restaurant.imageUrl,
      },
    });

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant', details: error.message });
  }
};

// Delete a restaurant
const deleteRestaurant = async (req, res) => {
  const userId = req.user.id;
  const { restaurantId } = req.params;

  try {
    // Ensure the restaurant exists and belongs to the authenticated owner
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(restaurantId) },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this restaurant' });
    }

    // Delete the restaurant
    await prisma.restaurant.delete({
      where: { id: Number(restaurantId) },
    });

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant', details: error.message });
  }
};

// Get owner profile
const getOwnerProfile = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        location: true,
        imageUrl: true,
        role: true,
        banned: true
      }
    });

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    res.status(200).json(owner);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Failed to fetch profile", details: error.message });
  }
};

// Update owner profile
const updateOwnerProfile = async (req, res) => {
  const ownerId = req.user.id;
  const { name, email, phone, address, location, imageUrl } = req.body;

  try {
    // Check if owner exists
    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    // Update profile information
    const updatedOwner = await prisma.user.update({
      where: { id: ownerId },
      data: {
        name,
        email,
        phone,
        address,
        location,
        imageUrl
      }
    });

    res.status(200).json(updatedOwner);
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Failed to update profile", details: error.message });
  }
};

// Add a menu to a restaurant
const addMenu = async (req, res) => {
  const userId = req.user.id; // Authenticated owner's ID
  const { restaurantId, name, imageUrl, price } = req.body;

  try {
    // Check if the restaurant exists and belongs to the authenticated owner
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(restaurantId) },
      select: { userId: true },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to add a menu to this restaurant' });
    }

    // Create the menu item
    const menu = await prisma.menu.create({
      data: {
        name,
        imageUrl,
        price,
        restaurantId: Number(restaurantId),
      },
    });

    res.status(201).json(menu);
  } catch (error) {
    console.error('Error adding menu:', error);
    res.status(500).json({ error: 'Failed to add menu', details: error.message });
  }
};

// Add a category to a restaurant
const addCategoryToRestaurant = async (req, res) => {
  const userId = req.user.id; // Authenticated owner's ID
  const { restaurantId, categoryId } = req.body;

  try {
    // Check if the restaurant exists and belongs to the authenticated owner
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(restaurantId) },
      select: { userId: true },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to modify this restaurant' });
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Associate the category with the restaurant
    const categoryRestaurant = await prisma.categoryRestaurant.create({
      data: {
        categoryId: Number(categoryId),
        restaurantId: Number(restaurantId),
      },
    });

    res.status(201).json(categoryRestaurant);
  } catch (error) {
    console.error('Error adding category to restaurant:', error);
    res.status(500).json({ error: 'Failed to add category', details: error.message });
  }
};

// Export all functions
export {
  registerRestaurantOwner,
  getRestaurantsByOwner,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerProfile,
  updateOwnerProfile,
  addMenu,
  addCategoryToRestaurant, // Add this
};