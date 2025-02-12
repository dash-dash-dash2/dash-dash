const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  const { userId, restaurantId, deliverymanId, totalAmount } = req.body;

  if (!userId || !restaurantId || !totalAmount) {
    return res.status(400).json({ error: "User ID, restaurant ID, and total amount are required." });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        deliverymanId,
        totalAmount,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        restaurant: true,
        deliveryman: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        user: true,
        restaurant: true,
        deliveryman: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order", details: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status, deliverymanId } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        status,
        deliverymanId,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order", details: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    await prisma.order.delete({
      where: { id: parseInt(orderId) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order", details: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
}; 