import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createPayment,
  getPaymentStatus,
  getPaymentHistory,
  processStripeWebhook
} from "../controllers/paymentController.js";

const router = express.Router();

// Public route for Stripe webhook
router.post("/webhook", express.raw({ type: 'application/json' }), processStripeWebhook);

// Protected routes
router.use(authenticate);

// Create a new payment
router.post("/", createPayment);

// Get payment status
router.get("/status/:paymentId", getPaymentStatus);

// Get payment history
router.get("/history", getPaymentHistory);

export default router; 