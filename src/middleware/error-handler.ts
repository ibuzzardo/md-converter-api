import type { NextFunction, Request, Response } from 'express';
import type { ErrorResponse } from '../types/api-types';

interface RequestError extends Error {
  status?: number;
  type?: string;
}

export const errorHandler = (
  error: RequestError,
  _request: Request,
  response: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  if (error.type === 'entity.too.large') {
    response.status(413).json({
      success: false,
      error: {
        message: 'Request body exceeds 1MB limit'
      }
    });
    return;
  }

  const statusCode = error.status ?? 500;
  const message = statusCode === 500 ? 'Internal server error' : error.message;

  response.status(statusCode).json({
    success: false,
    error: {
      message
    }
  });
};
