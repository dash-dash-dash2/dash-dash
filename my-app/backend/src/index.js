require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update for production)
  },
});

// Updated CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a room (orderId)
  socket.on("joinRoom", (orderId) => {
    socket.join(orderId);
    console.log(`User ${socket.id} joined room ${orderId}`);
  });

  // Send a message
  socket.on("sendMessage", async ({ orderId, sender, message }) => {
    try {
      // Save message to the database
      const chat = await prisma.chat.create({
        data: {
          orderId,
          userId: sender === "user" ? socket.userId : undefined,
          deliverymanId: sender === "deliveryman" ? socket.userId : undefined,
          message,
          sender,
        },
      });

      // Emit the message to the room
      io.to(orderId).emit("receiveMessage", chat);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Track location
  socket.on("updateLocation", ({ orderId, location }) => {
    io.to(orderId).emit("locationUpdated", { userId: socket.userId, location });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
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