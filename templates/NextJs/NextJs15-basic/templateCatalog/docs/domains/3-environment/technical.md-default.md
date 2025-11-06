# Przewodnik techniczny zarządzania środowiskiem

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## 1. Setup T3 Env

> [!NOTE] Wystąpienie tematu: Environment Setup
> Szczegółowa konfiguracja T3 Env w kontekście setupu projektu.
> Źródło: [1-getting-started/technical.md#environment-variables](../1-getting-started/technical.md#environment-variables)

### Instalacja

T3 Env jest już zainstalowany w projekcie:

```bash
# Sprawdź czy jest zainstalowany
yarn list @t3-oss/env-nextjs
```

### Podstawowa Konfiguracja

Centralne miejsce definicji wszystkich environment variables znajduje się w `env.mjs`:

```typescript
// env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    NGROK_AUTH_TOKEN: z.string().min(1).optional(),
    STRICT_RULES: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
  },
  client: {
    // Obecnie brak - client: {} jest pusty
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,
    STRICT_RULES: process.env.STRICT_RULES,
  },
});
```

**Kluczowe elementy:**

- `server` - zmienne dostępne tylko na serwerze
- `client` - zmienne dostępne w przeglądarce (muszą mieć prefix `NEXT_PUBLIC_`)
- `runtimeEnv` - mapowanie na `process.env`

## 2. Użycie w Projekcie

### Bundle Analyzer (`ANALYZE`)

```typescript
// next.config.ts
import { env } from './env.mjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

const config: NextConfig = {
  // ... other config
};

export default env.ANALYZE ? withBundleAnalyzer({ enabled: true, openAnalyzer: false })(config) : config;
```

**Użycie:**

```bash
# Włącza bundle analyzer
yarn build:analyze  # cross-env ANALYZE=true yarn build

# Standardowy build bez analyzer
yarn build
```

### Ngrok Tunneling (`NGROK_AUTH_TOKEN`)

```typescript
// tools/ngrok-auth.js
import { env } from '../env.mjs';

if (env.NGROK_AUTH_TOKEN) {
  process.env.NGROK_AUTH_TOKEN = env.NGROK_AUTH_TOKEN;
}
```

**Użycie:**

```bash
# Ustaw token w .env.local
NGROK_AUTH_TOKEN=your-ngrok-token

# Uruchom ngrok z autentykacją
yarn ngrok:auth
```

### ESLint Strict Mode (`STRICT_RULES`)

```typescript
// eslint.config.strict.mjs
import { env } from '../env.mjs';

const config = env.STRICT_RULES ? strictConfig : standardConfig;
```

**Użycie:**

```bash
# Strict linting (errors)
yarn lint:eslint:check:strict

# Standard linting (warnings)
yarn lint:eslint:check
```

## 3. TypeScript Integration

### Automatyczne Typy

```typescript
// Automatycznie generowane typy
type Env = typeof env;

// Server types
type ServerEnv = Env['server'];
// ServerEnv.ANALYZE: boolean | undefined
// ServerEnv.NGROK_AUTH_TOKEN: string | undefined
// ServerEnv.STRICT_RULES: boolean | undefined
```

### Type Guards

```typescript
// Sprawdzanie czy zmienna istnieje
function isAnalyzeEnabled(): boolean {
  return !!env.ANALYZE;
}

function hasNgrokToken(): boolean {
  return !!env.NGROK_AUTH_TOKEN;
}

function isStrictMode(): boolean {
  return !!env.STRICT_RULES;
}
```

## 4. Troubleshooting

### Błąd: "Invalid environment variables"

**Problem:** T3 Env nie może zwalidować zmiennych środowiskowych.

**Rozwiązanie:**

1. Sprawdź czy wszystkie wymagane zmienne są ustawione w `.env.local`
2. Upewnij się, że zmienne mają poprawne typy (string, number, boolean)
3. Sprawdź czy nie ma błędów w `env.mjs`

### Błąd: "Environment variable not found"

**Problem:** Aplikacja próbuje użyć zmiennej, która nie jest zdefiniowana w schemacie.

**Rozwiązanie:**

1. Dodaj zmienną do sekcji `server` lub `client` w `env.mjs`
2. Dodaj mapowanie w `runtimeEnv`
3. Ustaw wartość w `.env.local`

### Błąd: "Client-side environment variable"

**Problem:** Próbujesz użyć server variable w komponencie klienckim.

**Rozwiązanie:**

1. Przenieś zmienną do sekcji `client` w `env.mjs`
2. Dodaj prefix `NEXT_PUBLIC_` do nazwy zmiennej
3. Upewnij się, że zmienna jest bezpieczna do udostępnienia w przeglądarce

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia environment management
- [`reference.md`](reference.md) — kompletna dokumentacja API
- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md#environment-management) — skrót dla AI
- [`../1-getting-started/`](../1-getting-started/) — setup environment w quick start
- [`tech-cross-env.md`](tech-cross-env.md) — cross-platform environment variables
- [`../../INDEX.md#3-environment`](../../INDEX.md#3-environment) — centralna nawigacja
- [`../../../env.mjs`](../../../env.mjs) — główny plik konfiguracji T3 Env (reference)
- [`../../../.env.development.example`](../../../.env.development.example) — przykład konfiguracji development (reference)
