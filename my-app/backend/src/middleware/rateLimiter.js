const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Allow more requests
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
