const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware"); // Import authentication middleware
const { authorizeAdmin } = require("../middleware/adminMiddleware");
const {
  getAllUsers,
  getAllRestaurants,
  banUser,
  unbanUser,
  getUserById,
  deleteRestaurant,
  addRestaurant,
  updateRestaurant,
  getRestaurantById,
  updateUserRole,
  getUserGrowthData
} = require("../controllers/adminController");

// Protected admin routes
router.use(authenticate); // Apply authentication middleware first
router.use(authorizeAdmin); // Then apply admin authorization middleware

router.get("/users", getAllUsers); // Get all users
router.get("/users/:userId", getUserById); // Ensure this route is correctly defined
router.put("/users/:userId/role", updateUserRole);
router.get("/restaurants", getAllRestaurants); // Get all restaurants
router.get("/restaurants/:restaurantId", getRestaurantById);
router.post("/restaurants", addRestaurant);
router.put("/restaurants/:restaurantId", updateRestaurant);
router.delete("/restaurants/:restaurantId", deleteRestaurant);
router.put("/users/:userId/ban", banUser); // Ban a user
router.put("/users/:userId/unban", unbanUser); // Unban a user
// router.get("/users/growth", getUserGrowthData);

// Add more admin routes as needed...

module.exports = router; 