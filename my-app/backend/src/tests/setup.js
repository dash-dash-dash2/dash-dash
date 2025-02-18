import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Global test setup
beforeAll(async () => {
  // Connect to test database
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  
  // Create test data
  await seedTestData();
});

// Clean up after all tests
afterAll(async () => {
  await cleanupTestData();
  await prisma.$disconnect();
});

// Clean database between tests
beforeEach(async () => {
  await clearTestData();
});

// Helper functions
export const seedTestData = async () => {
  // Create test user
  const testUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: await hashPassword('Password123!'),
      role: 'CUSTOMER'
    }
  });

  // Create test restaurant
  const testRestaurant = await prisma.restaurant.create({
    data: {
      name: 'Test Restaurant',
      cuisineType: 'Test Cuisine',
      location: '40.7128,-74.0060',
      userId: testUser.id
    }
  });

  return { testUser, testRestaurant };
};

export const clearTestData = async () => {
  const tables = ['Order', 'Restaurant', 'User', 'Menu', 'Rating'];
  for (const table of tables) {
    await prisma[table].deleteMany();
  }
};

export const cleanupTestData = async () => {
  await clearTestData();
};

// Test helpers
export const generateTestToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}; 