import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';
import {
  getAllUsers,
  getAllRestaurants,
  banUser,
  unbanUser,
  getUserById,
  deleteRestaurant,
  getRestaurantById,
  updateUserRole,
  getUserGrowthData
} from '../controllers/adminController.js';

const router = express.Router();

// Protected admin routes
router.use(authenticate);
router.use(authorizeAdmin);

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId/role", updateUserRole);
router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:restaurantId", getRestaurantById);
router.delete("/restaurants/:restaurantId", deleteRestaurant);
router.put("/users/:userId/ban", banUser);
router.put("/users/:userId/unban", unbanUser);
router.get("/users/growth", getUserGrowthData);

export default router; 