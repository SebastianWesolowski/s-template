# Playwright Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Rola Playwright w projekcie

Playwright używany jest do E2E testing z automatycznym uruchamianiem dev server, konfiguracją CI vs Local oraz integracją z ngrok dla webhook testing.

**Koncepcja i filozofia:** [overview.md](overview.md#2-playwright---e2e-testing) — sekcja "Testing Tools Stack"
**Workflow i integracja:** [technical.md](technical.md#jest--playwright--storybook)
**Kompletna referencja:** [reference.md](reference.md)

## Konfiguracja projektu

**Główny plik:** [`playwright.config.ts`](../../../playwright.config.ts)

**Szczegóły konfiguracji:** Zobacz plik powyżej. Nietypowe konfiguracje poniżej.

## Nietypowe konfiguracje projektu

### 1. Base URL z 127.0.0.1 (nie localhost)

**Problem:** Domyślnie Playwright używa `localhost`, ale Next.js może mieć różne zachowanie z `127.0.0.1`.

**Rozwiązanie:** Explicit `baseURL` z `127.0.0.1:3000` dla zgodności z Next.js dev server.

[playwright.config.ts](../../../playwright.config.ts) linia 27

```typescript
use: {
  baseURL: 'http://127.0.0.1:3000',  // Nie localhost!
}
```

**Uwaga:** WebServer również używa `127.0.0.1:3000` dla synchronizacji.

### 2. WebServer Integration (automatyczne uruchamianie)

**Problem:** Ręczne uruchamianie dev server przed testami jest uciążliwa i podatna na błędy.

**Rozwiązanie:** Playwright automatycznie uruchamia `yarn dev` przed testami i czeka na gotowość.

[playwright.config.ts](../../../playwright.config.ts) linie 72-76

```typescript
webServer: {
  command: 'yarn dev',
  url: 'http://127.0.0.1:3000',
  reuseExistingServer: !process.env.CI,  // Reuse lokalnie, nowy w CI
}
```

**Zachowanie:**

- **Lokalnie:** Reuse istniejącego serwera (jeśli działa) — szybsze
- **W CI:** Zawsze nowy serwer — stabilność i izolacja

### 3. CI vs Local Configuration

**Problem:** Konfiguracja powinna być inna w CI (stabilność) vs lokalnie (szybkość).

**Rozwiązanie:** Conditional configuration na podstawie `process.env.CI`.

[playwright.config.ts](../../../playwright.config.ts) linie 17-21

```typescript
forbidOnly: !!process.env.CI,        // Blokuj .only() w CI
retries: process.env.CI ? 2 : 0,     // Retry tylko w CI
workers: process.env.CI ? 1 : undefined,  // Jeden worker w CI
```

**Dlaczego:**

- `forbidOnly` — zapobiega przypadkowym `.only()` w CI
- `retries: 2` — retry flaky tests w CI (lokally 0 dla szybkości)
- `workers: 1` — sekwencyjne wykonanie w CI dla stabilności

### 4. Trace Configuration (oszczędność)

**Problem:** Trace generuje duże pliki, nie zawsze potrzebne.

**Rozwiązanie:** Trace tylko przy retry (`on-first-retry`) — trace tylko dla failed tests.

[playwright.config.ts](../../../playwright.config.ts) linia 30

```typescript
use: {
  trace: 'on-first-retry',  // Trace tylko gdy test failuje i jest retry
}
```

**Szczegóły:** Trace viewer dostępny przez `npx playwright show-trace test-results/trace.zip`

### 5. Placeholder Script (test:e2e)

**Zamierzony placeholder:** `test:e2e` script to celowy placeholder, który tylko wyświetla komunikat echo. Nie uruchamia testów.

**Rozwiązanie:** Używaj `test:e2e:ui` dla interaktywnego trybu lub `playwright test` bezpośrednio.

[package.json](../../../package.json) linie 31-32

```json
{
  "test:e2e": "echo 'playwright test'",
  "test:e2e:ui": "playwright test --ui"
}
```

**Użycie:**

- `yarn test:e2e:ui` — interaktywny UI mode (rzeczywiste użycie)
- `yarn playwright test` — bezpośrednie wywołanie (dla CI/CD i automatycznych testów)
- `yarn test` — uruchamia wszystkie testy (włącznie z E2E placeholder jako echo)

### 6. Projekty (tylko Desktop, Mobile zakomentowane)

**Rzeczywista konfiguracja:** Tylko desktop browsers (Chromium, Firefox, WebKit). Mobile projects zakomentowane.

[playwright.config.ts](../../../playwright.config.ts) linie 34-69

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  // Mobile projects zakomentowane (TODO: włączyć gdy potrzebne)
];
```

**TODO:** Włączenie mobile projects gdy projekt wymaga mobile testing.

## Integracje

### 1. Separacja od Jest

**Problem:** Jest i Playwright mają różne naming conventions i struktury.

**Rozwiązanie:** Explicit separation — Jest ignoruje `e2e/`, Playwright używa `*.spec.ts`.

[jest.config.js](../../../jest.config.js) linia 11

```javascript
testPathIgnorePatterns: ['<rootDir>/e2e'],
```

**Naming:**

- **Jest:** `*.test.tsx`, `*.test.ts` w `src/`
- **Playwright:** `*.spec.ts` w `e2e/`

### 2. Ngrok Integration (webhook testing)

**Problem:** E2E testy wymagają integracji z zewnętrznymi webhookami.

**Rozwiązanie:** Użyj ngrok tunnel przed testami E2E.

**Workflow:**

```bash
# Terminal 1: Uruchom ngrok
yarn dev:tunnel

# Terminal 2: Uruchom E2E testy
yarn test:e2e:ui
```

**TODO:** Rzeczywiste użycie `NGROK_URL` environment variable w testach E2E. Obecnie integracja jest dokumentowana, ale brak implementacji.

**Szczegóły:** [tech-ngrok.md](tech-ngrok.md#e2e-testing-z-webhookami) — webhook testing z ngrok

### 3. Smoke Tests Integration

**Problem:** Smoke tests Storybook wymagają Playwright browsers.

**Rozwiązanie:** `test:smoke` automatycznie instaluje Playwright browsers przed testami.

[package.json](../../../package.json) linia 30

```json
{
  "test:smoke": "yarn storybook:build && yarn playwright:install && ..."
}
```

**Szczegóły:** Storybook test-runner używa Playwright pod spodem.

### 4. CI/CD Integration (reusable workflow)

**Problem:** Potrzeba conditional execution E2E tests w CI/CD.

**Rozwiązanie:** Reusable workflow z conditional execution i cache.

[.github/workflows/reusable-test.yml](../../../.github/workflows/reusable-test.yml) linie 164-174

```164:174:.github/workflows/reusable-test.yml
      - name: 🎭 Install Playwright browsers
        if: inputs.install_playwright == 'true' && (steps.check_inputs.outputs.run_e2e_tests == 'true' || steps.check_inputs.outputs.run_smoke_tests == 'true')
        run: npx playwright install --with-deps

      - name: 🧪 E2E tests
        if: steps.check_inputs.outputs.run_e2e_tests == 'true'
        run: yarn test:e2e
```

**Uwaga:** `yarn test:e2e` w CI jest placeholderem (tylko echo). W workflow używany jest placeholder — dla rzeczywistych testów w CI użyj bezpośrednio `playwright test` lub zaktualizuj workflow do użycia `test:e2e:ui`.

**Cache:** `~/.cache/ms-playwright` dla szybszych buildów (linia 138).

## Test Structure

### Rzeczywisty test w projekcie

[e2e/example.spec.ts](../../../e2e/example.spec.ts)

```typescript
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Next.js easy Boilerplate/);
});
```

**Struktura:**

- Katalog: `e2e/`
- Naming: `*.spec.ts`
- Import: `@playwright/test`

**TODO:** Więcej testów (auth, navigation, components integration).

## Debugging

### UI Mode (rzeczywiste użycie)

```bash
# Interaktywny debug mode
yarn test:e2e:ui
```

**Funkcje:**

- Step-by-step execution
- Live browser preview
- Selector picker
- Network inspection

### Trace Viewer

```bash
# Otwórz trace dla failed test
npx playwright show-trace test-results/trace.zip
```

**Szczegóły:** Trace zbierane tylko przy retry (`on-first-retry`).

### Headed Mode

```bash
# Uruchom z widoczną przeglądarką
npx playwright test --headed
```

## Troubleshooting

### Problem: Testy nie uruchamiają się (`test:e2e`)

**Przyczyna:** `test:e2e` jest placeholderem (tylko echo).

**Rozwiązanie:**

```bash
# Użyj UI mode
yarn test:e2e:ui

