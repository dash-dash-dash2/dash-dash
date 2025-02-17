const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new order
const createOrder = async (req, res) => {
  const { restaurantId, items, totalAmount, deliveryCost } = req.body;
  const userId = req.user.id;

  try {
    // Create the order with a transaction
    const order = await prisma.$transaction(async (prisma) => {
      // Create the main order
      const newOrder = await prisma.order.create({
        data: {
          userId,
          restaurantId: parseInt(restaurantId),
          totalAmount,
          status: "PENDING",
          deliveryCost: deliveryCost || 5,
          orderItems: {
            create: items.map(item => ({
              menuId: parseInt(item.menuId),
              quantity: item.quantity,
              price: parseFloat(item.price),
            }))
          }
        },
        include: {
          orderItems: {
            include: {
              menu: true
            }
          },
          restaurant: true
        }
      });

      // Create order history entry
      await prisma.orderHistory.create({
        data: {
          orderId: newOrder.id,
          status: "PENDING",
          updatedAt: new Date()
        }
      });

      return newOrder;
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ 
      error: "Failed to create order",
      details: error.message 
    });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        restaurant: true,
        orderItems: {
          include: {
            menu: true
          }
        },
        deliveryman: {
          include: {
            user: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { 
        restaurant: true,
        user: true 
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        restaurant: true,
        user: true
      }
    });

    // Get Socket.IO instance
    const io = req.app.get('io');
    
    // Emit event to all connected clients
    io.emit('orderStatusUpdate', {
      orderId: order.id,
      status,
      restaurantId: order.restaurantId,
      message: `Order #${order.id} status updated to ${status}`
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Authorization logic for updating order status
const isAuthorizedToUpdateStatus = (userRole, order, newStatus) => {
  switch (userRole) {
    case 'RESTAURANT_OWNER':
      return ['ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP'].includes(newStatus);
    case 'DELIVERYMAN':
      return ['PICKED_UP', 'DELIVERING', 'DELIVERED'].includes(newStatus);
    case 'ADMIN':
      return true; // Admin can update any status
    default:
      return false; // Other roles are not authorized
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        restaurant: true,
        user: true,
        deliveryman: true,
        supplements: true,
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check authorization
    if (order.userId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Failed to fetch order", details: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // First, delete related records (e.g., chats, notifications)
    await prisma.chat.deleteMany({
      where: { orderId: parseInt(id) },
    });

    await prisma.notification.deleteMany({
      where: { orderId: parseInt(id) },
    });

    // Now delete the order
    const order = await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order", details: error.message });
  }
};

// Get user's order history
const getOrderHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
        status: "PENDING"
      },
      include: {
        restaurant: true,
        orderItems: {
          include: {
            menu: true
          }
        },
        user: true,
        deliveryman: {
          include: {
            user: true
          }
        },
        orderHistories: true,
        payments: true,
        chats: true,
        notifications: true
      }
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
};

const getRestaurantOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get restaurants owned by this user
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: userId
      }
    });

    const restaurantIds = restaurants.map(r => r.id);

    // Get orders for these restaurants
    const orders = await prisma.order.findMany({
      where: {
        restaurantId: {
          in: restaurantIds
        }
      },
      include: {
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
        },
        deliveryman: {
          include: {
            user: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching restaurant orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
  getOrderHistory,
  getRestaurantOrders
}; 