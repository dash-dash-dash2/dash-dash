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

// Routes
router.post('/register', registerRestaurantOwner);
router.get("/restaurants", getRestaurantsByOwner);
router.post("/restaurants", addRestaurant);
router.put("/restaurants/:id", updateRestaurant);
router.delete("/restaurants/:id", deleteRestaurant);
router.get("/profile", getOwnerProfile);
router.put("/profile", updateOwnerProfile);
router.post("/menu", addMenu);
router.get("/orders", getRestaurantOrders);

export default router;
