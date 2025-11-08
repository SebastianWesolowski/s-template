# Przewodnik techniczny testowania

> [!NOTE] Wystąpienie tematu
> Kanoniczne źródła szczegółów konfiguracji: [overview.md](overview.md), [tech-jest.md](tech-jest.md), [tech-snapshots.md](tech-snapshots.md), [tech-playwright.md](tech-playwright.md), [tech-storybook.md](tech-storybook.md). W tym pliku tylko workflow i integracja narzędzi.

---

## Testing Workflow

### Development Phase

Podczas developmentu używamy trzech głównych narzędzi testowych:

- **Jest** — unit i integration testing → zobacz: [tech-jest.md](tech-jest.md)
- **Playwright** — E2E testing → zobacz: [tech-playwright.md](tech-playwright.md)
- **Storybook** — component testing i documentation → zobacz: [tech-storybook.md](tech-storybook.md)

**Workflow krok po kroku:**

1. **Piszesz komponent** → tworzysz plik `Component.tsx`
2. **Piszesz test jednostkowy** → `Component.test.tsx` z Jest
   ```bash
   yarn test:unit:watch  # Watch mode dla szybkiego feedbacku
   ```
3. **Tworzysz story** → `Component.stories.tsx` w Storybook
   ```bash
   yarn storybook  # Wizualna weryfikacja komponentu
   ```
4. **Testujesz user journey** → `e2e/user-journey.spec.ts` w Playwright
   ```bash
   yarn test:e2e:ui  # Interaktywny debug mode
   ```

**Szczegóły:** [overview.md](overview.md#testing-workflow) — diagram workflow development phase

### Commit Phase

Pre-commit hooks (Husky) automatycznie uruchamiają:

- **Lint-staged** → uruchamia `jest` na staged plikach testowych
- **Type checking** → walidacja przed commitem

**Konfiguracja:**

- Pre-commit hooks: [../9-code-quality/tech-husky.md](../9-code-quality/tech-husky.md)
- Jest w pre-commit: [tech-jest.md](tech-jest.md#troubleshooting)

**Szczegóły:** [overview.md](overview.md#testing-workflow) — diagram workflow commit phase

### CI/CD Phase

GitHub Actions automatycznie uruchamia pełny test suite:

1. **Unit tests** (Jest) → [tech-jest.md](tech-jest.md)
2. **E2E tests** (Playwright) → [tech-playwright.md](tech-playwright.md)
3. **Storybook tests** → [tech-storybook.md](tech-storybook.md)
4. **Coverage report** → [reference.md](reference.md#coverage-configuration)

**Konfiguracja CI/CD:**

- Workflow files: [../../.github/workflows/](../../.github/workflows/)
- Coverage upload: [reference.md](reference.md#coverage-configuration)

**Szczegóły:** [overview.md](overview.md#testing-workflow) — diagram workflow CI/CD phase

---

## Integracja narzędzi

### Jest ↔ Playwright ↔ Storybook

Trzy narzędzia uzupełniają się w test pyramid:

- **Jest** (70%) — szybkie unit/integration tests → [tech-jest.md](tech-jest.md)
- **Playwright** (10%) — powolne E2E tests → [tech-playwright.md](tech-playwright.md)
- **Storybook** (20%) — component isolation i visual testing → [tech-storybook.md](tech-storybook.md)

**Coverage:**

- Jest generuje coverage reports → [reference.md](reference.md#coverage-configuration)
- Storybook addons dla testing → [tech-storybook.md](tech-storybook.md#addons)

### External Testing z Ngrok

Ngrok umożliwia external testing i webhook testing:

- **Webhook testing** — testowanie webhooków z zewnętrznych serwisów → [tech-ngrok.md](tech-ngrok.md)
- **Mobile testing** — dostęp do lokalnego API z urządzeń mobilnych
- **E2E z webhookami** — Playwright z ngrok tunnel → [tech-ngrok.md](tech-ngrok.md#integracja-z-playwright)

---

## Test Coverage

Coverage configuration znajduje się w:

- **Kompletna referencja:** [reference.md](reference.md#coverage-configuration)
- **Jest coverage:** [tech-jest.md](tech-jest.md#coverage-configuration)

**Uwaga:** Coverage jest monitorowane, ale projekt nie definiuje coverage thresholds w konfiguracji.

---

## Troubleshooting

### Jest

- Cache issues → [tech-jest.md](tech-jest.md#troubleshooting)
- Mock problems → [tech-jest.md](tech-jest.md#mocking-strategies)
- Configuration errors → [tech-jest.md](tech-jest.md#jest-setup)

### Snapshots

- Snapshot issues → [tech-snapshots.md](tech-snapshots.md#troubleshooting)
- Dynamiczne dane w snapshotach → [tech-snapshots.md](tech-snapshots.md#problem-snapshot-zawiera-dynamiczne-dane-daty-timestamps)

### Playwright

- Browser installation → [tech-playwright.md](tech-playwright.md#playwright-setup)
- Debug mode → [tech-playwright.md](tech-playwright.md#debugging)
- Trace viewer → [tech-playwright.md](tech-playwright.md#trace-viewer)

### Storybook

- Build errors → [tech-storybook.md](tech-storybook.md)
- Addon configuration → [tech-storybook.md](tech-storybook.md#addons)

### Ngrok

- Authentication issues → [tech-ngrok.md](tech-ngrok.md#troubleshooting)
- Tunnel problems → [tech-ngrok.md](tech-ngrok.md#common-errors)

---

## Rekomendacje (minimalne zmiany)

- **Nie zmieniaj coverage thresholds bez powodu** — wartości są optymalizowane dla test pyramid → [reference.md](reference.md#coverage-thresholds)
- **Używaj Jest dla unit/integration**, Playwright dla E2E, Storybook dla component testing → [overview.md](overview.md#test-pyramid)
- **Coverage reports w CI/CD** — automatycznie generowane i uploadowane → [reference.md](reference.md#coverage-configuration)

---

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia testing
- [tech-jest.md](tech-jest.md) — szczegóły Jest configuration
- [tech-snapshots.md](tech-snapshots.md) — snapshot testing i praca z plikami .snap
- [tech-playwright.md](tech-playwright.md) — szczegóły Playwright setup
- [tech-storybook.md](tech-storybook.md) — szczegóły Storybook testing
- [tech-ngrok.md](tech-ngrok.md) — external testing i webhook testing
- [reference.md](reference.md) — kompletna referencja konfiguracji
- [memory-bank/testing.md](../../../memory-bank/testing.md) — skrót testing dla AI
- [../9-code-quality/](../9-code-quality/) — kontekst w code quality (pre-commit hooks)
- [../14-workflow/](../14-workflow/) — kontekst w development workflow
- [../6-developer-experience/](../6-developer-experience/) — ekosystem DX i narzędzia testing
