import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getUserNotifications,
  markAsRead,
  createNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getUserNotifications);
router.put("/:id/read", markAsRead);
router.post("/", createNotification);

export default router; 