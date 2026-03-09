import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGINS: z.string().default('*')
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${parsedEnv.error.message}`);
}

const corsOrigins = parsedEnv.data.CORS_ORIGINS === '*'
  ? '*'
  : parsedEnv.data.CORS_ORIGINS.split(',').map((origin: string) => origin.trim()).filter(Boolean);

export const env = {
  port: parsedEnv.data.PORT,
  corsOrigins
};
