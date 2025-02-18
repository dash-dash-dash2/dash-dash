import cache from '../config/cache.js';

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`Cache HIT for ${key}`);
      return res.send(cachedResponse);
    } else {
      console.log(`Cache MISS for ${key}`);
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.set(key, body, duration);
        res.sendResponse(body);
      };
      next();
    }
  };
};

const clearCache = (key) => {
  if (key) {
    cache.del(key);
  } else {
    cache.flushAll();
  }
};

export { cacheMiddleware, clearCache }; 