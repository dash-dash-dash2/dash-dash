import NodeCache from 'node-cache';

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: 600, // 10 minutes default TTL
      checkperiod: 120 // Check for expired keys every 2 minutes
    });
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl = 600) {
    return this.cache.set(key, value, ttl);
  }

  del(key) {
    return this.cache.del(key);
  }

  flush() {
    return this.cache.flushAll();
  }

  // Cache with namespace support
  getNamespacedKey(namespace, key) {
    return `${namespace}:${key}`;
  }

  // Get all keys in a namespace
  getNamespaceKeys(namespace) {
    const keys = this.cache.keys();
    return keys.filter(key => key.startsWith(`${namespace}:`));
  }

  // Clear all keys in a namespace
  clearNamespace(namespace) {
    const keys = this.getNamespaceKeys(namespace);
    keys.forEach(key => this.cache.del(key));
  }
}

export default new CacheService(); 