# Lub bezpośrednio
yarn playwright test
```

### Problem: Dev server nie startuje

**Przyczyna:** Port 3000 zajęty lub błąd w `webServer` config.

**Rozwiązanie:**

```bash
# Sprawdź czy port wolny
lsof -i :3000

# Sprawdź webServer config w playwright.config.ts
# Upewnij się że `command: 'yarn dev'` jest poprawne
```

### Problem: Trace viewer nie działa

**Przyczyna:** Trace nie są generowane (testy nie failują lub brak retry).

**Rozwiązanie:**

```typescript
// Tymczasowo włącz trace dla wszystkich testów
use: {
  trace: 'on',  // Zamiast 'on-first-retry'
}
```

### Problem: Browser installation issues

**Rozwiązanie:**

```bash
# Reinstall browsers
yarn playwright:install

# Z system dependencies
yarn playwright install --with-deps
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Playwright i E2E testing w test pyramid
- [`technical.md`](technical.md) — workflow testing i integracja narzędzi
- [`reference.md`](reference.md) — kompletna referencja konfiguracji i skryptów
- [`tech-ngrok.md`](tech-ngrok.md) — integracja z ngrok dla webhook testing
- [`../9-code-quality/`](../9-code-quality/) — kontekst w code quality workflow
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`memory-bank/testing.md`](../../../memory-bank/testing.md) — skrót Playwright dla AI

## Oficjalna dokumentacja

- [Playwright Documentation](https://playwright.dev/docs/intro) — oficjalna dokumentacja
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) — best practices
- [Playwright API](https://playwright.dev/docs/api/class-playwright) — API reference
