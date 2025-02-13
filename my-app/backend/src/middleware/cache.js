const Redis = require('ioredis');
let redis;

try {
  redis = new Redis({
    host: process.env.REDIS_HOST ,
    port: process.env.REDIS_PORT,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 1,
  });

  redis.on('error', (err) => {
    console.warn('Redis connection error:', err.message);
  });

} catch (error) {
  console.warn('Redis initialization error:', error.message);
}

const cache = (duration) => {
  return async (req, res, next) => {
    // Skip caching if Redis is not available
    if (!redis || !redis.status === 'ready') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    
    try {
      const cachedResponse = await redis.get(key);
      
      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }
      
      res.originalJson = res.json;
      res.json = async (body) => {
        try {
          await redis.setex(key, duration, JSON.stringify(body));
        } catch (error) {
          console.warn('Redis cache set error:', error.message);
        }
        res.originalJson(body);
      };
      
      next();
    } catch (error) {
      console.warn('Cache middleware error:', error.message);
      next();
    }
  };
};

module.exports = cache; 