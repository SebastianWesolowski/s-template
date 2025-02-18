declare namespace NodeJS {
  interface ProcessEnv {
    readonly ANALYZE?: string;
    readonly NGROK_AUTH_TOKEN?: string;
    readonly STRICT_RULES?: string;
    readonly FORCE_COLOR?: string;
    readonly NODE_ENV?: string;
    readonly NEXT_PUBLIC_NODE_ENV?: string;
    readonly DEBUG?: string;
    readonly ENV_VARIABLE: string;
    readonly NEXT_PUBLIC_ENV_VARIABLE: string;

    readonly DEVELOPMENT_ENV_VARIABLE: string;
    readonly NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE: string;

    readonly ENV_LOCAL_VARIABLE: string;
    readonly NEXT_PUBLIC_ENV_LOCAL_VARIABLE: string;

    readonly PRODUCTION_ENV_VARIABLE: string;
    readonly NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE: string;
  }
}
