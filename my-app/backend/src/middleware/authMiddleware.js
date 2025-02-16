const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Failed to authenticate token:", err);
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    req.user = decoded; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticate };