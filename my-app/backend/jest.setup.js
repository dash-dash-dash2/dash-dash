const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
  // Connect to test database
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Clean test database before each test
  const tables = await prisma.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `;
  
  for (const { table_name } of tables) {
    if (table_name !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table_name}" CASCADE;`);
    }
  }
}); 