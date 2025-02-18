import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
  getOrderHistory
} from '../controllers/orderController.js';
import { getOrderItems, updateOrderItem } from '../controllers/orderItemController.js';

const router = express.Router();

// Apply authentication middleware
router.use(authenticate);

// Define routes
router.post("/", createOrder); // Create a new order
router.get("/user", getUserOrders); // Get user's orders
router.get("/history", getOrderHistory); // Get user's order history
router.get("/:id", getOrderById); // Get order by ID
router.put("/:id/status", updateOrderStatus); // Update order status
router.delete("/:id", deleteOrder); // Delete an order by ID

// Order item routes
router.get('/:orderId/items', getOrderItems);
router.put('/items/:id', updateOrderItem);

export default router; 