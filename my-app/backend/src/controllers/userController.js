import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Validate required fields - only name, email, and password are required
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with optional fields
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,    // Make phone optional
        address: address || null, // Make address optional
        role: 'CUSTOMER',        // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true
      }
    });
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.status(201).json({ user, token });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with more details
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        phone: true,
        address: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate token with correct user ID field
    const token = jwt.sign(
      { 
        id: user.id,  // Changed from userId to id to match auth middleware
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        location: true,
        imageUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, location, imageUrl } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Update user with image URL
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone: phone || null,
        address: address || null,
        location: location || null,
        imageUrl: imageUrl || null, // This will now save the Cloudinary URL
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        location: true,
        imageUrl: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePassword
};