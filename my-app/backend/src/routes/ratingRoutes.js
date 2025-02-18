import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createRating,
  getRestaurantRatings,
  updateRating
} from "../controllers/ratingController.js";

const router = express.Router();

// Public routes
router.get("/restaurant/:restaurantId", getRestaurantRatings);

// Protected routes
router.use(authenticate);
router.post("/", createRating);
router.put("/:id", updateRating);

export default router; 