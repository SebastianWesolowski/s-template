declare namespace NodeJS {
  interface ProcessEnv {
    ANALYZE?: string;
    NGROK_AUTH_TOKEN?: string;
    STRICT_RULES?: string;
    FORCE_COLOR?: string;
    NODE_ENV?: string;
    NEXT_PUBLIC_NODE_ENV?: string;
  }
}
