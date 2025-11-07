# Testing Reference

> [!TIP] Single Source of Truth
> Ten plik zbiera wyłącznie referencje: gdzie znajdują się konfiguracje, skrypty testowe i jak je uruchamiać. Bez duplikowania treści z `technical.md`/`tech-*.md`.

## Lokalizacje konfiguracji

- [`jest.config.js`](../../../jest.config.js) — konfiguracja Jest (setup, coverage, transformers)
- [`jest.setup.js`](../../../jest.setup.js) — Jest setup file (mocks, test environment)
- [`playwright.config.ts`](../../../playwright.config.ts) — konfiguracja Playwright (browsers, projects, webServer)
- [`.storybook/`](../../../.storybook/) — Storybook configuration (main.ts, preview.ts, manager.ts)
- [`package.json`](../../../package.json) — skrypty testowe i dependencies
- [`e2e/`](../../../e2e/) — katalog testów E2E (Playwright)

## Kluczowe skrypty testowe (package.json)

### Jest (Unit & Integration Testing)

- `yarn test` — uruchamia wszystkie testy (unit + components + snapshot + smoke + e2e)
- `yarn test:unit` — tylko unit tests (Jest)
- `yarn test:components` — tylko component tests (Jest)
- `yarn test:snapshot:generate` — generuje/aktualizuje snapshoty
- `yarn test:snapshot:verify` — testuje snapshoty bez aktualizacji
- `yarn test:unit:watch` — watch mode dla unit tests
- `yarn test:changed:unit` — tylko zmienione unit tests
- `yarn test:changed:components` — tylko zmienione component tests

### Playwright (E2E Testing)

- `yarn test:e2e:ui` — Playwright UI mode (interaktywny) — **rzeczywiste użycie**
- `yarn playwright:install` — instalacja browserów Playwright
- `yarn test:e2e` — **zamierzony placeholder** (tylko echo) — użyj `test:e2e:ui` lub `playwright test` bezpośrednio
- `yarn playwright test` — bezpośrednie wywołanie Playwright

### Storybook (Component Testing)

- `yarn storybook` — uruchamia Storybook dev server (port 6006)
- `yarn storybook:build` — buduje Storybook do statycznych plików
- `yarn test:smoke` — smoke tests Storybook (test-storybook)
- `yarn test:smoke:ci` — smoke tests dla CI/CD
- `yarn dev:storybook` — uruchamia dev + storybook równolegle

### Coverage

- `yarn quality:coverage` — generuje coverage report w `./reports/coverage`

## Konfiguracje

### Coverage

**Konfiguracja:** [`jest.config.js`](../../../jest.config.js) — `collectCoverageFrom`

**Skrypt:** `yarn quality:coverage`

**Output:** `./reports/coverage/`

**Szczegóły:** [tech-jest.md](tech-jest.md) — coverage configuration

### Test Structure

**Katalogi:**

- Unit/Integration: `src/**/*.test.{ts,tsx}` lub `src/**/__tests__/**/*.{ts,tsx}`
- E2E: `e2e/**/*.spec.ts`
- Stories: `src/**/*.stories.{ts,tsx}`

**Naming:**

- Unit tests: `*.test.ts`, `*.test.tsx`
- E2E tests: `*.spec.ts`
- Stories: `*.stories.tsx`

**Konfiguracja:** [`jest.config.js`](../../../jest.config.js) — `testMatch`

**Szczegóły:** [tech-jest.md](tech-jest.md) — test structure

### Jest Environment

**Konfiguracja:** [`jest.config.js`](../../../jest.config.js), [`jest.setup.js`](../../../jest.setup.js)

**Szczegóły:** [tech-jest.md](tech-jest.md#konfiguracja-projektu)

### Playwright Projects

**Konfiguracja:** [`playwright.config.ts`](../../../playwright.config.ts)

**Szczegóły:** [tech-playwright.md](tech-playwright.md#konfiguracja-projektu)

### Storybook Framework

**Konfiguracja:** [`.storybook/main.ts`](../../../.storybook/main.ts)

**Szczegóły:** [tech-storybook.md](tech-storybook.md#konfiguracja-podstawowa)

### Module Path Mapping

**Konfiguracja:** [`jest.config.js`](../../../jest.config.js) — `moduleNameMapper`

**Szczegóły:** [tech-jest.md](tech-jest.md#5-rozbudowane-module-path-mapping)

### Snapshot Testing

**Konfiguracja:** [`tools/snapshotUtils.ts`](../../../tools/snapshotUtils.ts) — conditional snapshots utility

**Skrypty:**

- `yarn test:snapshot:generate` — generuje/aktualizuje snapshoty
- `yarn test:snapshot:verify` — testuje snapshoty bez aktualizacji

**Lokalizacja snapshotów:** `src/**/__snapshots__/*.snap`

**Szczegóły:** [tech-snapshots.md](tech-snapshots.md) — kompletny przewodnik pracy z snapshotami

### CI/CD Integration

**Workflow files:** [`.github/workflows/`](../../../.github/workflows/)

**Szczegóły:** [tech-jest.md](tech-jest.md), [tech-playwright.md](tech-playwright.md#4-cicd-integration-reusable-workflow) — sekcje CI/CD Integration

**Przykłady uruchamiania:** Zobacz sekcję "Kluczowe skrypty testowe" powyżej.

## Wystąpienia

- [overview.md](overview.md) — filozofia testing i test pyramid
- [technical.md](technical.md) — workflow i integracja narzędzi
- [tech-jest.md](tech-jest.md) — szczegóły Jest configuration
- [tech-snapshots.md](tech-snapshots.md) — snapshot testing i praca z plikami .snap
- [tech-playwright.md](tech-playwright.md) — szczegóły Playwright setup
- [tech-storybook.md](tech-storybook.md) — szczegóły Storybook testing
- [tech-ngrok.md](tech-ngrok.md) — external testing i webhook testing
- [memory-bank/testing.md](../../../memory-bank/testing.md) — skrót testing dla AI
- [../9-code-quality/](../9-code-quality/) — kontekst w code quality (pre-commit hooks)
- [../14-workflow/](../14-workflow/) — kontekst w development workflow
