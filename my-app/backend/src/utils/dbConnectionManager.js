import { PrismaClient } from '@prisma/client';
import { performance } from 'perf_hooks';

class DatabaseConnectionManager {
  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
    this.queryTimeout = 30000; // 30 seconds
  }

  async executeWithRetry(operation, attempts = this.retryAttempts) {
    const startTime = performance.now();

    try {
      const result = await Promise.race([
        operation(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Query timeout')), this.queryTimeout)
        )
      ]);

      const duration = performance.now() - startTime;
      if (duration > 1000) { // Log slow queries (>1s)
        console.warn(`Slow query detected: ${duration}ms`);
      }

      return result;
    } catch (error) {
      if (attempts > 0 && this.isRetryableError(error)) {
        console.warn(`Database operation failed, retrying... (${attempts} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.executeWithRetry(operation, attempts - 1);
      }
      throw error;
    }
  }

  isRetryableError(error) {
    const retryableCodes = [
      'P1001', // Connection error
      'P1002', // Timeout error
      'P1008', // Operation timeout
      'P1017', // Server closed connection
    ];
    return retryableCodes.includes(error.code);
  }

  async withTransaction(operations) {
    return this.prisma.$transaction(operations, {
      timeout: this.queryTimeout,
      isolationLevel: 'ReadCommitted' // Default isolation level
    });
  }

  getPoolStats() {
    return {
      totalConnections: this.prisma.$metrics?.connections?.active || 0,
      idleConnections: this.prisma.$metrics?.connections?.idle || 0,
      queryCount: this.prisma.$metrics?.queries?.total || 0
    };
  }

  async cleanup() {
    await this.prisma.$disconnect();
  }
}

export default new DatabaseConnectionManager(); 