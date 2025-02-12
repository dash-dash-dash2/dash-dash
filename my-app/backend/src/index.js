const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chatRoutes = require("./routes/chatRoutes");
const deliverymanRoutes = require("./routes/deliverymanRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update for production)
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/deliverymen", deliverymanRoutes);

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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));