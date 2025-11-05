# ESLint Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
## Rola ESLint w projekcie

Lint + autofix w edytorze i na bramkach (Husky, CI). Działa sekwencyjnie z Prettier w lint-staged, integruje się z TypeScript i import resolverem, utrzymując spójny styl i bezpieczeństwo.

## Integracja z Prettier

ESLint i Prettier działają **sekwencyjnie**, nie przez formalną integrację (`eslint-config-prettier`/`eslint-plugin-prettier` nie są używane).

**Workflow w lint-staged (pre-commit):**

1. Prettier formatuje kod (`prettier --write`)
2. ESLint sprawdza i naprawia (`eslint --fix`)

**Szczegóły:** [tech-prettier.md](tech-prettier.md), [tech-husky.md](tech-husky.md) — lint-staged konfiguracja

## Profile: standard vs strict

- **Standard**: bazowy, ostrzeżenia; praca lokalna
  - Używa: `eslint.config.mjs`
  - Komenda: `yarn lint:eslint:check` (używana przez `yarn lint:check`)
  - Poziom reguł: `'warn'` dla większości reguł
- **Strict**: surowsze reguły (core‑web‑vitals, security, surowsze TS/A11y)
  - Używa: `eslint.config.strict.mjs`
  - Komendy: `yarn lint:eslint:check:strict`, `yarn lint:eslint:fix`
  - Poziom reguł: `'error'` dla większości reguł
  - Dodatkowe reguły:
    - `@next/eslint-plugin-next/core-web-vitals` — Core Web Vitals checks
    - Rozszerzone reguły security (9 reguł zamiast 4)
    - Surowsze reguły TypeScript (`@typescript-eslint/explicit-function-return-type`, `explicit-module-boundary-types`)
    - Surowsze reguły JSX accessibility (`jsx-a11y/*` jako error)

**Szczegóły:** [eslint.config.strict.mjs](../../../eslint.config.strict.mjs) — pełna lista reguł strict

## Najważniejsze decyzje projektowe

- Flat config (ESLint 9): brak `.eslintrc.*`, centralny `eslint.config.mjs`
- Next.js + core‑web‑vitals w profilu strict — wymusza lepsze praktyki
- `unused-imports` — aktywne czyszczenie importów i zmiennych
- Import resolver: TypeScript + Node, porządek importów z alfabetem
- Dynamiczny sorting importów wg katalogów repozytorium: `getDirectoriesToSort()` — funkcja skanuje katalog główny repozytorium i automatycznie dodaje znalezione katalogi do `pathGroups` w regule `import/order`, umożliwiając spójne sortowanie importów bez ręcznej konfiguracji każdego katalogu
- Tailwind plugin świadomie OFF (komentarz w pliku) ze względu na znane problemy; można go włączyć po aktualizacji

## Konfiguracja w projekcie

- `eslint.config.mjs` — bazowy flat config: ignores, files, plugins, rules, settings
- `eslint.config.strict.mjs` — zaostrzenia: core‑web‑vitals, security, TS, import/order
- `package.json` — skrypty: `lint:eslint:*`, integracja z pipeline i Husky

**Szczegóły:** Zobacz [eslint.config.mjs](../../../eslint.config.mjs) — imports, `eslintIgnore`, `eslintFiles`, plugins, rules, `getDirectoriesToSort()`
**Szczegóły:** Zobacz [eslint.config.strict.mjs](../../../eslint.config.strict.mjs) — rozszerzenia strict
**Szczegóły:** Zobacz [package.json](../../../package.json) — skrypty `lint:eslint:*`

## Użycie

### Podstawowe komendy

```bash
# Standard profil (używany przez lint:check)
yarn lint:eslint:check

# Strict profil (weryfikacja przed PR)
yarn lint:eslint:check:strict

# Autofix (strict)
yarn lint:eslint:fix
```

**Szczegóły skryptów:** [package.json](../../../package.json) linie 41-43

