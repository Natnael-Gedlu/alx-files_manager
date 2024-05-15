import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

class DBClient {
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Check if the MongoDB client is connected
  isAlive() {
    return this.client.isConnected();
  }

  // Get the number of users in the 'users' collection
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Get the number of files in the 'files' collection
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // Get the 'users' collection
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // Get the 'files' collection
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
