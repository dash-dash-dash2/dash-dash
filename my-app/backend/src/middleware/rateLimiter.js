import rateLimit from 'express-rate-limit';

// Create a more lenient rate limiter configuration
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 1000, // Allow 1000 requests per minute
  message: {
    status: 429,
    error: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for websocket and chat routes
  skip: (req) => {
    return req.originalUrl.includes('/socket.io') || 
           req.originalUrl.includes('/api/chat');
  },
  // Custom handler for rate limit exceeded
  handler: (req, res) => {
    const timeLeft = Math.ceil(req.rateLimit.resetTime / 1000 - Date.now() / 1000);
    res.status(429).json({
      error: 'Too many requests',
      message: `Please try again in ${timeLeft} seconds`,
      retryAfter: timeLeft
    });
  }
});

export default limiter; 