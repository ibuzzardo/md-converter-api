import { z } from 'zod';

export const convertSchema = z.object({
  markdown: z
    .string({
      required_error: 'Markdown is required',
      invalid_type_error: 'Markdown must be a string'
    })
    .trim()
    .min(1, 'Markdown cannot be empty')
});
