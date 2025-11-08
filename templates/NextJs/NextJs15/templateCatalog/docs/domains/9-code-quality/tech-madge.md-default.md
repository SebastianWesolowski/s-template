# Madge - Coupling Analysis

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
Madge analizuje coupling i circular dependencies w projekcie, wizualizując zależności między modułami. W projekcie jest już zainstalowane i skonfigurowane.

**Dokumentacja:** [Madge GitHub](https://github.com/pahen/madge)

## Konfiguracja w projekcie

### Dependency

Madge jest zainstalowane jako dev dependency:

**Konfiguracja:** [`package.json`](../../../package.json) linia 198

```json
    "madge": "^8.0.0",
```

### Skrypty

Projekt zawiera dwa skrypty do analizy coupling:

**Konfiguracja:** [`package.json`](../../../package.json) linie 51-52

```json
    "quality:coupling:graph": "yarn mkdir:reports && npx madge ./src --extensions js,jsx,ts,tsx,md,mdx,css --basedir ./src --exclude '.next|tailwind.config.ts|reset.d.ts|prettier.config.js|postcss.config.js|playwright.config.ts|next.config.js|next-env.d.ts|instrumentation.ts|e2e/|README.md|.storybook/|.eslintrc.js' --image reports/coupling.svg --image reports/coupling.png",
    "quality:coupling:json": "yarn mkdir:reports && npx madge ./src --extensions js,jsx,ts,tsx,md,mdx,css --basedir ./src --json --exclude '.next|tailwind.config.ts|reset.d.ts|prettier.config.js|postcss.config.js|playwright.config.ts|next.config.js|next-env.d.ts|instrumentation.ts|e2e/|README.md|.storybook/|.eslintrc.js' > reports/coupling.json",
```

**Parametry konfiguracji:**

- `--extensions js,jsx,ts,tsx,md,mdx,css` — analizowane typy plików
- `--basedir ./src` — katalog bazowy
- `--exclude` — wykluczenia (katalogi build, konfiguracje, testy)
- `--image` — generowanie wizualizacji SVG i PNG
- `--json` — generowanie danych JSON

## Użycie

### Podstawowe komendy

```bash
# Generuj graph (SVG + PNG)
yarn quality:coupling:graph

# Generuj JSON
yarn quality:coupling:json

# Sprawdź circular dependencies
npx madge --circular ./src
```

### Lokalizacja wyników

**Outputy:**

- [`reports/coupling.svg`](../../../reports/coupling.svg) — graf wizualny (SVG)
- [`reports/coupling.png`](../../../reports/coupling.png) — graf wizualny (PNG)
- [`reports/coupling.json`](../../../reports/coupling.json) — dane JSON

## Interpretacja wyników

### Circular Dependencies

Jeśli Madge znajdzie circular dependencies, wyświetli:

```bash
Circular dependencies found (N):
src/path/to/file1.ts → src/path/to/file2.ts → src/path/to/file1.ts
```

**Akcja:** Refaktoruj — wyciągnij wspólne typy/funkcje do osobnego modułu.

### Dependency Graph (SVG/PNG)

- **Węzły** — pliki/module
- **Krawędzie** — zależności między modułami
- **Kolory** — poziomy coupling
- **Rozmiar węzłów** — liczba zależności

### Coupling Metrics (JSON)

Otwórz `reports/coupling.json` do programowej analizy:

```bash
# Przykład analizy JSON
node -e "
const data = require('./reports/coupling.json');
console.log('Modules:', Object.keys(data).length);
"
```

**Metryki coupling:**

- **High coupling** — >10 dependencies
- **Medium coupling** — 5-10 dependencies
- **Low coupling** — <5 dependencies

## Best Practices

### Refaktoryzacja Circular Dependencies

**Problem:** Moduły importują się nawzajem tworząc cykl.

**Rozwiązanie:** Wyciągnij wspólne typy/funkcje do osobnego modułu:

```typescript
// Przed: circular dependency
// Button.tsx
import { Input } from './Input';

// Input.tsx
import { Button } from './Button';

// Po: shared module
// shared/types.ts
export interface FormProps { ... }

// Button.tsx
import { FormProps } from '../shared/types';

// Input.tsx
import { FormProps } from '../shared/types';
```

### Optymalizacja Coupling

**High coupling modules (>10 dependencies):**

- Wyciągnij wspólne funkcje do utilities
- Użyj dependency injection
- Stwórz abstrakcje/warstwy

**Low coupling (<5 dependencies):**

- Dobrze zaprojektowane moduły
- Łatwe do testowania i refaktoryzacji

## Troubleshooting

### Graph zbyt złożony

```bash
# Ogranicz zakres analizy
npx madge src/components/

# Filtruj pliki
npx madge ./src --include 'src/components/**/*'

# Wyklucz testy
npx madge ./src --exclude '**/*.test.*'
```

### Problemy z wydajnością

```bash
# Użyj cache
npx madge ./src --cache

# Ogranicz typy plików
npx madge ./src --extensions ts,tsx
```

### Debug

```bash
# Debug output
npx madge ./src --debug

# Verbose output
npx madge ./src --verbose
```

## Integracja z workflow

### Git Hooks

Dodanie do pre-push hook:

**Szczegóły:** [tech-husky.md](tech-husky.md) — konfiguracja Git hooks

### CI/CD

Przykład integracji z GitHub Actions:

```yaml
- name: Check coupling
  run: |
    yarn install
    yarn quality:coupling:graph
    npx madge --circular ./src
```

**Szczegóły:** [deployment](../15-deployment/) — CI/CD workflows

## Wystąpienia

- [`overview.md`](overview.md) — filozofia code quality i decyzja o użyciu Knip/Madge
- [`technical.md`](technical.md) — architektura jakości i integracja z innymi narzędziami
- [`tech-knip.md`](tech-knip.md) — unused code detection (podobne narzędzie)
- [`tech-husky.md`](tech-husky.md) — Git hooks configuration
- [`package.json`](../../../package.json) — dependencies (linia 198) i skrypty (linie 51-52)
- [deployment](../15-deployment/) — CI/CD workflows
