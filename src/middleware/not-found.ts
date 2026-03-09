import type { Request, Response } from 'express';
import type { ErrorResponse } from '../types/api-types';

export const notFoundHandler = (_request: Request, response: Response<ErrorResponse>): void => {
  response.status(404).json({
    success: false,
    error: {
      message: 'Route not found'
    }
  });
};
