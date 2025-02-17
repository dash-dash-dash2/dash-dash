import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import compression from 'compression';
import limiter from './middleware/rateLimiter.js';
import cache from './config/cache.js';
import userRoutes from './routes/userRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deliverymanRoutes from './routes/deliverymanRoutes.js';
import restaurantOwnerRoutes from './routes/restaurantOwnerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { getRecentMessages, saveMessage } from './services/chatService.js';
import { authenticateToken } from './middleware/authMiddleware.js';
// const bcrypt = require('bcrypt'); // Import bcrypt

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);

// Socket.IO setup with better connection handling
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(limiter);

// Make cache available throughout the app
app.set('cache', cache);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, "Reason:", reason);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  socket.on("reconnect_attempt", () => {
    console.log("Client attempting to reconnect");
  });

  socket.on("reconnect", () => {
    console.log("Client reconnected successfully");
  });

  // Handle order status updates
  socket.on("orderStatusUpdate", (data) => {
    io.emit("orderStatusUpdate", data);
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/deliveryman", deliverymanRoutes);
app.use("/api/restaurant-owner", restaurantOwnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/restaurants", restaurantRoutes);

// Add this route to handle order fetching
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: 'PENDING'
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        orderItems: {
          include: {
            menu: true
          }
        },
        restaurant: true,
        user: true,
        deliveryman: true
      }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Make io available in routes
app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!", details: err.message });
});

// Verify environment variables
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});