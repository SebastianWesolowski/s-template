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
    NODE_ENV: z.enum(['development', 'production']).optional(),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production']).optional(),
    OTEL_SERVICE_NAME: z.string().optional(),
    OTEL_EXPORTER_OTLP_ENDPOINT: z.string().optional(),
    OTEL_EXPORTER_OTLP_HEADERS: z.string().optional(),
    OTEL_SAMPLING_PROBABILITY: z.string().optional(),
    OTEL_API_KEY: z.string().min(1, 'OTEL_API_KEY is required for OpenTelemetry').optional(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,
    STRICT_RULES: process.env.STRICT_RULES,
    FORCE_COLOR: process.env.FORCE_COLOR,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    OTEL_EXPORTER_OTLP_HEADERS: process.env.OTEL_EXPORTER_OTLP_HEADERS,
    OTEL_SAMPLING_PROBABILITY: process.env.OTEL_SAMPLING_PROBABILITY,
    OTEL_API_KEY: process.env.OTEL_API_KEY,
  },
});
