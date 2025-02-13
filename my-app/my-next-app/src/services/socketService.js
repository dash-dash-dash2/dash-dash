import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    this.socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000", {
      auth: { token }
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  joinOrderRoom(orderId) {
    if (this.socket) {
      this.socket.emit("joinOrderRoom", orderId);
    }
  }

  sendMessage(orderId, message) {
    if (this.socket) {
      this.socket.emit("sendMessage", { orderId, message });
    }
  }

  updateLocation(orderId, location) {
    if (this.socket) {
      this.socket.emit("updateLocation", { orderId, location });
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on("newMessage", callback);
    }
  }

  onLocationUpdate(callback) {
    if (this.socket) {
      this.socket.on("locationUpdate", callback);
    }
  }

  onError(callback) {
    if (this.socket) {
      this.socket.on("error", callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService(); 