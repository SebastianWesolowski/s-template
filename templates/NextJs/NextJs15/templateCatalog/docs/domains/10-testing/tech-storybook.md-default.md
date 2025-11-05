# Storybook Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Konfiguracja podstawowa

**Problem:** Potrzeba skonfigurować Storybook dla Next.js 15 z TypeScript, Tailwind CSS i testowaniem.

**Rozwiązanie:** Framework `@storybook/nextjs` z custom builder, feature flags i webpack customization.

[`.storybook/main.ts`](../../../.storybook/main.ts) linie 7-79 — główna konfiguracja Storybook

**Kluczowe elementy:**

- **Framework:** `@storybook/nextjs` — integracja z Next.js 15
- **Stories pattern:** `../src/**/*.mdx`, `../src/**/*.stories.@(js|jsx|ts|tsx)` (linia 8)
- **Addons:** essentials, links, interactions, a11y, themes (linie 9-15)
- **Builder:** SWC (`useSWC: true`, `fsCache: false`) — szybsza kompilacja (linie 19-22)
- **TypeScript:** `check: true` — włączone sprawdzanie typów (linia 30)
- **Static dirs:** `../public` — conditional check `publicDirExists` przed dodaniem (linie 5, 28)
- **Features:** V7/V8 flags włączone, telemetria wyłączona (linie 50-59)
- **Webpack:** custom sass-loader config dla deprecation warnings (linie 61-78)

