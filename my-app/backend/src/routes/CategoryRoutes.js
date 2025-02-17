const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/CategoryController");

// Apply authentication middleware
router.use(authenticate);

// Define routes
router.post("/", createCategory); // Create a new category
router.get("/", getAllCategories); // Get all categories
router.get("/:id", getCategoryById); // Get category by ID
router.put("/:id", updateCategory); // Update category
router.delete("/:id", deleteCategory); // Delete category

module.exports = router;
