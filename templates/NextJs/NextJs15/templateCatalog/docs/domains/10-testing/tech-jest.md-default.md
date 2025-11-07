# Jest Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Rola Jest w projekcie

Jest używany do unit i integration testing z nietypowymi konfiguracjami: ES Modules support, conditional snapshots, integracja z lint-staged i automatyczne snapshot management w pre-commit hooks.

**Koncepcja i filozofia:** [overview.md](overview.md#1-jest---unit--integration-testing) — sekcja "Testing Tools Stack"
**Workflow i integracja:** [technical.md](technical.md) — testing workflow
**Kompletna referencja:** [reference.md](reference.md)

## Konfiguracja projektu

**Główne pliki:**

- [`jest.config.js`](../../../jest.config.js) — konfiguracja Jest z Next.js integration
- [`jest.setup.js`](../../../jest.setup.js) — setup file (tylko jest-dom import i timeout)

**Szczegóły konfiguracji:** Zobacz pliki powyżej. Nietypowe konfiguracje poniżej.

## Nietypowe konfiguracje projektu

### 1. ES Modules Support z experimental-vm-modules

**Problem:** Next.js używa ES Modules, standardowy Jest CLI nie obsługuje tego bezpośrednio.

**Rozwiązanie:** Bezpośrednie wywołanie przez Node.js z flagą `--experimental-vm-modules`.

[package.json](../../../package.json) linie 24-28

```json
{
  "test:unit": "node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --passWithNoTests",
  "test:components": "node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --passWithNoTests 'src/**/*.test.tsx'",
  "test:snapshot:generate": "cross-env TEST_WITH_SNAPSHOTS=true node --experimental-vm-modules node_modules/jest/bin/jest.js --silent --passWithNoTests --updateSnapshot",
  "test:unit:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch --passWithNoTests"
}
```

**Kluczowe flagi:**

- `--experimental-vm-modules` — wymagane dla ES Modules
- `--runInBand` — sekwencyjne wykonywanie (nie równoległe) dla stabilności
- `--passWithNoTests` — nie failuje gdy brak testów (użyteczne w lint-staged)

### 2. Conditional Snapshots (maybeSnapshot)

**Problem:** Snapshots nie zawsze są potrzebne (czasochłonne, generują dużo plików).

**Rozwiązanie:** Conditional snapshot utility — snapshots tylko gdy `TEST_WITH_SNAPSHOTS=true`.

[tools/snapshotUtils.ts](../../../tools/snapshotUtils.ts)

```typescript
export const maybeSnapshot = (container: HTMLElement): void => {
  if (process.env['TEST_WITH_SNAPSHOTS']) {
    expect(container).toMatchSnapshot();
  }
};
```

**Użycie w testach:**

```typescript
import { maybeSnapshot } from '@tools/snapshotUtils';

describe('Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Component />);
    maybeSnapshot(container);
  });
});
```

**Skrypt snapshot tests:**

```bash
yarn test:snapshot:generate  # Uruchamia tylko gdy TEST_WITH_SNAPSHOTS=true, generuje/aktualizuje snapshoty
```

**Szczegóły:** Automatyczne snapshot management w pre-commit hook → [tech-husky.md](../9-code-quality/tech-husky.md#pre-commit)

**Kompletny przewodnik snapshot testing:** [tech-snapshots.md](tech-snapshots.md) — szczegóły pracy z plikami `.snap`, best practices i troubleshooting

### 3. ts-jest Transform z diagnostics: false

**Problem:** TypeScript errors w testach spowalniają development.

**Rozwiązanie:** Wyłączenie TypeScript diagnostics w ts-jest (błędy sprawdzane przez `tsc`, nie przez Jest).

[jest.config.js](../../../jest.config.js) linie 31-40

```javascript
transform: {
  '^.+\\.tsx?$': [
    'ts-jest',
    {
      diagnostics: false,      // Wyłącza TypeScript errors w testach
      isolatedModules: true,   // Szybsze kompilowanie
      tsconfig: '<rootDir>/tsconfig.json',
      sourceMap: true,
    },
  ],
}
```

**Uwaga:** Type checking nadal działa przez `yarn lint:typescript:check`, Jest skupia się tylko na testach.

### 4. Integracja z lint-staged (findRelatedTests)

**Problem:** Pre-commit hooks powinny uruchamiać tylko testy powiązane ze staged files.

**Rozwiązanie:** Jest z flagą `--findRelatedTests` uruchamiany przez lint-staged.

[.husky/lint-staged.config.json](../../../.husky/lint-staged.config.json)

```json
{
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix --config eslint.config.mjs",
    "jest --bail --findRelatedTests --passWithNoTests"
  ]
}
```

**Kluczowe flagi:**

- `--findRelatedTests` — uruchamia tylko testy powiązane ze staged files
- `--bail` — przerywa po pierwszym failu (szybkie feedback)
- `--passWithNoTests` — nie failuje gdy brak powiązanych testów

**Szczegóły:** [tech-husky.md](../9-code-quality/tech-husky.md#lint-staged)

### 5. Rozbudowane Module Path Mapping

**Problem:** Projekt używa wielu path aliases synchronizowanych z `tsconfig.json`.

**Rozwiązanie:** Rozbudowane `moduleNameMapper` z wariantami (z trailing slash i bez).

[jest.config.js](../../../jest.config.js) linie 13-29

```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@components': '<rootDir>/src/components',  // Wariant bez trailing slash
  // ... 8+ aliasów (zobacz plik)
}
```

**Uwaga:** Coverage thresholds są w dokumentacji, ale **NIE MA ICH w rzeczywistym `jest.config.js`**. Projekt używa tylko `collectCoverageFrom`, bez enforcement thresholds.

**Synchronizacja:** Path aliases muszą być zsynchronizowane z [`tsconfig.json`](../../../tsconfig.json) (linie 22-43).

## Testing Patterns z projektu

### Component Testing

[Rzeczywisty przykład: src/components/AppProvider/AppProvider.test.tsx](../../../src/components/AppProvider/AppProvider.test.tsx)

```1:49:src/components/AppProvider/AppProvider.test.tsx
import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@tools/snapshotUtils';
import { AppProvider } from './AppProvider';

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(
      (query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })
    ),
  });
});

describe('AppProvider', () => {
  it('renders children correctly', () => {
    const testText = 'Test Child Content';
    const { container } = render(
      <AppProvider>
        <div>{testText}</div>
      </AppProvider>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('provides theme context to children', () => {
    const { container } = render(
      <AppProvider>
        <div data-testid='themed-content'>Content</div>
      </AppProvider>
    );

    // Verify the theme provider is working by checking for the class attribute
    const html = document.documentElement;
    expect(html).toHaveAttribute('class');
    maybeSnapshot(container);
  });
});
```

**Kluczowe elementy:**

- Mock `matchMedia` dla theme provider
- Użycie `maybeSnapshot()` dla conditional snapshots
- Testowanie context provider

### Utility Testing

[Rzeczywisty przykład: src/utils/formatPrice/formatPrice.test.ts](../../../src/utils/formatPrice/formatPrice.test.ts)

```1:25:src/utils/formatPrice/formatPrice.test.ts
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  const testCases = [
    { input: 23.5, expected: '23,50 zł' },
    { input: 0, expected: '0,00 zł' },
    { input: 1000, expected: '1 000,00 zł' },
    { input: 1000000, expected: '1 000 000,00 zł' },
    { input: -50, expected: '-50,00 zł' },
    { input: -1000, expected: '-1 000,00 zł' },
    { input: 23.99, expected: '23,99 zł' },
    { input: 23.1, expected: '23,10 zł' },
    { input: 23.999, expected: '24,00 zł' },
    { input: 0.01, expected: '0,01 zł' },
    { input: 0.001, expected: '0,00 zł' },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should format ${input} to "${expected}"`, () => {
      const result = formatPrice(input);
      // Porównaj po usunięciu wszystkich białych znaków
      expect(result.replace(/\s/g, '')).toBe(expected.replace(/\s/g, ''));
    });
  });
});
```

**Kluczowe elementy:**

- Test cases array z parametrized tests
- Porównywanie po usunięciu białych znaków (formatting może różnić się whitespace)

## Troubleshooting

### Problem: Tests failują z ES Modules errors

**Przyczyna:** Brak flagi `--experimental-vm-modules` lub nieprawidłowa konfiguracja.

**Rozwiązanie:**

```bash
# Sprawdź skrypty w package.json
cat package.json | grep test:

