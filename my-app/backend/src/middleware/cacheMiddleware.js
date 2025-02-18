import NodeCache from 'node-cache';

// Initialize cache with 10 minute TTL by default
const cache = new NodeCache({ stdTTL: 600 });

// Cache middleware
export const cacheMiddleware = (duration = 600) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`Cache hit for ${key}`);
      return res.json(cachedResponse);
    }

    // Store the original res.json function
    const originalJson = res.json;
    
    // Override res.json method to cache the response
    res.json = function(data) {
      cache.set(key, data, duration);
      originalJson.call(this, data);
    };

    next();
  };
};

// Function to clear cache
export const clearCache = (key) => {
  if (key) {
    cache.del(key);
  } else {
    cache.flushAll();
  }
}; 