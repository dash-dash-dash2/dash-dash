import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { expressCspHeader, INLINE, NONE, SELF } from 'express-csp-header';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// API-specific rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests' },
});

// Configure security middleware
const configureSecurityMiddleware = (app) => {
  // Basic security headers
  app.use(helmet());

  // Content Security Policy
  app.use(expressCspHeader({
    directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE],
      'style-src': [SELF, INLINE],
      'img-src': [SELF, 'data:', 'https:'],
      'font-src': [SELF, 'https:', 'data:'],
      'connect-src': [SELF],
      'frame-ancestors': [NONE],
      'form-action': [SELF],
    }
  }));

  // Rate limiting
  app.use(limiter);
  app.use('/api/', apiLimiter);

  // Prevent clickjacking
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });

  // Remove sensitive headers
  app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });
};

export { configureSecurityMiddleware }; 