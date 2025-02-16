const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const chatService = require('../services/chatService');

// Get chat history for a specific order
const getOrderChats = async (req, res) => {
  const { orderId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        orderId: orderId
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

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
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { userId },
          { deliverymanId: userId }
        ]
      },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        },
        deliveryman: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        }
      }
    });

    // Format the response to match the frontend Chat interface
    const chats = orders.map(order => ({
      id: order.id,
      orderId: order.id,
      participants: [
        order.user,
        order.deliveryman
      ].filter(Boolean),
      messages: order.messages,
      unreadCount: order.messages.filter(
        msg => msg.senderId !== userId && !msg.read
      ).length
    }));

    res.status(200).json(chats);
  } catch (error) {
    console.error("Chat history fetch error:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  const { orderId, message } = req.body;
  const userId = req.user.id;

  try {
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        senderId: userId,
        orderId: orderId
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        }
      }
    });

    // Emit socket event
    req.app.get('io').to(`order-${orderId}`).emit('newMessage', newMessage);

    res.status(201).json(newMessage);
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