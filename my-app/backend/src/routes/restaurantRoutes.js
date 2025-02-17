import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';
import {
  createRestaurant,
  getAllRestaurants,
  // getRestaurantById,
  updateRestaurant,
  getNearbyRestaurants
} from '../controllers/restaurantController.js';

const router = express.Router();

// Cache GET requests for 5 minutes (300 seconds)
router.get('/', cacheMiddleware(300), getAllRestaurants);
// router.get('/:id', cacheMiddleware(300), getRestaurantById);

// Public route for nearby restaurants
router.get('/nearby', getNearbyRestaurants);

// Protected routes
router.use(authenticate);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);

export default router; 