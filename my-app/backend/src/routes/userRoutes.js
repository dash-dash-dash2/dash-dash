import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePassword
} from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.use(authenticate);

// Get user profile
router.get('/profile', getProfile);

// Update user profile
router.put('/profile', updateProfile);

// Update password
router.put('/password', updatePassword);

export default router;