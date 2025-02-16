const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new order
const createOrder = async (req, res) => {
  const { restaurantId, userId, totalAmount, status, deliverymanId } = req.body; // Accept deliverymanId if needed

  try {
    const parsedRestaurantId = parseInt(restaurantId, 10);
    const parsedUserId = parseInt(userId, 10); // Ensure userId is parsed

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        restaurantId: parsedRestaurantId,
        userId: parsedUserId, // Include userId
        totalAmount: totalAmount, // Include total amount for the order
        status: status || "PENDING", // Default to "PENDING" if not provided
        deliverymanId: deliverymanId || null, // Optional deliverymanId
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  const userId = req.user.id; // Assuming you have user ID from the token

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
        status: 'PENDING', // Filter for orders that are pending
      },
      include: {
        restaurant: true, // Include related restaurant data
        user: true, // Include user if needed
        deliveryman: true, // Include deliveryman if needed
        supplements: true, // Include supplements if needed
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No pending orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    // Fetch the order to update
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Log user role and order details for debugging
    console.log("User Role:", req.user.role);
    console.log("Order Details:", order);

    // Verify authorization based on role and status update
    const userRole = req.user.role;
    if (!isAuthorizedToUpdateStatus(userRole, order, status)) {
      return res.status(403).json({ error: "Not authorized to update this order status" });
    }

    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
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
  const userId = req.user.id; // Assuming you have user ID from the token

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
        status: 'PENDING', // Filter for completed orders
      },
      include: {
        restaurant: true, // Include related restaurant data
        supplements: true, // Include supplements if needed
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No completed orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Failed to fetch order history", details: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
  getOrderHistory
}; 