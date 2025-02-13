const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create restaurant
const createRestaurant = async (req, res) => {
  const userId = req.user.id;
  const { name, cuisineType, location } = req.body;

  try {
    // Check if user already has a restaurant
    const existingRestaurant = await prisma.restaurant.findFirst({
      where: { userId }
    });

    if (existingRestaurant) {
      return res.status(400).json({ error: "User already has a restaurant" });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        cuisineType,
        location,
        user: {
          connect: {
            id: userId
          }
        }
      },
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

    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Restaurant creation error:", error);
    res.status(500).json({ error: "Failed to create restaurant", details: error.message });
  }
};

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  const { cuisine, search } = req.query;
  
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        AND: [
          cuisine ? { cuisineType: cuisine } : {},
          search ? {
            OR: [
              { name: { contains: search } },
              { cuisineType: { contains: search } }
            ]
          } : {}
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        menus: true,
        ratings: {
          select: {
            score: true
          }
        }
      }
    });

    // Calculate average rating for each restaurant
    const restaurantsWithRating = restaurants.map(restaurant => ({
      ...restaurant,
      averageRating: restaurant.ratings.length > 0
        ? restaurant.ratings.reduce((acc, curr) => acc + curr.score, 0) / restaurant.ratings.length
        : 0
    }));

    res.status(200).json(restaurantsWithRating);
  } catch (error) {
    console.error("Restaurants fetch error:", error);
    res.status(500).json({ error: "Failed to fetch restaurants", details: error.message });
  }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        menus: {
          include: {
            foods: true
          }
        },
        ratings: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Calculate average rating
    const averageRating = restaurant.ratings.length > 0
      ? restaurant.ratings.reduce((acc, curr) => acc + curr.score, 0) / restaurant.ratings.length
      : 0;

    res.status(200).json({ ...restaurant, averageRating });
  } catch (error) {
    console.error("Restaurant fetch error:", error);
    res.status(500).json({ error: "Failed to fetch restaurant", details: error.message });
  }
};

// Update restaurant
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { name, cuisineType, location } = req.body;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) }
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (restaurant.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to update this restaurant" });
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: {
        name,
        cuisineType,
        location
      },
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

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Restaurant update error:", error);
    res.status(500).json({ error: "Failed to update restaurant", details: error.message });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant
}; 