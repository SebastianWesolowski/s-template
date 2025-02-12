declare module '@vercel/otel' {
  export interface InstrumentationOptions {
    startSpanAttributes?: Record<string, unknown>;
    resource?: Resource;
    traceExporter?: {
      url?: string;
      headers?: Record<string, string>;
    };
    spanProcessor?: SpanProcessor;
    textMapPropagator?: TextMapPropagator;
    sampler?: {
      probability: number;
    };
  }

  export function registerOTel(serviceName: string, options?: InstrumentationOptions): void;
}
