/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * in this API Represents an error.
 */
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

/**
 * Applies Basic authentication to a route.
 * @param {Error} err this error object.
 * @param {Response} res this Express response object.
 * @param {Request} req this Express request object.
 * @param {NextFunction} next this Express next function.
 */
export const errorResponse = (err, req, res, next) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    res.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};