### Workflow

1. Format na zapis (Prettier) + ESLint warnings w edytorze
2. Pre‑commit: lint‑staged uruchamia Prettier → ESLint na zmienionych plikach
3. Pre‑push: `lint:check` (zawiera `lint:eslint:check` standard)
4. CI: `lint:eslint:check` → `lint:eslint:check:strict` (opcjonalnie) → testy

**Szczegóły:** [tech-husky.md](tech-husky.md) — workflow Git hooks

## Pluginy i reguły (skrót)

- `@next/eslint-plugin-next` — reguły Next; w strict: +core‑web‑vitals
- `react-hooks` — poprawność hooków
- `jsx-a11y` — dostępność
- `import` — porządek importów, cykle, dublowanie
- `security` — podstawowe i rozszerzone (w strict)
- `unused-imports` — usuwanie nieużywanych importów i varów
- `storybook` — preset dla storybook

## Tailwind plugin — status

Komentarz w `eslint.config.mjs` wyłącza `eslint-plugin-tailwindcss` z powodu znanego issue. Po aktualizacji można dodać:
– preset: flat/recommended
– `settings.tailwindcss.callees`: już zdefiniowane (`classnames`, `clsx`, `ctl`, `cn`, `cva`)

## Troubleshooting

### Problem: Dużo błędów ESLint w PR

**Możliwe przyczyny:**

- Nie uruchomiono `lint:eslint:check:strict` lokalnie przed push
- Profil strict ma surowsze reguły niż standard

**Rozwiązanie:**

```bash
# Przed push uruchom strict check
yarn lint:eslint:check:strict

# Napraw błędy
yarn lint:eslint:fix
```

**Szczegóły:** [package.json](../../../package.json) linie 41-43

### Problem: Fałszywe alarmy import/order

**Możliwe przyczyny:**

- Nieprawidłowa konfiguracja `getDirectoriesToSort()`
- Brakujące aliasy TypeScript

**Rozwiązanie:**

1. Sprawdź `getDirectoriesToSort()` w [eslint.config.mjs](../../../eslint.config.mjs)
2. Zweryfikuj aliasy w [tsconfig.json](../../../tsconfig.json)
3. Dodaj brakujące ścieżki do konfiguracji

### Problem: Konflikty z Prettier

**Możliwe przyczyny:**

- Kolejność wykonania w lint-staged
- Formatowanie Prettier zmienia kod przed ESLint

**Rozwiązanie:**

Prettier i ESLint działają sekwencyjnie (Prettier → ESLint) w lint-staged. Jeśli występują konflikty, sprawdź kolejność w [lint-staged.config.json](../../../.husky/lint-staged.config.json).

**Szczegóły:** [tech-prettier.md](tech-prettier.md) — integracja z Prettier

### Problem: Cache ESLint powoduje nieprawidłowe wyniki

**Rozwiązanie:**

```bash
# Wyczyść cache ESLint
rm -rf .eslintcache

# Uruchom ponownie
yarn lint:eslint:check
```

## Wystąpienia

- [overview.md](overview.md) — kontekst i decyzje
- [technical.md](technical.md) — synergia narzędzi
- [tech-prettier.md](tech-prettier.md) — formatowanie (twardy standard)
- [tech-typescript.md](tech-typescript.md) — ścisłe typowanie
- [tech-husky.md](tech-husky.md) — bramki git

## Oficjalna dokumentacja

- [ESLint](https://eslint.org/docs/latest) — oficjalna dokumentacja ESLint
- [Next ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint) — integracja ESLint z Next.js
- [@typescript-eslint](https://typescript-eslint.io/rules/) — reguły TypeScript ESLint
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) — plugin do importów
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) — dostępność JSX
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) — wykrywanie nieużywanych importów
- [eslint-plugin-security](https://github.com/eslint-community/eslint-plugin-security) — bezpieczeństwo kodu
