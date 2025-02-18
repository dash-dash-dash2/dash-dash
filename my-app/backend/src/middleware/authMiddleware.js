import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided',
        details: 'Authentication token is required' 
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user with role and deliveryman info
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          role: true,
          banned: true,
          deliveryman: {
            select: {
              id: true,
              isAvailable: true
            }
          }
        }
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (user.banned) {
        return res.status(403).json({ error: 'Account is banned' });
      }

      // Attach user info to request
      req.user = {
        ...user,
        deliverymanId: user.deliveryman?.id
      };

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Forbidden',
        details: `Access restricted to ${roles.join(', ')}`
      });
    }
    next();
  };
};