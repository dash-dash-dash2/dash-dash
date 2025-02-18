import express from 'express';
import cors from 'cors';
import { configureSecurityMiddleware } from './middleware/securityMiddleware.js';
import corsOptions from './config/corsConfig.js';
import { authenticate } from './middleware/authMiddleware.js';
import compression from 'compression';

const app = express();

// Security middleware
configureSecurityMiddleware(app);

// CORS
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Compression
app.use(compression());

// Protected routes
app.use('/api', authenticate);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app; 