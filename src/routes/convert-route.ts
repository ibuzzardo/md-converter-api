import { Router } from 'express';
import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { convertMarkdownToHtml } from '../lib/markdown';
import { convertSchema } from '../schemas/convert-schema';
import type { ConvertRequestBody, ConvertResponse, ErrorResponse } from '../types/api-types';

const convertRouter = Router();

convertRouter.post(
  '/convert',
  async (
    request: Request<Record<string, never>, ConvertResponse | ErrorResponse, ConvertRequestBody>,
    response: Response<ConvertResponse | ErrorResponse>
  ): Promise<void> => {
    try {
      const validatedBody = convertSchema.parse(request.body);
      const html = convertMarkdownToHtml(validatedBody.markdown);

      response.status(200).json({
        success: true,
        data: {
          html
        }
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        response.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: error.issues.map((issue) => issue.message)
          }
        });
        return;
      }

      response.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  }
);

export { convertRouter };
