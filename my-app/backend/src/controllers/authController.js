import jwt from 'jsonwebtoken';
import { comparePasswords } from '../utils/passwordUtils.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        deliveryman: {
          select: {
            id: true,
            isAvailable: true
          }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token with user info
    const token = jwt.sign(
      { 
        id: user.id,
        role: user.role,
        deliverymanId: user.deliveryman?.id
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Send response without sensitive info
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        deliverymanId: user.deliveryman?.id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}; 