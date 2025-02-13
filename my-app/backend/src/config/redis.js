const Redis = require('ioredis');

const redis = new Redis({
  host: 'redis-15800.c.redis177.me-south-1.ec2.redns.redis-cloud.com',
  port: 15800,
  password: 'your_password_here', // Get this from your Redis Cloud dashboard
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redis; 