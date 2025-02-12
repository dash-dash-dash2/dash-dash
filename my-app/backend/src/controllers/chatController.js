const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get chat history for an order
const getChatHistory = async (req, res) => {
  const { orderId } = req.params;

  try {
    const chats = await prisma.chat.findMany({
      where: { orderId: parseInt(orderId) },
      orderBy: { createdAt: "asc" },
    });

    if (chats.length === 0) {
      return res.status(404).json({ message: "No chat history found for this order." });
    }

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history", details: error.message });
  }
};

// Initiate a chat
const initiateChat = async (req, res) => {
  const { orderId, deliverymanId, message } = req.body;

  if (!orderId || !deliverymanId || !message) {
    return res.status(400).json({ error: "Order ID, deliveryman ID, and message are required." });
  }

  try {
    const chat = await prisma.chat.create({
      data: {
        orderId,
        deliverymanId,
        message,
        sender: "user", // Assuming the user initiates the chat
      },
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate chat", details: error.message });
  }
};

module.exports = { getChatHistory, initiateChat };