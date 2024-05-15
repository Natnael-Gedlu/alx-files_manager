/* Autentication eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getUserFromXToken, getUserFromAuthorization } from '../utils/auth';

/**
 * The Basic authentication to a route applies.
 * @param {Response} res The Express response object.
 * @param {Request} req The Express request object.
 * @param {NextFunction} next The Express next function.
 */
export const basicAuthenticate = async (req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

/**
 * Applies X-Token authentication to a route.
 * @param {Response} res The Express response object.
 * @param {Request} req The Express request object.
 * @param {NextFunction} next The Express next function.
 */
export const xTokenAuthenticate = async (req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};
