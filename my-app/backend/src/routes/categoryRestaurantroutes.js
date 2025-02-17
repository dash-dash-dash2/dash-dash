const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createCategoryRestaurant,
  getAllCategoryRestaurants,
  getCategoryRestaurantById,
  updateCategoryRestaurant,
  deleteCategoryRestaurant
} = require("../controllers/CategoryRestaurantController");

// Apply authentication middleware
router.use(authenticate);

// Define routes
router.post("/", createCategoryRestaurant); // Create a new category-restaurant relation
router.get("/", getAllCategoryRestaurants); // Get all category-restaurant relations
router.get("/:id", getCategoryRestaurantById); // Get a category-restaurant relation by ID
router.put("/:id", updateCategoryRestaurant); // Update a category-restaurant relation
router.delete("/:id", deleteCategoryRestaurant); // Delete a category-restaurant relation

module.exports = router;
