import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getAvailableOrders,
  acceptDelivery,
  updateDeliveryStatus,
  getCurrentDeliveries
} from '../controllers/deliveryController.js';

const router = express.Router();

router.use(authenticate);
router.get("/available", getAvailableOrders);
router.get("/current", getCurrentDeliveries);
router.post("/:orderId/accept", acceptDelivery);
router.put("/:orderId/status", updateDeliveryStatus);

export default router; 