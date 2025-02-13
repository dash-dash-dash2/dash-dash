const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  getAvailableOrders,
  acceptDelivery,
  updateDeliveryStatus,
  getCurrentDeliveries
} = require("../controllers/deliveryController");

router.use(authenticate);
router.get("/available", getAvailableOrders);
router.get("/current", getCurrentDeliveries);
router.post("/:orderId/accept", acceptDelivery);
router.put("/:orderId/status", updateDeliveryStatus);

module.exports = router; 