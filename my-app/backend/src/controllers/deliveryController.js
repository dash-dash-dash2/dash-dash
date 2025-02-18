import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get available orders for delivery
const getAvailableOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: 'READY_FOR_PICKUP',
        deliverymanId: null
      },
      include: {
        Restaurant: {
          include: {
            User: {
              select: {
                name: true,
                address: true
              }
            }
          }
        },
        User: {
          select: {
            address: true
          }
        }
      }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Available orders fetch error:", error);
    res.status(500).json({ error: "Failed to fetch available orders", details: error.message });
  }
};

// Accept delivery
const acceptDelivery = async (req, res) => {
  const { orderId } = req.params;
  const deliverymanId = req.user.id;

  try {
    // Check if deliveryman is available
    const deliveryman = await prisma.deliveryman.findUnique({
      where: { userId: deliverymanId }
    });

    if (!deliveryman.isAvailable) {
      return res.status(400).json({ error: "Deliveryman is not available" });
    }

    // Update order with deliveryman
    const order = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        deliverymanId: deliveryman.id,
        status: 'PICKED_UP'
      },
      include: {
        Restaurant: {
          include: {
            User: {
              select: {
                name: true,
                address: true
              }
            }
          }
        },
        User: {
          select: {
            name: true,
            address: true
          }
        }
      }
    });

    // Update deliveryman availability
    await prisma.deliveryman.update({
      where: { id: deliveryman.id },
      data: { isAvailable: false }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        orderId: parseInt(orderId),
        deliverymanId: deliveryman.id,
        message: `Order #${orderId} has been picked up by ${req.user.name}`
      }
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Delivery acceptance error:", error);
    res.status(500).json({ error: "Failed to accept delivery", details: error.message });
  }
};

// Update delivery status
const updateDeliveryStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, location } = req.body;
  const deliverymanId = req.user.id;

  try {
    const order = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        status,
        deliveryLocation: location
      },
      include: {
        Restaurant: true,
        User: {
          select: {
            name: true,
            address: true
          }
        }
      }
    });

    // If delivery is completed, update deliveryman availability
    if (status === 'DELIVERED') {
      await prisma.deliveryman.update({
        where: { userId: deliverymanId },
        data: { isAvailable: true }
      });
    }

    // Create order history entry
    await prisma.orderHistory.create({
      data: {
        orderId: parseInt(orderId),
        status,
        location: location || undefined
      }
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Delivery status update error:", error);
    res.status(500).json({ error: "Failed to update delivery status", details: error.message });
  }
};

// Get deliveryman's current orders
const getCurrentDeliveries = async (req, res) => {
  const deliverymanId = req.user.id;

  try {
    const deliveryman = await prisma.deliveryman.findUnique({
      where: { userId: deliverymanId }
    });

    const orders = await prisma.order.findMany({
      where: {
        deliverymanId: deliveryman.id,
        status: {
          in: ['PICKED_UP', 'DELIVERING']
        }
      },
      include: {
        Restaurant: {
          include: {
            User: {
              select: {
                name: true,
                address: true
              }
            }
          }
        },
        User: {
          select: {
            name: true,
            address: true,
            phone: true
          }
        },
        OrderHistory: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Current deliveries fetch error:", error);
    res.status(500).json({ error: "Failed to fetch current deliveries", details: error.message });
  }
};

export {
  getAvailableOrders,
  acceptDelivery,
  updateDeliveryStatus,
  getCurrentDeliveries
}; 