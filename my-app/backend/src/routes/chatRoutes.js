const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  getChatHistory,
  sendMessage,
  getOrderChats
} = require("../controllers/chatController");

router.use(authenticate);

// Get chat history for a specific order
router.get("/order/:orderId", getOrderChats);

// Get all chat history for the authenticated user
router.get("/history", getChatHistory);

// Send a new message
router.post("/send", sendMessage);

module.exports = router; 