# Snapshot Testing

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Rola Snapshot Testing w projekcie

Snapshot testing używany jest do testowania komponentów UI poprzez porównywanie aktualnego renderowania z zapisanym wzorcem. Projekt używa conditional snapshots przez `maybeSnapshot` utility, które generuje snapshots tylko gdy `TEST_WITH_SNAPSHOTS=true`.

**Koncepcja i filozofia:** [overview.md](overview.md#1-jest---unit--integration-testing) — sekcja "Testing Tools Stack"
**Workflow i integracja:** [technical.md](technical.md) — testing workflow
**Kompletna referencja:** [reference.md](reference.md)
**Integracja z Jest:** [tech-jest.md](tech-jest.md#2-conditional-snapshots-maybesnapshot)

## Konfiguracja projektu

**Główny plik:** [`tools/snapshotUtils.ts`](../../../tools/snapshotUtils.ts)

**Szczegóły konfiguracji:**

```typescript
export const maybeSnapshot = (container: HTMLElement): void => {
  if (process.env['TEST_WITH_SNAPSHOTS']) {
    expect(container).toMatchSnapshot();
  }
};
```

**Skrypt snapshot tests:**

```bash
yarn test:snapshot:generate  # Uruchamia tylko gdy TEST_WITH_SNAPSHOTS=true, generuje/aktualizuje snapshoty
```

**Szczegóły:** Automatyczne snapshot management w pre-commit hook → [tech-husky.md](../9-code-quality/tech-husky.md#pre-commit)

## Czym są snapshots?

Snapshots to pliki `.snap` generowane przez Jest, które przechowują serializowaną wersję renderowanego komponentu. Są używane do porównywania aktualnego outputu z zapisanym wzorcem.

**Lokalizacja plików snapshot:**

```
src/components/Footer/__snapshots__/Footer.test.tsx.snap
```

## Kiedy snapshots są przydatne?

✅ **Używaj snapshotów gdy:**

- Testujesz komponenty UI z dużą ilością HTML/CSS
- Chcesz szybko wykryć nieoczekiwane zmiany w strukturze DOM
- Komponent ma stabilny output (nie zmienia się dynamicznie)
- Potrzebujesz wizualnej dokumentacji renderowania komponentu

❌ **NIE używaj snapshotów gdy:**

- Komponent ma dużo dynamicznych danych (daty, timestamps, random IDs)
- Testujesz logikę biznesową (użyj assertions)
- Komponent często się zmienia (będziesz ciągle aktualizować snapshots)
- Chcesz testować interakcje użytkownika (użyj `fireEvent` lub `userEvent`)

## Przykład użycia

[Rzeczywisty przykład: src/components/Footer/Footer.test.tsx](../../../src/components/Footer/Footer.test.tsx)

```1:19:src/components/Footer/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@tools/snapshotUtils';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders with default props', () => {
    const { container } = render(<Footer />);

    // Check that copyright text is present with the current year
    const currentYear = new Date().getFullYear();
    // eslint-disable-next-line security/detect-non-literal-regexp
    expect(screen.getByText(new RegExp('Copyright.*' + currentYear + '.*Wesolowski', 'i'))).toBeInTheDocument();

    // Check that GitHub link is present
    const githubLink = screen.getByRole('link', { name: /wesolowski on github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/SebastianWesolowski');

    maybeSnapshot(container);
  });
```

## Jak pracować z plikami snapshot

### 1. Generowanie/aktualizacja snapshotów

```bash
# Uruchom snapshot tests z aktualizacją
yarn test:snapshot:generate

# Lub dla konkretnego pliku
TEST_WITH_SNAPSHOTS=true yarn test Footer.test.tsx --updateSnapshot
```

### 2. Przeglądanie snapshotów

- Otwórz plik `.snap` w edytorze
- Sprawdź strukturę HTML i klasy CSS
- Porównaj z aktualnym renderowaniem komponentu

### 3. Przykład zawartości pliku snapshot

```javascript
exports[`Footer renders with default props 1`] = `
<div>
  <footer class="border-t border-slate-800/50 items-center py-10">
    <div class="flex flex-col items-center sm:flex-row-reverse sm:justify-between">
      // ... więcej HTML ...
    </div>
  </footer>
</div>
`;
```

### 4. Aktualizacja snapshotów po zmianach

- Jeśli zmieniłeś komponent i snapshot jest nieaktualny:
  ```bash
  yarn test:snapshot:generate  # Automatycznie zaktualizuje snapshots
  ```
- Przejrzyj diff w Git przed commitowaniem
- Upewnij się, że zmiany są zamierzone

### 5. Commitowanie snapshotów

- ✅ **Commituj** pliki `.snap` do repozytorium
- ✅ **Review** zmian w snapshotach w PR
- ✅ **Używaj** snapshotów jako dokumentacji komponentu

## Best practices

### Kombinuj snapshots z assertions

Nie polegaj tylko na snapshotach, dodaj też konkretne testy:

```typescript
it('renders correctly', () => {
  const { container } = render(<Component />);

  // Konkretne assertions
  expect(screen.getByText('Expected Text')).toBeInTheDocument();

  // Snapshot dla pełnej struktury
  maybeSnapshot(container);
});
```

### Unikaj snapshotów dla dynamicznych danych

Mockuj daty, timestamps, random values:

```typescript
// ❌ Zły przykład - data będzie się zmieniać
expect(container).toMatchSnapshot();

// ✅ Dobry przykład - mockuj datę
jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);
expect(container).toMatchSnapshot();
```

### Nazywaj testy opisowo

Nazwa testu pojawi się w pliku snapshot:

```typescript
// ✅ Dobra nazwa
it('renders with default props', () => {
  // Snapshot będzie: `Footer renders with default props 1`
});

// ❌ Zła nazwa
it('test 1', () => {
  // Snapshot będzie: `Footer test 1 1` - niejasne
});
```

## Troubleshooting

### Problem: Snapshot jest nieaktualny

**Przyczyna:** Komponent został zmieniony, ale snapshot nie został zaktualizowany.

**Rozwiązanie:**

```bash
# Zaktualizuj wszystkie snapshots
yarn test:snapshot:generate

# Lub dla konkretnego pliku
TEST_WITH_SNAPSHOTS=true yarn test Footer.test.tsx --updateSnapshot
```

**Uwaga:** Przed commitowaniem przejrzyj diff snapshotów w Git, aby upewnić się, że zmiany są zamierzone.

### Problem: Snapshot zawiera dynamiczne dane (daty, timestamps)

**Przyczyna:** Komponent używa `new Date()` lub innych dynamicznych wartości.

**Rozwiązanie:** Mockuj dynamiczne wartości przed snapshotem:

```typescript
// Mockuj datę
jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);

// Mockuj timestamp
jest.spyOn(Date, 'now').mockReturnValue(1234567890);

const { container } = render(<Component />);
maybeSnapshot(container);
```

### Problem: Snapshot jest za duży

**Przyczyna:** Snapshot zawiera zbyt dużo danych, trudno go przeglądać.

**Rozwiązanie:** Rozważ testowanie mniejszych fragmentów komponentu zamiast całego `container`.

### Problem: Snapshot się zmienia przy każdym uruchomieniu

**Przyczyna:** Komponent używa random values lub niezmockowanych dynamicznych danych.

**Rozwiązanie:** Sprawdź czy nie używasz:

- `Math.random()`
- `Date.now()` bez mockowania
- `crypto.randomUUID()` bez mockowania
- Innych funkcji generujących losowe wartości

Mockuj wszystkie dynamiczne wartości przed snapshotem.

### Problem: Snapshots nie działają

**Przyczyna:** Brak env variable `TEST_WITH_SNAPSHOTS=true`.

**Rozwiązanie:**

```bash
# Uruchom snapshot tests
yarn test:snapshot:generate

# Lub ręcznie z env variable
TEST_WITH_SNAPSHOTS=true yarn test:unit
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Jest i test pyramid
- [`technical.md`](technical.md) — workflow testing i integracja narzędzi
- [`reference.md`](reference.md) — kompletna referencja konfiguracji i skryptów
- [`tech-jest.md`](tech-jest.md) — integracja z Jest i conditional snapshots
- [`../9-code-quality/tech-husky.md`](../9-code-quality/tech-husky.md) — integracja z pre-commit hooks
- [`../9-code-quality/technical.md`](../9-code-quality/technical.md) — kontekst w code quality workflow

## Oficjalna dokumentacja

- [Jest Snapshot Testing](https://jestjs.io/docs/snapshot-testing) — oficjalna dokumentacja Jest snapshots
- [Testing Library Best Practices](https://kentcdodds.com/blog/effective-snapshot-testing) — best practices dla snapshot testing
