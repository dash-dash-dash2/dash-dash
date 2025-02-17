import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  updateProfile,
  getUserProfile
} from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.use(authenticate);
router.get("/profile", getUserProfile);
router.put("/profile", updateProfile);

export default router;