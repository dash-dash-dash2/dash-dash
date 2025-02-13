import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Register a new restaurant owner
const registerRestaurantOwner = async (req, res) => {
  const { name, email, password, phone, restaurantName, cuisineType, location } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'RESTAURANT_OWNER',
        restaurant: {
          create: {
            name: restaurantName,
            cuisineType,
            location,
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register restaurant owner' });
  }
};

export { registerRestaurantOwner }; 