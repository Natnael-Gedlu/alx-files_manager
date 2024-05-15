import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });

    // Handle successful connection
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  // Check if the Redis client is connected
  isAlive() {
    return this.isClientConnected;
  }

  // Get the value associated with the given key
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  // Set a key-value pair in Redis with an expiration time
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  // Delete the key from Redis
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
