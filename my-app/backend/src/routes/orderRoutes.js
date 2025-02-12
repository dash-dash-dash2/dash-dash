const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/",  createOrder); // Create a new order
router.get("/",  getAllOrders); // Get all orders
router.get("/:orderId",  getOrderById); // Get a single order by ID
router.put("/:orderId",  updateOrder); // Update an order
router.delete("/:orderId",  deleteOrder); // Delete an order

module.exports = router; 