# Upewnij się że używasz: node --experimental-vm-modules
yarn test:unit
```

### Problem: Snapshots — wszystkie problemy związane ze snapshotami

**Szczegóły troubleshooting snapshotów:** [tech-snapshots.md](tech-snapshots.md#troubleshooting) — kompletny przewodnik rozwiązywania problemów ze snapshotami

### Problem: Module path resolution errors

**Przyczyna:** Niesynchronizowane `moduleNameMapper` w `jest.config.js` i `paths` w `tsconfig.json`.

**Rozwiązanie:**

1. Sprawdź [`tsconfig.json`](../../../tsconfig.json) (linie 22-43) — wszystkie paths
2. Zsynchronizuj [`jest.config.js`](../../../jest.config.js) (linie 13-29) — `moduleNameMapper`
3. Dodaj warianty bez trailing slash jeśli używane w kodzie (np. `'^@components': '<rootDir>/src/components'`)

### Problem: Jest cache issues

**Rozwiązanie:**

```bash
# Wyczyść cache
npx jest --clearCache

# Lub usuń ręcznie
rm -rf node_modules/.cache/jest
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Jest i test pyramid
- [`technical.md`](technical.md) — workflow testing i integracja narzędzi
- [`reference.md`](reference.md) — kompletna referencja konfiguracji i skryptów
- [`tech-snapshots.md`](tech-snapshots.md) — snapshot testing (conditional snapshots)
- [`../9-code-quality/tech-husky.md`](../9-code-quality/tech-husky.md) — integracja z pre-commit hooks
- [`../9-code-quality/technical.md`](../9-code-quality/technical.md) — kontekst w code quality workflow
- [`memory-bank/testing.md`](../../../memory-bank/testing.md) — skrót Jest dla AI

## Oficjalna dokumentacja

- [Jest Documentation](https://jestjs.io/docs/getting-started) — podstawy Jest
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) — React Testing Library
- [ts-jest](https://kulshekhar.github.io/ts-jest/) — TypeScript support dla Jest
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing/jest) — Next.js + Jest integration
