const express = require('express');
const { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant } = require('../controllers/restaurantController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Protected routes
router.use(authenticate);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);

module.exports = router; 