import request from 'supertest';
import app from '../../app';
import { seedTestData, generateTestToken } from '../setup';

describe('API Endpoints', () => {
  let authToken;
  let testUser;

  beforeEach(async () => {
    const testData = await seedTestData();
    testUser = testData.testUser;
    authToken = generateTestToken(testUser.id);
  });

  describe('Error Handling', () => {
    it('should handle 404 errors', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle validation errors', async () => {
      const response = await request(app)
        .post('/api/restaurants')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Authentication', () => {
    it('should reject requests without token', async () => {
      const response = await request(app)
        .get('/api/restaurants');

      expect(response.status).toBe(401);
    });

    it('should reject invalid tokens', async () => {
      const response = await request(app)
        .get('/api/restaurants')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });
}); 