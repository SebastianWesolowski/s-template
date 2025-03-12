import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    NGROK_AUTH_TOKEN: z.string().min(1, 'NGROK_AUTH_TOKEN is required for ngrok commands').optional(),
    STRICT_RULES: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    FORCE_COLOR: z
      .enum(['1', '0'])
      .optional()
      .transform((value) => value === '1'),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,
    STRICT_RULES: process.env.STRICT_RULES,
    FORCE_COLOR: process.env.FORCE_COLOR,
    DEBUG: process.env.DEBUG,
    ENV_VARIABLE: process.env.ENV_VARIABLE,
    NEXT_PUBLIC_ENV_VARIABLE: process.env.NEXT_PUBLIC_ENV_VARIABLE,
    DEVELOPMENT_ENV_VARIABLE: process.env.DEVELOPMENT_ENV_VARIABLE,
    NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE: process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE,
    LOCAL_ENV_VARIABLE: process.env.LOCAL_ENV_VARIABLE,
    NEXT_PUBLIC_LOCAL_ENV_VARIABLE: process.env.NEXT_PUBLIC_LOCAL_ENV_VARIABLE,
    PRODUCTION_ENV_VARIABLE: process.env.PRODUCTION_ENV_VARIABLE,
    NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE: process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE,
  },
});
