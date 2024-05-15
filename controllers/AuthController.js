/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  /**
   * This will Handle user connection (login).
   * This will Generate a unique token, stores it in Redis
   * with a 24-hour expiration,
   * and returns the token to the client.
   * @param {Object} req - This will request object.
   * @param {Object} res - This will response object.
   */
  static async getConnect(req, res) {
    const { user } = req; // Extract user from request
    const token = uuidv4(); // Generate a unique token

    // Store the token in Redis with the user's ID and a 24-hour expiration time
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    // Send the token back to the client
    res.status(200).json({ token });
  }

  /**
   * Handles user disconnection (logout).
   * Deletes the user's token from Redis.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getDisconnect(req, res) {
    const token = req.headers['x-token']; // Get the token from request headers

    // Delete the token from Redis
    await redisClient.del(`auth_${token}`);
    // Send a 204 No Content response
    res.status(204).send();
  }
}
