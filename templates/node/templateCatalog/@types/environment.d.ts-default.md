declare namespace NodeJS {
  interface ProcessEnv {
    readonly ANALYZE?: string;
    readonly STRICT_RULES?: string;
    readonly FORCE_COLOR?: string;
    readonly NODE_ENV?: string;
    readonly DEBUG?: string;
    readonly SDEBUG?: string;
    readonly ENV_VARIABLE?: string;
  }
}
