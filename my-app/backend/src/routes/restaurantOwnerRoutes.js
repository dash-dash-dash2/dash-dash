import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  registerRestaurantOwner,
  getRestaurantsByOwner,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerProfile,
  updateOwnerProfile,
  addMenu
} from '../controllers/restaurantOwnerController.js';
import { getRestaurantOrders } from '../controllers/orderController.js';

const router = express.Router();

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
router.put("/profile", updateOwnerProfile);
router.post("/menu", addMenu);
router.get("/orders", getRestaurantOrders);

export default router;
