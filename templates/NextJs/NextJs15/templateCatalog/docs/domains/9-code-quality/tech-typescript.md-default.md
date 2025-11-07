# TypeScript Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
> TypeScript zapewnia type safety w projekcie przez strict mode. Jest już zainstalowane i skonfigurowane z dodatkowymi bibliotekami poprawiającymi domyślne typy (`ts-reset`, `typed-query-selector`).

**Dokumentacja:** [TypeScript Docs](https://www.typescriptlang.org/docs)

## Decyzja projektowa

Zgodnie z `overview.md` i `systemPatterns.md`: **TypeScript strict mode + ts-reset**

Oznacza to:

- Wszystkie opcje strict włączone
- Dodatkowe opcje bezpieczeństwa typów
- `ts-reset` dla lepszych domyślnych typów (Array.includes, JSON.parse, fetch)
- `typed-query-selector` dla type-safe querySelector

**Szczegóły:** [memory-bank/systemPatterns.md](../../../memory-bank/systemPatterns.md#decision-8-progressive-code-quality-strategy-typescript--eslint)

## Konfiguracja w projekcie

### Plik konfiguracyjny

Projekt używa TypeScript strict mode z dodatkowymi opcjami bezpieczeństwa:

**Konfiguracja:** [`tsconfig.json`](../../../tsconfig.json) (linie 9-62)

Kluczowe opcje strict:

```json
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "types": ["node", "jest", "@testing-library/jest-dom"],
    "paths": {
      "@/*": ["src/*"],
      "@ui/*": ["./src/ui/*"],
      "@ui": ["./src/ui"],
      "@lib/*": ["./src/lib/*"],
      "@lib": ["./src/lib"],
      "@hooks/*": ["./src/hooks/*"],
      "@hooks": ["./src/hooks"],
      "@styles/*": ["./src/styles/*"],
      "@styles": ["./src/styles"],
      "@utils/*": ["./src/utils/*"],
      "@utils": ["./src/utils"],
      "@tools/*": ["./tools/*"],
      "@tools": ["./tools"],
      "@app/*": ["./src/app/*"],
      "@app": ["./src/app"],
      "@components/*": ["./src/components/*"],
      "@components": ["./src/components"],
      "@assets/*": ["./src/assets/*"],
      "@assets": ["./src/assets"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "verbatimModuleSyntax": true,
    "experimentalDecorators": true,
    "tsBuildInfoFile": "./tsconfig.tsbuildinfo",
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "useUnknownInCatchVariables": true
```

**Incremental compilation:** Włączone ([`tsconfig.json`](../../../tsconfig.json) linia 19) — szybsze kompilowanie dzięki cache.

**Next.js plugin:** Zintegrowany (linie 45-48) — wsparcie dla Next.js typów.

### Path Aliases

Projekt używa absolute imports przez path aliases:

**Konfiguracja:** [`tsconfig.json`](../../../tsconfig.json) (linie 22-43)

Dostępne aliases:

- `@/*` → `src/*`
- `@components/*`, `@components` → `src/components`
- `@utils/*`, `@utils` → `src/utils`
- `@assets/*`, `@assets` → `src/assets`
- `@hooks/*`, `@hooks` → `src/hooks`
- `@lib/*`, `@lib` → `src/lib`
- `@styles/*`, `@styles` → `src/styles`
- `@app/*`, `@app` → `src/app`
- `@ui/*`, `@ui` → `src/ui`
- `@tools/*`, `@tools` → `tools`

**Przykład użycia:**

```typescript
import { Button } from '@components/Button';
import { cn } from '@utils/utils';
```

**Szczegóły:** [7-architecture/tech-components.md](../7-architecture/tech-components.md) — TypeScript patterns w komponentach

## Type Definitions

Projekt zawiera pliki definicji typów w katalogu `@types/`:

### ts-reset i typed-query-selector

**Konfiguracja:** [`@types/reset.d.ts`](../../../@types/reset.d.ts) (linie 1-2)

```typescript
import '@total-typescript/ts-reset';
import 'typed-query-selector/strict';
```

- `ts-reset` — poprawia domyślne typy dla `Array.includes()`, `JSON.parse()`, `fetch()`
  - **Przed:** `Array.includes()` zwraca `boolean` nawet dla literałów
  - **Po:** `Array.includes()` zwraca `true` dla znanych wartości (type narrowing)
  - **Przykład:** `['a', 'b'].includes('a')` → TypeScript wie że to zawsze `true`
- `typed-query-selector` — type-safe `querySelector`

### Environment Variables

**Konfiguracja:** [`@types/environment.d.ts`](../../../@types/environment.d.ts)

Definicje typów dla `process.env` z walidacją przez T3 Env.

**Szczegóły:** [3-environment](../3-environment/) — type-safe environment variables

### Images

**Konfiguracja:** [`@types/images.d.ts`](../../../@types/images.d.ts)

Definicje typów dla importów obrazów (_.png, _.svg, _.jpg, _.jpeg, _.gif, _.webp, _.ico, _.bmp).

### React Types

**Konfiguracja:** [`@types/react.d.ts`](../../../@types/react.d.ts)

Rozszerzenia typów React.

## Dependencies

TypeScript i typy są zainstalowane w projekcie:

**Konfiguracja:** [`package.json`](../../../package.json)

Core TypeScript (linia 125):

```json
    "typescript": "^5.7.3",
```

Type definitions (linie 100-102, 165):

```json
    "@types/node": "^22.13.1",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/jest": "^29.5.10",
```

TypeScript enhancements (linie 163, 222):

```json
    "@total-typescript/ts-reset": "^0.5.1",
    "typed-query-selector": "^2.12.0",
```

ESLint integration (linie 166-167):

```json
    "@typescript-eslint/eslint-plugin": "8.21.0",
    "@typescript-eslint/parser": "^5.54.1",
```

Testing support (linia 219):

```json
    "ts-jest": "^29.1.1",
```

**Szczegóły integracji z ESLint:** [tech-eslint.md](tech-eslint.md)

## Użycie

### Skrypty

Projekt zawiera skrypt do sprawdzania typów:

**Konfiguracja:** [`package.json`](../../../package.json) (linia 46)

```json
    "lint:typescript:check": "tsc --noEmit --project ./tsconfig.json",
```

**Komendy:**

```bash
# Sprawdź typy
yarn lint:typescript:check

# Pełny lint (włącznie z TypeScript)
yarn lint

# Pełny check (włącznie z TypeScript)
yarn lint:check
```

### Integracja z Next.js

TypeScript jest zintegrowany z Next.js:

**Konfiguracja:** [`next.config.ts`](../../../next.config.ts) (linie 62-64)

```typescript
  typescript: {
    tsconfigPath: isProd ? './tsconfig.build.json' : './tsconfig.json',
  },
```

Projekt używa różnych konfiguracji TypeScript dla development i production.

## Integracje

### ESLint

TypeScript jest zintegrowany z ESLint przez `@typescript-eslint`:

**Szczegóły:** [tech-eslint.md](tech-eslint.md) — integracja z TypeScript

### Jest

TypeScript jest wspierany w testach przez `ts-jest`:

**Szczegóły:** [10-testing/tech-jest.md](../10-testing/tech-jest.md) — TypeScript w testach

### IDE (VS Code)

TypeScript działa automatycznie w VS Code:

- Auto-imports
- Type checking w czasie rzeczywistym
- Refactoring wspierany przez typy

**Extension:** `ms-vscode.vscode-typescript-next` — zalecany dla lepszego wsparcia TypeScript

## Troubleshooting

### Problem: TypeScript strict mode powoduje błędy kompilacji

**Możliwe przyczyny:**

- `strict: true` włączone w `tsconfig.json`
- Nieokreślone typy w kodzie
- Brak type assertions dla wartości dynamicznych

**Rozwiązanie:**

```bash
# Sprawdź błędy typów
yarn lint:typescript:check

# Napraw typy (dodaj interfejsy lub użyj `unknown`/`any` jeśli wymagane tymczasowo)
```

### Problem: Path aliases nie działają

**Możliwe przyczyny:**

- Błędna konfiguracja `paths` w `tsconfig.json`
- Next.js nie widzi aliasów

**Rozwiązanie:**

1. Sprawdź [`tsconfig.json`](../../../tsconfig.json) (linie 22-43)
2. Uruchom ponownie TypeScript server w VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
3. Sprawdź czy Next.js jest skonfigurowany: [`next.config.ts`](../../../next.config.ts)

### Problem: ts-reset nie działa

**Możliwe przyczyny:**

- Brak importu w `@types/reset.d.ts`
- Nieprawidłowa konfiguracja

**Rozwiązanie:**

1. Sprawdź [`@types/reset.d.ts`](../../../@types/reset.d.ts)
2. Upewnij się, że `@total-typescript/ts-reset` jest zainstalowane: `yarn add -D @total-typescript/ts-reset`

### Debug konfiguracji

```bash
# Sprawdź wersję TypeScript
npx tsc --version

# Debug konfiguracji
npx tsc --showConfig

# Wyczyść cache
rm -rf tsconfig.tsbuildinfo
rm -rf node_modules/.cache
```

## Wystąpienia

- [`overview.md`](overview.md) — filozofia code quality i ścisłe typowanie
- [`technical.md`](technical.md) — architektura jakości i integracja z innymi narzędziami
- [`tech-eslint.md`](tech-eslint.md) — integracja z ESLint
- [7-architecture/tech-components.md](../7-architecture/tech-components.md) — TypeScript patterns w komponentach
- [3-environment](../3-environment/) — type-safe environment variables
- [10-testing/tech-jest.md](../10-testing/tech-jest.md) — TypeScript w testach
- [`tsconfig.json`](../../../tsconfig.json) — konfiguracja TypeScript (linie 1-75)
- [`package.json`](../../../package.json) — dependencies (linie 100-102, 125, 163-167, 219, 222) i skrypty (linia 46)
- [`@types/reset.d.ts`](../../../@types/reset.d.ts) — ts-reset i typed-query-selector
- [`@types/environment.d.ts`](../../../@types/environment.d.ts) — environment variables types
- [`@types/images.d.ts`](../../../@types/images.d.ts) — image types
- [`next.config.ts`](../../../next.config.ts) — integracja z Next.js (linie 62-64)
- [`memory-bank/systemPatterns.md`](../../../memory-bank/systemPatterns.md) — decyzja projektowa (Decision 8)
