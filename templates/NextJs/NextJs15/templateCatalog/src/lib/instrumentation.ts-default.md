import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { registerOTel } from '@vercel/otel';

const otelTraceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  headers: {
    'api-key': process.env.OTEL_API_KEY || '',
  },
});
export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    registerOTel('next-app', {
      startSpanAttributes: {
        'deployment.environment': process.env.NODE_ENV,
        'service.version': process.env.NEXT_PUBLIC_APP_VERSION,
      },
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME,
        [SemanticResourceAttributes.SERVICE_VERSION]: process.env.NEXT_PUBLIC_APP_VERSION,
        environment: process.env.NODE_ENV,
      }),
      traceExporter: {
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
        headers: {
          'api-key': process.env.OTEL_API_KEY || '',
        },
      },
      spanProcessor: new BatchSpanProcessor(otelTraceExporter, {
        scheduledDelayMillis: 5000,
        maxExportBatchSize: 1000,
      }),
      textMapPropagator: new W3CTraceContextPropagator(),
      sampler: {
        probability: parseFloat(process.env.OTEL_SAMPLING_PROBABILITY || '1.0'),
      },
    });
  }
}

export const runtime = 'nodejs';
