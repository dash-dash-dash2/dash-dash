require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require('helmet');
const compression = require('compression');
const limiter = require('./middleware/rateLimiter');
// const cache = require('./config/redis'); // Comment out cache if not using Redis
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const chatService = require('./services/chatService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(compression());
app.use(limiter);

// Updated CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Socket.IO Authentication Middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payments", paymentRoutes);

// Socket.IO Connection Handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id}`);

  // Join user's personal room
  socket.join(`user-${socket.user.id}`);

  // Handle joining order room for chat
  socket.on("joinOrderRoom", (orderId) => {
    socket.join(`order-${orderId}`);
  });

  // Handle chat messages
  socket.on("sendMessage", async (data) => {
    try {
      const { orderId, message } = data;
      
      const chat = await prisma.chat.create({
        data: {
          orderId: parseInt(orderId),
          userId: socket.user.id,
          message,
          sender: socket.user.role.toLowerCase()
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });

      io.to(`order-${orderId}`).emit("newMessage", chat);
    } catch (error) {
      console.error("Socket chat error:", error);
      socket.emit("error", "Failed to send message");
    }
  });

  // Handle location updates for delivery tracking
  socket.on("updateLocation", async (data) => {
    try {
      const { orderId, location } = data;
      
      if (socket.user.role !== "DELIVERYMAN") {
        return socket.emit("error", "Unauthorized");
      }

      const locationData = await chatService.updateDeliveryLocation(
        socket.user.id,
        orderId,
        location
      );

      io.to(`order-${orderId}`).emit("locationUpdate", locationData);
    } catch (error) {
      console.error("Socket location error:", error);
      socket.emit("error", "Failed to update location");
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});

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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));