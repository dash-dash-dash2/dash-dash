import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
};

// Ban a user
const banUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { banned: true }
    });
    res.status(200).json({ message: `User ${user.name} has been banned.` });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ error: "Failed to ban user", details: error.message });
  }
};

// Unban a user
const unbanUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { banned: false }
    });
    res.status(200).json({ message: `User ${user.name} has been unbanned.` });
  } catch (error) {
    console.error("Error unbanning user:", error);
    res.status(500).json({ error: "Failed to unban user", details: error.message });
  }
};

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        cuisineType: true,
        location: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Failed to fetch restaurants", details: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details", details: error.message });
  }
};

// Delete restaurant
const deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    await prisma.restaurant.delete({
      where: { id: parseInt(restaurantId) },
    });
    res.status(200).json({ message: "Restaurant deleted successfully." });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Failed to delete restaurant", details: error.message });
  }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(restaurantId) },
      select: {
        id: true,
        name: true,
        cuisineType: true,
        location: true,
      }
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ error: "Failed to fetch restaurant details", details: error.message });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { role },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Failed to update user role", details: error.message });
  }
};

// Get user growth data
const getUserGrowthData = async (req, res) => {
  try {
    const userGrowthData = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const formattedData = userGrowthData.map(item => ({
      month: item.createdAt.toISOString().slice(0, 7),
      count: item._count.id,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    res.status(500).json({ error: "Failed to fetch user growth data", details: error.message });
  }
};

export {
  getAllUsers,
  getAllRestaurants,
  banUser,
  unbanUser,
  getUserById,
  deleteRestaurant,
  getRestaurantById,
  updateUserRole,
  getUserGrowthData
};