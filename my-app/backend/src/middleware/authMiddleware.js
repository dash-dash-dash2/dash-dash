const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from header
  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token", details: err.message });
    }
    req.user = decoded; // Save decoded user info to request
    next();
  });
};

module.exports = { authenticate };