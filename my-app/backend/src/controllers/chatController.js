const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const chatService = require('../services/chatService');

// Get chat history for a specific order
const getOrderChats = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  try {
    const messages = await chatService.getRecentMessages(orderId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Chat fetch error:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

// Get all chat history for the authenticated user
const getChatHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { userId },
          {
            order: {
              OR: [
                { userId },
                { deliveryman: { userId } }
              ]
            }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        order: true,
        user: {
          select: {
            name: true
          }
        },
        deliveryman: {
          select: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Chat history fetch error:", error);
    res.status(500).json({ error: "Failed to fetch chat history", details: error.message });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  const { orderId, message } = req.body;
  const userId = req.user.id;

  try {
    const chat = await chatService.saveMessage(
      orderId,
      userId,
      message,
      req.user.role.toLowerCase()
    );

    // Emit socket event
    req.app.get('io').to(`order-${orderId}`).emit('newMessage', chat);

    res.status(201).json(chat);
  } catch (error) {
    console.error("Message send error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = {
  getOrderChats,
  getChatHistory,
  sendMessage
}; 