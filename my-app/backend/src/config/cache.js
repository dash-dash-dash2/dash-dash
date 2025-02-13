const NodeCache = require('node-cache');

const cache = new NodeCache({
  stdTTL: 600, // 10 minutes default TTL
  checkperiod: 120, // Check for expired keys every 2 minutes
  useClones: false, // Store/retrieve references instead of cloning objects
  deleteOnExpire: true // Delete expired items automatically
});

module.exports = cache; 