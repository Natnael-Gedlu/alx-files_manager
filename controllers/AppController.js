/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  /**
   * Get the status of the Redis and MongoDB clients from appcontroller.
   * @param {Object} res - The response object.
   * @param {Object} req - The request object.
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(), // this will Check if Redis client is alive
      db: dbClient.isAlive(), // this will Check if MongoDB client is alive
    });
  }

  /**
   * This will Get the number of users and files in the database.
   * @param {Object} req - This will request object.
   * @param {Object} res - This will response object.
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]) // This will Get counts of users and files
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message }); // This will Handle potential errors
      });
  }
}
