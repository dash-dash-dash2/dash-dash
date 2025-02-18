import { performance } from 'perf_hooks';

const dbPerformanceMiddleware = () => {
  return async (req, res, next) => {
    const startTime = performance.now();

    // Store original end function
    const originalEnd = res.end;

    // Override end function to calculate and log metrics
    res.end = function(...args) {
      const duration = performance.now() - startTime;
      
      // Log if query takes more than 1 second
      if (duration > 1000) {
        console.warn(`Slow database operation detected:
          Path: ${req.path}
          Method: ${req.method}
          Duration: ${duration.toFixed(2)}ms
        `);
      }

      // Call original end function
      originalEnd.apply(this, args);
    };

    next();
  };
};

export default dbPerformanceMiddleware; 