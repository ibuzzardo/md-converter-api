import { Router } from 'express';
import type { Request, Response } from 'express';
import type { HealthResponse, ErrorResponse } from '../types/api-types';

const healthRouter = Router();

healthRouter.get(
  '/health',
  async (_request: Request, response: Response<HealthResponse | ErrorResponse>): Promise<void> => {
    try {
      response.status(200).json({
        success: true,
        message: 'Service is healthy'
      });
    } catch (_error) {
      response.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  }
);

export { healthRouter };
