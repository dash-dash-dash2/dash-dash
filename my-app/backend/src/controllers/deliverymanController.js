const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Register a new deliveryman
const registerDeliveryman = async (req, res) => {
  const { name, email, password, phone, address, vehicleType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: 'DELIVERYMAN',
        deliveryman: {
          create: {
            vehicleType,
            isAvailable: true,
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register deliveryman' });
  }
};

module.exports = { registerDeliveryman }; 