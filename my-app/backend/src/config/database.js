const { PrismaClient } = require('@prisma/client');

// Create a single PrismaClient instance and export it
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle shutdown gracefully
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma; 