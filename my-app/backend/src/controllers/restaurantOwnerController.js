const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


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
const getRestaurantsByOwner = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is available in the request (e.g., from authentication middleware)

  try {
    // Fetch restaurants owned by the user
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: userId, // Filter by the owner's user ID
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

    // If no restaurants are found, return a 404 error
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ error: "No restaurants found for this owner" });
    }

    // Return the restaurants
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants by owner:", error);
    res.status(500).json({ error: "Failed to fetch restaurants", details: error.message });
  }
};

module.exports = { registerRestaurantOwner , getRestaurantsByOwner}; 