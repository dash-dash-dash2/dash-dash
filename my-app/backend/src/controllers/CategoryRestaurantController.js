const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new category-restaurant association
const createCategoryRestaurant = async (req, res) => {
  const { categoryId, restaurantId } = req.body;

  try {
    const parsedCategoryId = parseInt(categoryId, 10);
    const parsedRestaurantId = parseInt(restaurantId, 10);

    if (isNaN(parsedCategoryId) || isNaN(parsedRestaurantId)) {
      return res.status(400).json({ error: "Invalid categoryId or restaurantId. Must be an integer." });
    }

    const categoryRestaurant = await prisma.categoryRestaurant.create({
      data: {
        categoryId: parsedCategoryId,
        restaurantId: parsedRestaurantId,
      },
    });

    res.status(201).json(categoryRestaurant);
  } catch (error) {
    console.error("Failed to create association:", error);
    res.status(500).json({ error: "Failed to create association", details: error.message });
  }
};

// Get all CategoryRestaurant associations
const getAllCategoryRestaurants = async (req, res) => {
  try {
    const categoryRestaurants = await prisma.categoryRestaurant.findMany({
      include: { category: true, restaurant: true },
    });
    res.status(200).json(categoryRestaurants);
  } catch (error) {
    console.error("Error fetching associations:", error);
    res.status(500).json({ error: "Failed to fetch associations", details: error.message });
  }
};

// Get CategoryRestaurant by ID
const getCategoryRestaurantById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const categoryRestaurant = await prisma.categoryRestaurant.findUnique({
      where: { id: parseInt(id) },
      include: { category: true, restaurant: true },
    });
    
    if (!categoryRestaurant) {
      return res.status(404).json({ error: "Association not found" });
    }
    res.status(200).json(categoryRestaurant);
  } catch (error) {
    console.error("Error fetching association:", error);
    res.status(500).json({ error: "Failed to fetch association", details: error.message });
  }
};

// Update CategoryRestaurant association
const updateCategoryRestaurant = async (req, res) => {
  const { id } = req.params;
  const { categoryId, restaurantId } = req.body;

  try {
    const parsedId = parseInt(id, 10);
    const parsedCategoryId = parseInt(categoryId, 10);
    const parsedRestaurantId = parseInt(restaurantId, 10);

    if (isNaN(parsedId) || isNaN(parsedCategoryId) || isNaN(parsedRestaurantId)) {
      return res.status(400).json({ error: "Invalid id, categoryId, or restaurantId. Must be an integer." });
    }

    const updatedAssociation = await prisma.categoryRestaurant.update({
      where: { id: parsedId },
      data: {
        categoryId: parsedCategoryId,
        restaurantId: parsedRestaurantId,
      },
    });

    res.status(200).json(updatedAssociation);
  } catch (error) {
    console.error("Failed to update association:", error);
    res.status(500).json({ error: "Failed to update association", details: error.message });
  }
};

// Delete CategoryRestaurant association
const deleteCategoryRestaurant = async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.categoryRestaurant.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Association deleted successfully" });
  } catch (error) {
    console.error("Error deleting association:", error);
    res.status(500).json({ error: "Failed to delete association", details: error.message });
  }
};

module.exports = {
  createCategoryRestaurant,
  getAllCategoryRestaurants,
  getCategoryRestaurantById,
  updateCategoryRestaurant,
  deleteCategoryRestaurant,
};
