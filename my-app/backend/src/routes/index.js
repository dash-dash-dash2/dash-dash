import express from 'express';
import userRoutes from './userRoutes.js';
import menuRoutes from './menuRoutes.js';
import orderRoutes from './orderRoutes.js';
import deliveryRoutes from './deliveryRoutes.js';
import ratingRoutes from './ratingRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import chatRoutes from './chatRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import deliverymanRoutes from './deliverymanRoutes.js';
import restaurantOwnerRoutes from './restaurantOwnerRoutes.js';
import adminRoutes from './adminRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';

const router = express.Router();

// Mount all routes
router.use('/users', userRoutes);
router.use('/menus', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/delivery', deliveryRoutes);
router.use('/ratings', ratingRoutes);
router.use('/notifications', notificationRoutes);
router.use('/chat', chatRoutes);
router.use('/payments', paymentRoutes);
router.use('/deliveryman', deliverymanRoutes);
router.use('/restaurant-owner', restaurantOwnerRoutes);
router.use('/admin', adminRoutes);
router.use('/restaurants', restaurantRoutes);

export default router; 