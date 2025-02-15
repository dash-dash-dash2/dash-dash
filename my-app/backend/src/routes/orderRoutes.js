const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById
} = require("../controllers/orderController");

// Apply authentication middleware
router.use(authenticate);

// Define routes
router.post("/", createOrder); // Create a new order
router.get("/", getUserOrders); // Get user's orders
router.get("/:id", getOrderById); // Get order by ID
router.put("/:id/status", updateOrderStatus); // Update order status

module.exports = router; 