/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  /**
   * Get the status of the Redis and MongoDB clients.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(), // Check if Redis client is alive
      db: dbClient.isAlive(), // Check if MongoDB client is alive
    });
  }

  /**
   * Get the number of users and files in the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]) // Get counts of users and files
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount }); // Respond with the counts
      })
      .catch((error) => {
        res.status(500).json({ error: error.message }); // Handle potential errors
      });
  }
}
