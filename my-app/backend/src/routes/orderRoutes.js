import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
  getOrderHistory
} from '../controllers/orderController.js';
import { getOrderItems, updateOrderItem } from '../controllers/orderItemController.js';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Apply authentication middleware
router.use(authenticate);

// Define routes
router.get('/', async (req, res) => {
  try {
    let orders;
    
    switch (req.user.role) {
      case 'DELIVERYMAN':
        // Get available orders for delivery
        orders = await prisma.order.findMany({
          where: {
            OR: [
              { deliverymanId: null, status: 'PENDING' },
              { deliverymanId: req.user.id }
            ]
          },
          include: {
            restaurant: true,
            deliveryLocation: true,
            orderItems: true
          }
        });
        break;
        
      case 'CUSTOMER':
        // Get user's orders
        orders = await prisma.order.findMany({
          where: { userId: req.user.id },
          include: {
            restaurant: true,
            deliveryLocation: true,
            orderItems: true
          }
        });
        break;
        
      case 'RESTAURANT_OWNER':
        // Get restaurant's orders
        orders = await prisma.order.findMany({
          where: { 
            restaurant: {
              userId: req.user.id
            }
          },
          include: {
            user: true,
            deliveryLocation: true,
            orderItems: true
          }
        });
        break;
        
      default:
        return res.status(403).json({ error: 'Invalid user role' });
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post("/", authorize('CUSTOMER'), createOrder); // Create a new order
router.get("/user", getUserOrders); // Get user's orders
router.get("/history", getOrderHistory); // Get user's order history
router.get("/:id", getOrderById); // Get order by ID
router.put("/:id/status", updateOrderStatus); // Update order status
router.delete("/:id", deleteOrder); // Delete an order by ID

// Order item routes
router.get('/:orderId/items', getOrderItems);
router.put('/items/:id', updateOrderItem);

export default router; 