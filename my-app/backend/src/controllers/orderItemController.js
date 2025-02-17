const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get order items for a specific order
const getOrderItems = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: parseInt(orderId)
      },
      include: {
        menu: true
      }
    });

    res.status(200).json(orderItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Failed to fetch order items" });
  }
};

// Update order item quantity
const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const orderItem = await prisma.orderItem.update({
      where: {
        id: parseInt(id)
      },
      data: {
        quantity: parseInt(quantity)
      },
      include: {
        menu: true
      }
    });

    res.status(200).json(orderItem);
  } catch (error) {
    console.error("Error updating order item:", error);
    res.status(500).json({ error: "Failed to update order item" });
  }
};

module.exports = {
  getOrderItems,
  updateOrderItem
}; 