import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new deliveryman
const registerDeliveryman = async (req, res) => {
  const { name, email, password, phone, address, vehicleType } = req.body;

  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and deliveryman in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create user first
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          address,
          role: 'DELIVERYMAN'
        }
      });

      // Create deliveryman with relation to user
      const deliveryman = await prisma.deliveryman.create({
        data: {
          user: {
            connect: { id: user.id }
          },
          vehicleType,
          isAvailable: false
        }
      });

      return { user, deliveryman };
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: result.user.id, role: 'DELIVERYMAN' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "Deliveryman registered successfully",
      token,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register deliveryman" });
  }
};

// Get available orders for delivery
const getAvailableOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: 'ACCEPTED',
        deliverymanId: null
      },
      include: {
        restaurant: {
          select: {
            name: true,
            address: true,
            latitude: true,
            longitude: true
          }
        },
        user: {
          select: {
            name: true,
            address: true,
            phone: true
          }
        },
        orderItems: {
          include: {
            menu: true
          }
        }
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching available orders:', error);
    res.status(500).json({ error: 'Failed to fetch available orders', details: error.message });
  }
};

// Get deliveryman's assigned orders
const getMyOrders = async (req, res) => {
  try {
    // Ensure req.user is defined
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deliveryman = await prisma.deliveryman.findUnique({
      where: { userId: req.user.id }
    });

    if (!deliveryman) {
      return res.status(404).json({ error: "Deliveryman not found" });
    }

    const orders = await prisma.order.findMany({
      where: {
        deliverymanId: deliveryman.id,
        status: {
          in: ['ACCEPTED', 'PICKED_UP', 'DELIVERING']
        }
      },
      include: {
        restaurant: {
          select: {
            name: true,
            address: true,
            latitude: true,
            longitude: true
          }
        },
        user: {
          select: {
            name: true,
            address: true,
            phone: true
          }
        },
        orderItems: {
          include: {
            menu: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching my orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
};

// Accept an order
const acceptOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deliveryman = await prisma.deliveryman.findUnique({
      where: { userId: req.user.id }
    });

    if (!deliveryman) {
      return res.status(404).json({ error: "Deliveryman not found" });
    }

    // Check if order is still available
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: { restaurant: true }
    });

    if (!order || order.deliverymanId) {
      return res.status(400).json({ error: 'Order is no longer available' });
    }

    // Update order with deliveryman
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { 
        deliverymanId: deliveryman.id,
        status: 'ACCEPTED'
      },
      include: {
        restaurant: true,
        user: true
      }
    });

    // Emit socket event
    const io = req.app.get('io');
    io.emit('orderAssigned', orderId);

    // Notify restaurant
    await prisma.notification.create({
      data: {
        userId: order.restaurant.userId,
        orderId: order.id,
        type: 'DRIVER_ASSIGNED',
        message: `Order #${order.id} has been accepted by ${req.user.name}`
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error accepting order:', error);
    res.status(500).json({ error: 'Failed to accept order' });
  }
};

// Toggle availability status
const toggleAvailability = async (req, res) => {
  const { isAvailable } = req.body;

  try {
    const deliveryman = await prisma.deliveryman.findUnique({
      where: { userId: req.user.id }
    });

    if (!deliveryman) {
      return res.status(404).json({ error: "Deliveryman not found" });
    }

    const updated = await prisma.deliveryman.update({
      where: { id: deliveryman.id },
      data: { isAvailable }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
};

// Update current location
const updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const deliveryman = await prisma.deliveryman.findUnique({
      where: { userId: req.user.id }
    });

    if (!deliveryman) {
      return res.status(404).json({ error: "Deliveryman not found" });
    }

    const updated = await prisma.deliveryman.update({
      where: { id: deliveryman.id },
      data: {
        currentLocation: {
          latitude,
          longitude
        }
      }
    });

    // If delivering an order, emit location update
    if (deliveryman.currentOrderId) {
      const io = req.app.get('io');
      io.to(`order-${deliveryman.currentOrderId}`).emit('locationUpdate', {
        orderId: deliveryman.currentOrderId,
        location: { latitude, longitude }
      });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
};

// Get deliveryman profile
const getProfile = async (req, res) => {
  try {
    const profile = await prisma.deliveryman.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export {
  registerDeliveryman,
  getAvailableOrders,
  getMyOrders,
  acceptOrder,
  toggleAvailability,
  updateLocation,
  getProfile
};