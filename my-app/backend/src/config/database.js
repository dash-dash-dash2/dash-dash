import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  __internal: {
    engine: {
      connectionLimit: 10,
      connectionTimeout: 30000,
      queueLimit: 0,
    }
  }
});

prisma.$on('error', (e) => {
  console.error('Database connection error:', e);
});

const cleanup = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export default prisma; 