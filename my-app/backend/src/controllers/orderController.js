const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new order
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { restaurantId, items, deliveryAddress, totalAmount } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        status: 'PENDING',
        totalAmount,
        deliveryAddress,
        OrderItems: {
          create: items.map(item => ({
            foodId: item.foodId,
            quantity: item.quantity,
            price: item.price,
            supplements: item.supplements || []
          }))
        }
      },
      include: {
        OrderItems: {
          include: {
            Food: true
          }
        },
        Restaurant: {
          include: {
            User: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        }
      }
    });

    // Create order history entry
    await prisma.orderHistory.create({
      data: {
        orderId: order.id,
        status: 'PENDING',
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  const userId = req.user.id; 
  const { status } = req.query;

  try {
    const where = { userId };
    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        OrderItems: {
          include: {
            Food: true
          }
        },
        Restaurant: {
          include: {
            User: {
              select: {
                name: true
              }
            }
          }
        },
        Deliveryman: {
          include: {
            User: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        },
        OrderHistory: {
          orderBy: {
            updatedAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        Restaurant: true,
        Deliveryman: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Verify authorization based on role and status update
    const userRole = req.user.role;
    if (!isAuthorizedToUpdateStatus(userRole, order, status)) {
      return res.status(403).json({ error: "Not authorized to update this order status" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        OrderItems: {
          include: {
            Food: true
          }
        },
        Restaurant: {
          include: {
            User: {
              select: {
                name: true
              }
            }
          }
        },
        Deliveryman: {
          include: {
            User: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        }
      }
    });

    // Create order history entry
    await prisma.orderHistory.create({
      data: {
        orderId: order.id,
        status,
      }
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Order update error:", error);
    res.status(500).json({ error: "Failed to update order", details: error.message });
  }
};

// Helper function to check authorization for status updates
const isAuthorizedToUpdateStatus = (userRole, order, newStatus) => {
  switch (userRole) {
    case 'RESTAURANT_OWNER':
      return ['ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP'].includes(newStatus);
    case 'DELIVERYMAN':
      return ['PICKED_UP', 'DELIVERING', 'DELIVERED'].includes(newStatus);
    case 'ADMIN':
      return true;
    default:
      return false;
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
        OrderItems: {
          include: {
            Food: true
          }
        },
        Restaurant: {
          include: {
            User: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        },
        Deliveryman: {
          include: {
            User: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        },
        OrderHistory: {
          orderBy: {
            updatedAt: 'desc'
          }
        },
        Chat: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check authorization
    if (order.userId !== userId && 
        req.user.role !== 'ADMIN' && 
        order.Restaurant?.userId !== userId && 
        order.Deliveryman?.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Failed to fetch order", details: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById
}; 