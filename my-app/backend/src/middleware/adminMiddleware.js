const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authorizeAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated." });
  }

  const userId = req.user.id; // Get user ID from the authenticated request

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Admin authorization error:", error);
    res.status(500).json({ error: "Failed to authorize admin", details: error.message });
  }
};

module.exports = { authorizeAdmin }; 