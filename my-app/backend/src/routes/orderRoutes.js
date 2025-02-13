const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById
} = require("../controllers/orderController");

router.use(authenticate);
router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

module.exports = router; 