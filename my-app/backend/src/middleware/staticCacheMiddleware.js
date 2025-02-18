const staticCacheMiddleware = (req, res, next) => {
  // Define file types and their cache durations
  const cacheRules = {
    'image': 2592000, // 30 days
    'font': 31536000, // 1 year
    'css': 604800,    // 1 week
    'javascript': 604800, // 1 week
  };

  // Get file extension
  const ext = req.path.split('.').pop().toLowerCase();
  
  // Map extensions to content types
  const contentTypeMap = {
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'webp': 'image',
    'svg': 'image',
    'woff': 'font',
    'woff2': 'font',
    'ttf': 'font',
    'eot': 'font',
    'css': 'css',
    'js': 'javascript',
  };

  const contentType = contentTypeMap[ext];
  const maxAge = cacheRules[contentType];

  if (maxAge) {
    // Set caching headers
    res.setHeader('Cache-Control', `public, max-age=${maxAge}, immutable`);
    res.setHeader('Vary', 'Accept-Encoding');
    
    // Enable compression for text-based assets
    if (contentType === 'css' || contentType === 'javascript') {
      res.setHeader('Content-Encoding', 'gzip');
    }
  }

  next();
};

export default staticCacheMiddleware; 