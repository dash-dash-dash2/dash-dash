const express = require('express');
const router = express.Router();
const deliverymanController = require('../controllers/deliverymanController');

// Public routes
router.post('/register', deliverymanController.registerDeliveryman);

// Protected routes
router.get('/available-orders', deliverymanController.getAvailableOrders);
router.get('/my-orders', deliverymanController.getMyOrders);
router.post('/accept-order/:orderId', deliverymanController.acceptOrder);
router.post('/toggle-availability', deliverymanController.toggleAvailability);
router.get('/profile', deliverymanController.getProfile);
router.put('/location', deliverymanController.updateLocation);

module.exports = router;