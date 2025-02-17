import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get user notifications
const getUserNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        isRead: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const notification = await prisma.notification.update({
      where: {
        id: parseInt(id),
        userId
      },
      data: {
        isRead: true
      }
    });

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        type,
        isRead: false
      }
    });

    // Emit socket event if socket.io is set up
    if (req.app.get('io')) {
      req.app.get('io').to(`user-${userId}`).emit('notification', notification);
    }

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

export {
  getUserNotifications,
  markAsRead,
  createNotification
}; 