**Szczegóły:** [reference.md](reference.md#storybook-framework) — kompletna referencja konfiguracji

## Pisanie stories

**Problem:** Potrzeba tworzyć stories dla komponentów z type safety i automatyczną dokumentacją.

**Rozwiązanie:** Pattern z `Meta`, `StoryObj`, `satisfies` i `argTypes` dla kontroli props.

[`src/components/Button/Button/Button.stories.tsx`](../../../src/components/Button/Button/Button.stories.tsx) linie 1-82 — przykład z projektu

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    intent: 'primary',
    underline: false,
    children: 'Button',
    size: 'lg',
    href: '#',
  },
  argTypes: {
    intent: {
      description: 'Style wariantu przycisku',
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      table: { defaultValue: { summary: 'primary' } },
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { intent: 'primary', children: 'Primary Button' },
};
```

**Patterny:**

- `satisfies Meta<typeof Component>` — type safety bez narrowing
- `argTypes` — kontrola props w UI z descriptions i default values
- `tags: ['autodocs']` — automatyczna dokumentacja
- `args` — domyślne wartości dla wszystkich stories

**Szczegóły pisania stories:** Zobacz [oficjalną dokumentację Storybook](https://storybook.js.org/docs/writing-stories) i przykład w projekcie: [`src/components/Button/Button/Button.stories.tsx`](../../../src/components/Button/Button/Button.stories.tsx)

## Preview Configuration

**Problem:** Potrzeba globalnych ustawień dla wszystkich stories (viewports, themes, controls, docs).

**Rozwiązanie:** Plik `.storybook/preview.ts` z globalnymi parameters i custom styles.

[`.storybook/preview.ts`](../../../.storybook/preview.ts) linie 1-80 — globalne parametry stories

**Kluczowe ustawienia:**

- **Tailwind CSS:** import `tailwind.css` dla stylowania (linia 2)
- **Viewports:** mobile (360x640), tablet (768x1024), desktop (1440x900) (linie 36-50)
- **Backgrounds:** light (#ffffff), dark (#333333) — default: dark (linie 52-58)
- **Actions:** automatyczne wykrywanie (`argTypesRegex: '^on[A-Z].*'`) (linia 28)
- **Controls:** matchers dla color i date (linie 29-34)
- **Docs:** dark theme (`themes.dark`), formatowany source code, custom spacing (linie 8-26)
- **Custom styles:** inline CSS dla zwiększenia spacing między sekcjami (linie 62-78)

**Preview Head:** [`.storybook/preview-head.html`](../../../.storybook/preview-head.html) — Google Fonts (Inter, Lexend)

**Szczegóły:** [reference.md](reference.md#storybook-framework) — kompletna konfiguracja preview

## Addons

**Problem:** Potrzeba rozszerzeń Storybook dla testowania, dokumentacji i workflow.

**Rozwiązanie:** 5 zainstalowanych addonów w [`.storybook/main.ts`](../../../.storybook/main.ts) linie 9-15

1. **`@storybook/addon-essentials`** — podstawowe funkcje (controls, actions, docs, viewport, itp.)
2. **`@storybook/addon-links`** — linkowanie między stories
3. **`@storybook/addon-interactions`** — testowanie interakcji (`play` function, interactions panel)
4. **`@storybook/addon-a11y`** — accessibility testing (automatyczne sprawdzanie WCAG)
5. **`@storybook/addon-themes`** — zarządzanie motywami (light/dark switching)

**Uwaga:** Coverage addon nie jest zainstalowany (wspomniany w reference.md, ale brak w package.json).

## Skrypty i workflow

**Problem:** Potrzeba różnych trybów uruchamiania Storybook (dev, build, testing, CI/CD).

**Rozwiązanie:** 5 skryptów w [package.json](../../../package.json) dla różnych scenariuszy.

**Kluczowe skrypty:**

- `yarn storybook` — dev server (port 6006, `--no-open`) (linia 73)
- `yarn storybook:build` — build statycznych plików do `storybook-static/` (`--quiet`) (linia 74)
- `yarn test:smoke` — smoke tests (build + playwright:install + test-runner) (linia 30)
- `yarn test:smoke:ci` — smoke tests dla CI/CD (bez build) (linia 29)
- `yarn dev:storybook` — równoległe uruchomienie dev + storybook (linia 8)

**Szczegóły:** [reference.md](reference.md#storybook-component-testing) — kompletna lista skryptów

## Integracje

### Test runner

**Problem:** Potrzeba automatycznego testowania wszystkich stories (smoke tests).

**Rozwiązanie:** `@storybook/test-runner` z Playwright backend — automatyczne uruchamianie dla każdego story.

**Workflow smoke tests** ([package.json](../../../package.json) linia 30):

1. Build Storybook: `yarn storybook:build`
2. Install browsers: `yarn playwright:install`
3. Serve static: `http-server storybook-static --port 6006` (concurrently)
4. Wait for server: `wait-on tcp:127.0.0.1:6006`
5. Run tests: `test-storybook --ci`

**Szczegóły:** [tech-playwright.md](tech-playwright.md#smoke-tests-integration) — integracja z Playwright

### ESLint

**Problem:** Potrzeba lintowania stories zgodnie ze standardami Storybook.

**Rozwiązanie:** Plugin `eslint-plugin-storybook` z config `flat/recommended`. Ignore: `.storybook/*.ts`

[eslint.config.mjs](../../../eslint.config.mjs) linie 8, 28, 54, 91 — konfiguracja ESLint

**Szczegóły:** [tech-eslint.md](../9-code-quality/tech-eslint.md) — konfiguracja ESLint

### Pre-push hooks

**Problem:** Potrzeba weryfikacji stories przed push do repo.

**Rozwiązanie:** Husky uruchamia `test:smoke` w hook `pre-push` ([package.json](../../../package.json) linia 56).

**Szczegóły:** [tech-husky.md](../9-code-quality/tech-husky.md) — konfiguracja Husky

### Jest integration

**Problem:** Stories nie powinny być liczone w coverage (to są przykłady, nie testy).

**Rozwiązanie:** Wykluczenie `!**/*.stories.{js,jsx,ts,tsx}` w Jest config.

**Szczegóły:** [tech-jest.md](tech-jest.md) — konfiguracja coverage

## Troubleshooting

### Webpack/SASS deprecation warnings

**Problem:** Sass-loader deprecation warnings w Storybook.

**Rozwiązanie:** Custom webpack config w [`.storybook/main.ts`](../../../.storybook/main.ts) linie 61-78 już obsługuje `sassOptions.silenceDeprecations: ['legacy-js-api']`. Jeśli nadal widzisz warnings, sprawdź konfigurację.

### TypeScript check w Storybook

**Problem:** TypeScript errors w Storybook build, ale kod działa w Next.js.

**Rozwiązanie:** Sprawdź [`.storybook/main.ts`](../../../.storybook/main.ts) linia 30 — `typescript.check: true`. Jeśli chcesz wyłączyć tymczasowo: `typescript: { check: false }`.

### Smoke tests failures

**Problem:** `test:smoke` fails z błędami Playwright.

**Rozwiązanie:**

```bash
# Zainstaluj browsers Playwright
yarn playwright:install

# Sprawdź czy storybook-static istnieje
ls -la storybook-static

# Uruchom z verbose
yarn test-storybook --ci --verbose
```

**Szczegóły:** [tech-playwright.md](tech-playwright.md#smoke-tests-integration)

### Ogólne problemy Storybook

**Zobacz:** [Oficjalna dokumentacja troubleshooting](https://storybook.js.org/docs/troubleshooting)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Storybook i component testing
- [`technical.md`](technical.md) — workflow testing i integracja narzędzi
- [`reference.md`](reference.md) — kompletna referencja konfiguracji i skryptów
- [`memory-bank/testing.md`](../../../memory-bank/testing.md) — skrót Storybook dla AI
