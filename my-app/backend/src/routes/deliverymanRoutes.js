import express from 'express';
import {
  registerDeliveryman,
  getAvailableOrders,
  getMyOrders,
  acceptOrder,
  toggleAvailability,
  getProfile,
  updateLocation
} from '../controllers/deliverymanController.js';

const router = express.Router();

// Public routes
router.post('/register', registerDeliveryman);

// Protected routes
router.get('/available-orders', getAvailableOrders);
router.get('/my-orders', getMyOrders);
router.post('/accept-order/:orderId', acceptOrder);
router.post('/toggle-availability', toggleAvailability);
router.get('/profile', getProfile);
router.put('/location', updateLocation);

export default router;