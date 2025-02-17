const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header

  console.log('Token received:', token); // Log the received token

  if (!token) {
    return res.status(403).send('Token is required for authentication');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token');
    }
    req.user = decoded; // Save decoded user info to request
    next();
  });
};

module.exports = { authenticate };