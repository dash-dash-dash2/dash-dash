import request from 'supertest';
import app from '../../app';
import prisma from '../../config/database';
import { hashPassword } from '../../utils/passwordUtils';

describe('Authentication API', () => {
  beforeEach(async () => {
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: await hashPassword('TestPass123!'),
        name: 'Test User',
        role: 'CUSTOMER'
      }
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPass123!'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register new user', async () => {
      const newUser = {
        email: 'new@example.com',
        password: 'NewPass123!',
        name: 'New User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(newUser.email);
    });

    it('should validate password requirements', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'new@example.com',
          password: 'weak',
          name: 'New User'
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
}); 