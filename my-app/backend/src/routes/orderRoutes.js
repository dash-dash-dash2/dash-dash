const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
  getOrderHistory
} = require("../controllers/orderController");
const orderItemController = require('../controllers/orderItemController');

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
router.get('/:orderId/items', orderItemController.getOrderItems);
router.put('/items/:id', orderItemController.updateOrderItem);

module.exports = router; 