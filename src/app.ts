import cors, { type CorsOptions } from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { notFoundHandler } from './middleware/not-found';
import { convertRouter } from './routes/convert-route';
import { healthRouter } from './routes/health-route';
import type { ErrorResponse } from './types/api-types';

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: env.corsOrigins === '*'
    ? true
    : (origin, callback) => {
        if (!origin || env.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error('Not allowed by CORS'));
      }
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.get('/', async (_request: Request, response: Response): Promise<void> => {
  try {
    response.status(200).json({
      success: true,
      message: 'md-converter-api is running'
    });
  } catch (_error) {
    response.status(500).json({
      success: false,
      error: {
        message: 'Internal server error'
      }
    });
  }
});

app.use(healthRouter);
app.use(convertRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
export type { ErrorResponse };
