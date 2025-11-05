# Environment Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Environment Variables API

### Server Variables

Zmienne dostępne tylko na serwerze (API routes, server components):

| Zmienna            | Typ     | Wymagana | Opis                           | Przykład                |
| ------------------ | ------- | -------- | ------------------------------ | ----------------------- |
| `ANALYZE`          | boolean | ❌       | Włącza Next.js Bundle Analyzer | `true`, `false`         |
| `NGROK_AUTH_TOKEN` | string  | ❌       | Autentykacja ngrok tunneling   | `ngrok-auth-token-here` |
| `STRICT_RULES`     | boolean | ❌       | Włącza strict ESLint config    | `true`, `false`         |

### Client Variables

Zmienne dostępne w przeglądarce (muszą mieć prefix `NEXT_PUBLIC_`):

| Zmienna | Typ | Wymagana | Opis                                |
| ------- | --- | -------- | ----------------------------------- |
| _Brak_  | -   | -        | `client: {}` jest pusty w `env.mjs` |

### Zmienne Demonstracyjne

Zmienne testowe i przykładowe (dostępne w runtimeEnv):

| Zmienna                                | Typ    | Wymagana | Praktyczne zastosowanie                 | Przykład wartości           |
| -------------------------------------- | ------ | -------- | --------------------------------------- | --------------------------- |
| `ENV_VARIABLE`                         | string | ❌       | Podstawowa zmienna demonstracyjna       | `"Hello from environment"`  |
| `LOCAL_ENV_VARIABLE`                   | string | ❌       | Zmienna tylko dla .env.local            | `"Local development value"` |
| `DEVELOPMENT_ENV_VARIABLE`             | string | ❌       | Zmienna tylko dla development           | `"Development mode"`        |
| `PRODUCTION_ENV_VARIABLE`              | string | ❌       | Zmienna tylko dla production            | `"Production mode"`         |
| `NEXT_PUBLIC_ENV_VARIABLE`             | string | ❌       | Publiczna zmienna demonstracyjna        | `"Public environment"`      |
| `NEXT_PUBLIC_LOCAL_ENV_VARIABLE`       | string | ❌       | Publiczna zmienna tylko dla .env.local  | `"Public local value"`      |
| `NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE` | string | ❌       | Publiczna zmienna tylko dla development | `"Public development"`      |
| `NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE`  | string | ❌       | Publiczna zmienna tylko dla production  | `"Public production"`       |
| `DEBUG`                                | string | ❌       | Debug flag demonstracyjny               | `"true"`, `"false"`         |

## T3 Env Schema

### Struktura env.mjs

```javascript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Server variables
  },
  client: {
    // Client variables
  },
  runtimeEnv: {
    // Runtime mapping
  },
});
```

### Walidacja Typów

- **string** - tekst
- **number** - liczba
- **boolean** - true/false
- **z.enum()** - ograniczone wartości
- **z.array()** - tablica wartości

## Pliki Konfiguracyjne

### .env.local (Development)

```bash
# Server variables
ANALYZE=false
NGROK_AUTH_TOKEN=your-token-here
STRICT_RULES=false

# Demo variables
ENV_VARIABLE="Hello from environment"
DEBUG="true"
```

### .env.production (Production)

```bash
# Server variables
ANALYZE=false
STRICT_RULES=true

# Demo variables
ENV_VARIABLE="Production environment"
DEBUG="false"
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia environment management
- [`technical.md`](technical.md) — szczegóły implementacji i setup
- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md#environment-management) — skrót dla AI
- [`../1-getting-started/`](../1-getting-started/) — setup environment w quick start
- [`tech-cross-env.md`](tech-cross-env.md) — cross-platform environment variables
- [`../../INDEX.md#3-environment`](../../INDEX.md#3-environment) — centralna nawigacja
- [`../../../env.mjs`](../../../env.mjs) — główny plik konfiguracji T3 Env (reference)
- [`../../../.env.development.example`](../../../.env.development.example) — przykład konfiguracji development (reference)
- [`../../../.env.local.example`](../../../.env.local.example) — przykład konfiguracji local (reference)
- [`../../../.env.prod.example`](../../../.env.prod.example) — przykład konfiguracji production (reference)
