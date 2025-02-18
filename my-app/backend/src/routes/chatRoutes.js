import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getOrderChats,
  getChatHistory,
  sendMessage
} from "../controllers/chatController.js";

const router = express.Router();

router.use(authenticate);

// Get chat history for a specific order
router.get("/order/:orderId", getOrderChats);

// Get all chat history for the authenticated user
router.get("/history", getChatHistory);

// Send a new message
router.post("/message", sendMessage);

export default router; 