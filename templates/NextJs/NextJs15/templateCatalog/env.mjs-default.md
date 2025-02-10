import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    NGROK_AUTH_TOKEN: z.string().min(1, 'NGROK_AUTH_TOKEN is required for ngrok commands').optional(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,
  },
});
