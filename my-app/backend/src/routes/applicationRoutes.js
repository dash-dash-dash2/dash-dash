import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  getApplicationStatus
} from '../controllers/applicationController.js';

const router = express.Router();

// Protected routes
router.use(authenticate);

// User routes
router.post('/submit', submitApplication);
router.get('/status', getApplicationStatus);

// Admin routes
router.get('/all', authorize(['ADMIN']), getAllApplications);
router.put('/:id/status', authorize(['ADMIN']), updateApplicationStatus);

export default router; 