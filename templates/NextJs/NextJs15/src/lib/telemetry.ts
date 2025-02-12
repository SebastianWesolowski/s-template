import { type Attributes, trace } from '@opentelemetry/api';

const tracer = trace.getTracer('next-app');

export function trackCustomEvent(name: string, data: Record<string, unknown>) {
  const span = tracer.startSpan(name);

  try {
    span.setAttributes(data as Attributes);
  } finally {
    span.end();
  }
}
