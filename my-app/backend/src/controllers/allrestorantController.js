const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Create a new restaurant
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const createRestaurant = async (req, res) => {
  try {
    const { name, cuisineType, location, userId } = req.body;
    const restaurant = await prisma.restaurant.create({
      data: { name, cuisineType, location, userId },
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

/**
 * Get all restaurants
 */
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

/**
 * Get a restaurant by ID
 */
const getRestaurantById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant", error });
  }
};

/**
 * Update a restaurant
 */
const updateRestaurant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, cuisineType, location } = req.body;
    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { name, cuisineType, location },
    });

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

/**
 * Delete a restaurant
 */
const deleteRestaurant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.restaurant.delete({ where: { id } });

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
