const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { 
  registerRestaurantOwner,
  getRestaurantsByOwner,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerProfile,         // Importing getOwnerProfile
  updateOwnerProfile,      // Importing updateOwnerProfile
  addMenu                  // Importing addMenu
} = require('../controllers/restaurantOwnerController');
const { getRestaurantOrders } = require('../controllers/orderController');
// Authenticate all routes below
router.use(authenticate);

// Route for registering a restaurant owner
router.post('/', registerRestaurantOwner);

// Route to get all restaurants by the authenticated owner
router.get("/", getRestaurantsByOwner);

// Route to add a new restaurant
router.post("/add", addRestaurant);

// Route to update an existing restaurant
router.put("/update/:restaurantId", updateRestaurant);
// Add this new route for soft delete
router.put("/soft-delete/:restaurantId", deleteRestaurant);

// Comment out or remove the hard delete route
// router.delete("/delete/:restaurantId", deleteRestaurant);

// Route to get the profile of the authenticated owner
router.get("/profile", getOwnerProfile);

// Route to update the profile of the authenticated owner
router.put("/profile", updateOwnerProfile);

// Route to add a menu item to a restaurant
router.post("/menu/add", addMenu);

// Orders routes
router.get("/orders", getRestaurantOrders);

module.exports = router;
