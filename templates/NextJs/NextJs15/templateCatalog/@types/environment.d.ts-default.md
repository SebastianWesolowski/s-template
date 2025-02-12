declare namespace NodeJS {
  interface ProcessEnv {
    ANALYZE?: string;
    NGROK_AUTH_TOKEN?: string;
    STRICT_RULES?: string;
    FORCE_COLOR?: string;
    NODE_ENV?: string;
    NEXT_PUBLIC_NODE_ENV?: string;
    OTEL_SERVICE_NAME?: string;
    OTEL_EXPORTER_OTLP_ENDPOINT?: string;
    OTEL_EXPORTER_OTLP_HEADERS?: string;
    OTEL_SAMPLING_PROBABILITY?: string;
  }
}
