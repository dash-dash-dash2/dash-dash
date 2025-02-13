const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createRating,
  getRestaurantRatings,
  updateRating
} = require("../controllers/ratingController");

// Public routes
router.get("/restaurant/:restaurantId", getRestaurantRatings);

// Protected routes
router.use(authenticate);
router.post("/", createRating);
router.put("/:id", updateRating);

module.exports = router; 