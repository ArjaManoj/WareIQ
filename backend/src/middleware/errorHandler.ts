import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[API Error] ${req.method} ${req.originalUrl}:`, err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    sendError(res, `A record with this ${field} already exists.`, 409);
    return;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    sendError(res, 'Database validation error', 400, errors);
    return;
  }

  // CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    sendError(res, `Invalid resource identifier: ${err.value}`, 400);
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    sendError(res, 'Invalid authentication token signature', 401);
    return;
  }

  if (err.name === 'TokenExpiredError') {
    sendError(res, 'Authentication token expired', 401);
    return;
  }

  // General server error
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';
  sendError(res, message, statusCode);
};
