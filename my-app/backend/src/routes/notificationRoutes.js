const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  getUserNotifications,
  markAsRead,
  createNotification
} = require("../controllers/notificationController");

router.use(authenticate);
router.get("/", getUserNotifications);
router.put("/:id/read", markAsRead);
router.post("/", createNotification);

module.exports = router; 