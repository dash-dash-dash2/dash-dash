const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");
const chatLimiter = require('../middleware/rateLimiter');

// Apply authentication middleware
router.use(authenticate);

// Apply rate limiting
router.use(chatLimiter);

// Routes
router.get("/history", chatController.getChatHistory);
router.get("/order/:orderId", chatController.getOrderChats);
router.post("/send", chatController.sendMessage);

module.exports = router; 