const express = require("express");
const { getChatHistory, initiateChat } = require("../controllers/chatController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Get chat history for an order
router.get("/:orderId", authenticate, getChatHistory);

// Initiate a chat
router.post("/initiate", authenticate, initiateChat);

module.exports = router;