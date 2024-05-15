// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Function to inject routes into the Express application.
 * @param {Express} api - The Express application instance.
 */
const injectRoutes = (api) => {
  // AppController routes
  api.get('/status', AppController.getStatus); // Route to get app status
  api.get('/stats', AppController.getStats); // Route to get app stats

  // AuthController routes
  api.get('/connect', basicAuthenticate, AuthController.getConnect); // Route to connect user (login)
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect); // Route to disconnect user (logout)

  // UsersController routes
  api.post('/users', UsersController.postNew); // Route to create a new user
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe); // Route to get current user info

  // FilesController routes
  api.post('/files', xTokenAuthenticate, FilesController.postUpload); // Route to upload a file
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow); // Route to get file info by ID
  api.get('/files', xTokenAuthenticate, FilesController.getIndex); // Route to list all files
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish); // Route to publish a file
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish); // Route to unpublish a file
  api.get('/files/:id/data', FilesController.getFile); // Route to get file data by ID

  // Default route for handling unsupported routes
  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });

  // Middleware for handling errors
  api.use(errorResponse);
};

export default injectRoutes;
