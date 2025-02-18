import request from 'supertest';
import app from '../../app';
import { seedTestData, generateTestToken } from '../setup';
import prisma from '../../config/database';

describe('Restaurant API', () => {
  let testUser;
  let testRestaurant;
  let authToken;

  beforeEach(async () => {
    const testData = await seedTestData();
    testUser = testData.testUser;
    testRestaurant = testData.testRestaurant;
    authToken = generateTestToken(testUser.id);
  });

  describe('GET /api/restaurants', () => {
    it('should return list of restaurants', async () => {
      const response = await request(app)
        .get('/api/restaurants')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('name');
    });

    it('should filter restaurants by cuisine', async () => {
      const response = await request(app)
        .get('/api/restaurants?cuisine=Test Cuisine')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].cuisineType).toBe('Test Cuisine');
    });
  });

  describe('POST /api/restaurants', () => {
    it('should create new restaurant', async () => {
      const newRestaurant = {
        name: 'New Restaurant',
        cuisineType: 'New Cuisine',
        location: '40.7128,-74.0060'
      };

      const response = await request(app)
        .post('/api/restaurants')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newRestaurant);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newRestaurant);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/restaurants')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
}); 