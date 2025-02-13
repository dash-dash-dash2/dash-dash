const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get user notifications
const getUserNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            Order: {
              userId
            }
          },
          {
            Deliveryman: {
              userId
            }
          }
        ]
      },
      include: {
        Order: {
          select: {
            id: true,
            status: true,
            Restaurant: {
              include: {
                User: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Notifications fetch error:", error);
    res.status(500).json({ error: "Failed to fetch notifications", details: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const notification = await prisma.notification.findUnique({
      where: { id: parseInt(id) },
      include: {
        Order: true,
        Deliveryman: true
      }
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Check authorization
    if (notification.Order.userId !== userId && notification.Deliveryman?.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to update this notification" });
    }

    const updatedNotification = await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { isRead: true }
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Notification update error:", error);
    res.status(500).json({ error: "Failed to update notification", details: error.message });
  }
};

// Create notification
const createNotification = async (req, res) => {
  const { userId, orderId, message } = req.body;

  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        orderId: parseInt(orderId),
        message,
        isRead: false
      }
    });

    // Emit socket event for real-time updates
    req.io.to(`user-${userId}`).emit('newNotification', notification);

    res.status(201).json(notification);
  } catch (error) {
    console.error("Notification creation error:", error);
    res.status(500).json({ error: "Failed to create notification", details: error.message });
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  createNotification
}; 