const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createPayment,
  getPaymentStatus,
  getPaymentHistory,
  processCashPayment,
  confirmPayment
} = require("../controllers/paymentController");

// Public route for Stripe webhook
// router.post("/webhook", express.raw({ type: 'application/json' }), processStripeWebhook);

// Protected routes
router.use(authenticate);

// Create a new payment
router.post("/create", createPayment);

// Get payment status
router.get("/status/:paymentId", getPaymentStatus);

// Get payment history
router.get("/history", getPaymentHistory);

router.post("/orders/confirm-payment", confirmPayment);

// Route for cash payment
router.post("/cash", processCashPayment);

module.exports = router; 