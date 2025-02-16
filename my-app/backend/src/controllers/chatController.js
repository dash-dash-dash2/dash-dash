const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const chatService = require('../services/chatService');

// Get chat history for a specific order
const getOrderChats = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId)
      },
      include: {
        Chat: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            },
            deliveryman: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const formattedChats = order.Chat.map(chat => ({
      id: chat.id,
      content: chat.message,
      senderId: chat.userId || chat.deliverymanId,
      createdAt: chat.createdAt,
      sender: chat.userId ? chat.user : chat.deliveryman?.user
    }));

    res.status(200).json(formattedChats);
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
        Chat: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            },
            deliveryman: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true
                  }
                }
              }
            }
          }
        },
        user: true,
        deliveryman: {
          include: {
            user: true
          }
        }
      }
    });

    const chats = orders.map(order => ({
      id: order.id,
      orderId: order.id,
      participants: [
        order.user,
        order.deliveryman?.user
      ].filter(Boolean),
      messages: order.Chat.map(chat => ({
        id: chat.id,
        content: chat.message,
        senderId: chat.userId || chat.deliverymanId,
        createdAt: chat.createdAt,
        sender: chat.userId ? chat.user : chat.deliveryman?.user
      })),
      unreadCount: order.Chat.filter(
        chat => (chat.userId !== userId && chat.deliverymanId !== userId) && !chat.isRead
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
    const newChat = await prisma.chat.create({
      data: {
        orderId: parseInt(orderId),
        userId,
        message,
        sender: req.user.role.toLowerCase()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        }
      }
    });

    // Format the response to match the Message interface
    const formattedMessage = {
      id: newChat.id,
      content: newChat.message,
      senderId: newChat.userId,
      createdAt: newChat.createdAt,
      sender: newChat.user
    };

    // Emit socket event
    req.app.get('io').to(`order-${orderId}`).emit('newMessage', formattedMessage);

    res.status(201).json(formattedMessage);
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