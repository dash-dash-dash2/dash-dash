const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register a new deliveryman
const registerDeliveryman = async (req, res) => {
  const { name, email, password, phone, vehicleType, location } = req.body;

  // Validate required fields
  if (!email || !password || !vehicleType) {
    return res.status(400).json({ error: "Email, password, and vehicle type are required." });
  }

  try {
    // Check if deliveryman already exists
    const existingDeliveryman = await prisma.deliveryman.findUnique({ where: { email } });
    if (existingDeliveryman) {
      return res.status(400).json({ error: "Deliveryman already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        vehicleType,
        location,
      },
    });

    // Respond with success message and deliveryman data (excluding password)
    res.status(201).json({ message: "Deliveryman registered successfully", deliveryman: { ...deliveryman, password: undefined } });
  } catch (error) {
    console.error("Registration error:", error); // Log the error for debugging
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

module.exports = { registerDeliveryman }; 