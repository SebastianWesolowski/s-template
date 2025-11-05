# Bundle Analyzer - Bundle Size Optimization

> [!NOTE] Wystąpienie tematu Bundle Analyzer
> Szczegółowy przewodnik po Bundle Analyzer w kontekście performance optimization.
> Źródło koncepcji: [overview.md](overview.md)
> Wystąpienie w DX: [../6-developer-experience/technical.md](../6-developer-experience/technical.md)

## Co to jest Bundle Analyzer?

Next.js Bundle Analyzer analizuje rozmiar bundle Next.js i tworzy interaktywne raporty pokazujące:

- **Bundle size breakdown** — rozmiar poszczególnych modułów
- **Largest modules** — największe komponenty bundle
- **Duplicate dependencies** — zduplikowane pakiety
- **Tree shaking effectiveness** — efektywność usuwania nieużywanego kodu

**Oficjalna dokumentacja:** [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

## Konfiguracja

### 1. Instalacja

Bundle Analyzer jest już zainstalowany w projekcie:

[package.json](../../../package.json) linia 81

```json
{
  "dependencies": {
    "@next/bundle-analyzer": "^15.1.6"
  }
}
```

### 2. Skrypt Build

[package.json](../../../package.json) linia 12

```json
{
  "scripts": {
    "build:analyze": "cross-env ANALYZE=true run-s build"
  }
}
```

### 3. Konfiguracja Next.js

[next.config.ts](../../../next.config.ts) linie 1, 100

```typescript
import withBundleAnalyzer from '@next/bundle-analyzer';
import { env } from './env.mjs';

const config: NextConfig = {
  // ... inne konfiguracje
};

export default env.ANALYZE ? withBundleAnalyzer({ enabled: true, openAnalyzer: false })(config) : config;
```

**Ustawienia:**

- `enabled: true` — włącza bundle analyzer
- `openAnalyzer: false` — nie otwiera przeglądarki automatycznie (opcjonalne, można ustawić `true`)

### 4. Environment Variable

[env.mjs](../../../env.mjs) linie 6-9, 32

```typescript
server: {
  ANALYZE: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => value === 'true'),
},
runtimeEnv: {
  ANALYZE: process.env.ANALYZE,
}
```

**Szczegóły:** [../3-environment/technical.md](../3-environment/technical.md#bundle-analyzer-analyze) — konfiguracja zmiennej ANALYZE

## Uruchomienie

```bash
# Analizuj bundle
yarn build:analyze
```

**Output:**

- Interaktywne raporty w `.next/analyze/`:
  - `client.html` — analiza bundle client-side
  - `server.html` — analiza bundle server-side
  - `__bundle_analysis.json` — dane JSON (generowane przez `report-bundle-size.js`)
- Automatycznie otwiera się na `http://localhost:8888` (gdy `openAnalyzer: true`)

## Interpretacja Wyników

### 1. Bundle Size Breakdown

**Główne sekcje:**

- **Node Modules** — zewnętrzne dependencies
- **Pages** — strony Next.js
- **Components** — komponenty React
- **Assets** — obrazy, fonty, CSS

**Interpretacja:**

- Duże `node_modules` (>100KB) → sprawdź czy wszystkie dependencies są potrzebne
- Duże `pages` (>50KB) → optymalizuj kod strony, użyj dynamic imports
- Duże `components` (>30KB) → rozbij na mniejsze komponenty, lazy load

### 2. Largest Modules

**Najczęstsze problemy (przykłady ogólne):**

- **Moment.js** → użyj `date-fns` lub `dayjs` (jeśli używasz)
- **Lodash** → użyj `lodash-es` lub native methods
- **UI libraries** → importuj tylko potrzebne komponenty
- **Charts libraries** → lazy load

### 3. Duplicate Dependencies

**Wykrywanie:**

```bash
yarn list --depth=0
```

**Rozwiązanie:** Zunifikuj wersje w `package.json`.

### 4. Tree Shaking Issues

**Problemy:**

- Import całych bibliotek: `import * as _ from 'lodash'`
- CommonJS modules — nie są tree-shakeable
- Side effects — moduły z side effects

## Best Practices

### 1. Dynamic Imports

```typescript
// ❌ Złe
import { HeavyComponent } from './HeavyComponent';

// ✅ Dobre
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

### 2. Tree-shakeable Imports

```typescript
// ❌ Złe
import _ from 'lodash';

// ✅ Dobre
import { debounce } from 'lodash-es';
```

**Szczegóły:** [tech-performance.md](tech-performance.md#bundle-optimization) — więcej przykładów optymalizacji

## Reporting

### Bundle Size Script

Projekt zawiera custom script do generowania raportów:

[report-bundle-size.js](../../../report-bundle-size.js)

**Funkcjonalność:**

- Analiza `build-manifest.json` i `app-build-manifest.json`
- Obliczanie rozmiaru raw + gzip
- Generowanie `__bundle_analysis.json` w `.next/analyze/`
- Memory cache dla shared bundles

**Użycie:**

```bash
# Uruchom po build
yarn build
node report-bundle-size.js
```

**Uwaga:** Script nie jest zintegrowany automatycznie z `build:analyze`. Musisz go uruchomić ręcznie po build.

## Performance Standards

**Bundle size standards** (z [overview.md](overview.md#performance-standards)):

- **Initial Bundle Size** — < 250KB
- **Chunk Size** — < 100KB

**Szczegóły:** [overview.md#performance-standards](overview.md#performance-standards) — pełne standardy performance

## Troubleshooting

### Problem: Bundle too large

**Diagnoza:**

```bash
# 1. Sprawdź największe moduły
yarn build:analyze
# Otwórz .next/analyze/client.html i znajdź moduły >50KB

# 2. Sprawdź nieużywane dependencies
yarn quality:knip
```

**Rozwiązanie:**

- Użyj dynamic imports dla dużych komponentów
- Usuń nieużywane dependencies
- Zamień na tree-shakeable alternatywy (np. `lodash-es` zamiast `lodash`)

### Problem: Duplicate dependencies

**Diagnoza:**

```bash
# Sprawdź zduplikowane wersje
yarn list --depth=0 | grep -E "react|lodash"
```

**Rozwiązanie:**

- Zunifikuj wersje w `package.json`
- Użyj `yarn upgrade` lub `resolutions` w `package.json`

### Problem: Tree shaking not working

**Diagnoza:**

- Sprawdź import statements — czy używasz ES modules?
- Sprawdź `sideEffects` w `package.json` zależności

**Rozwiązanie:**

- Użyj named imports: `import { debounce } from 'lodash-es'` zamiast `import _ from 'lodash'`
- Dodaj `"sideEffects": false` w `package.json` zależności (jeśli nie ma side effects)

## Wystąpienia

- [overview.md](overview.md) — koncepcja performance i bundle optimization
- [technical.md](technical.md) — ogólny setup performance tools
- [../6-developer-experience/technical.md](../6-developer-experience/technical.md) — bundle analyzer w DX tools
- [../3-environment/technical.md](../3-environment/technical.md#bundle-analyzer-analyze) — konfiguracja zmiennej ANALYZE
- [package.json](../../../package.json) — dependencies i skrypty
- [next.config.ts](../../../next.config.ts) — konfiguracja Next.js
- [env.mjs](../../../env.mjs) — zmienna środowiskowa ANALYZE
- [report-bundle-size.js](../../../report-bundle-size.js) — custom reporting script
