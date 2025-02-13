const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant
} = require('../controllers/restaurantController');

// Cache GET requests for 5 minutes (300 seconds)
router.get('/', cacheMiddleware(300), getAllRestaurants);
router.get('/:id', cacheMiddleware(300), getRestaurantById);

// No cache for mutations
router.post('/', authenticate, createRestaurant);
router.put('/:id', authenticate, updateRestaurant);

module.exports = router; 