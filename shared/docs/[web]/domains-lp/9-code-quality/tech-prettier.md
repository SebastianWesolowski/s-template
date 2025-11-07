# Prettier Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
Prettier zapewnia automatyczne formatowanie kodu w projekcie. Jest już zainstalowane i skonfigurowane zgodnie z filozofią projektu: **twardy standard formatu, bez negocjacji reguł** (zobacz [overview.md](overview.md#solution)).

**Dokumentacja:** [Prettier Docs](https://prettier.io/docs/en)

## Konfiguracja w projekcie

### Plik konfiguracyjny

Projekt używa `s-prettier` jako bazowej konfiguracji z dodatkowymi pluginami:

**Konfiguracja:** [`prettier.config.js`](../../../prettier.config.js) linie 1-8

```js
const sPrettier = require('s-prettier');

module.exports = {
  ...sPrettier,
  plugins: ['prettier-plugin-tailwindcss'],
  bracketSpacing: true,
  tabWidth: 2,
};
```

**Bazowa konfiguracja:** `s-prettier` — custom Prettier preset używany w projekcie

**Pluginy:**

- `prettier-plugin-tailwindcss` — automatyczne sortowanie klas Tailwind CSS

**Przykład sortowania Tailwind:**

Przed:

```tsx
<button className="p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
```

Po:

```tsx
<button className="rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600">
```

Klasy są sortowane zgodnie z [Tailwind CSS recommended order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).

**Nadpisania:**

- `bracketSpacing: true` — spacje w nawiasach obiektów
- `tabWidth: 2` — wcięcie 2 spacje

### Wykluczenia

Pliki wykluczone z formatowania:

**Konfiguracja:** [`.prettierignore`](../../../.prettierignore) linie 1-3

```
.next
node_modules
.sum
```

## Dependencies

Prettier i integracje są zainstalowane w projekcie:

**Konfiguracja:** [`package.json`](../../../package.json) linie 204-206

```json
    "prettier": "^3.5.0",
    "prettier-plugin-tailwindcss": "^0.6.11",
    "s-prettier": "^1.1.0",
```

**Integracje:**

- `@trivago/prettier-plugin-sort-imports` (linia 164) — sortowanie importów przez Prettier

**Integracja z ESLint:**

Prettier i ESLint działają sekwencyjnie w lint-staged (pre-commit hook):

1. Prettier formatuje kod (`prettier --write`)
2. ESLint sprawdza i naprawia (`eslint --fix`)

Nie używamy `eslint-config-prettier` ani `eslint-plugin-prettier` — narzędzia działają niezależnie, w określonej kolejności.

**Szczegóły:** [tech-eslint.md](tech-eslint.md), [tech-husky.md](tech-husky.md) — lint-staged workflow

## Użycie

### Skrypty

Projekt zawiera skrypty do formatowania:

**Konfiguracja:** [`package.json`](../../../package.json) linie 39-40

```json
    "lint:prettier:check": "prettier --check --cache './src/**/*.{js,jsx,ts,tsx,md,mdx,json}'",
    "lint:prettier:fix": "prettier --write --cache './src/**/*.{js,jsx,ts,tsx,md,mdx,json}'",
```

**Komendy:**

```bash
# Sprawdź formatowanie
yarn lint:prettier:check

# Automatyczne formatowanie
yarn lint:prettier:fix

# Pełny lint (włącznie z Prettier)
yarn lint

# Fix wszystkich (włącznie z Prettier)
yarn lint:fix
```

### Integracja z lint-staged

Prettier jest uruchamiany automatycznie na staged files przed commitem:

**Konfiguracja:** [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json) linie 1-9

```json
{
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix --config eslint.config.mjs",
    "jest --bail --findRelatedTests --passWithNoTests"
  ],
  "src/**/*.{json,md,yml}": ["prettier --write"],
  "src/**/*.{css,scss,sass}": ["stylelint --fix --allow-empty-input"]
}
```

**Szczegóły:** [tech-husky.md](tech-husky.md) — Git hooks configuration

## Integracja z workflow

### IDE (VS Code)

Prettier działa automatycznie w edytorze:

- Format on save — automatyczne formatowanie przy zapisie
- Extension: `esbenp.prettier-vscode`

**Szczegóły:** Zainstaluj extension Prettier w VS Code dla automatycznego formatowania.

### Git Hooks

Prettier jest zintegrowany z Git hooks przez lint-staged:

**Szczegóły:** [tech-husky.md](tech-husky.md) — konfiguracja Git hooks

### CI/CD

Formatowanie jest sprawdzane w CI/CD pipeline:

**Szczegóły:** [deployment](../15-deployment/) — CI/CD workflows

## Troubleshooting

### Problem: Formatowanie nie działa w IDE

**Możliwe przyczyny:**

- Brak extension Prettier w VS Code
- Format on save nie jest włączony
- Prettier nie jest ustawiony jako default formatter

**Rozwiązanie:**

1. Zainstaluj extension: `esbenp.prettier-vscode`
2. Ustaw Prettier jako default formatter w VS Code settings
3. Włącz `editor.formatOnSave: true`

### Problem: Konflikty z ESLint

**Możliwe przyczyny:**

- Konfliktujące reguły ESLint i Prettier
- Brak `eslint-config-prettier` w extends

**Rozwiązanie:**

**Szczegóły:** [tech-eslint.md](tech-eslint.md#troubleshooting) — rozwiązanie konfliktów

### Problem: Prettier nie formatuje niektórych plików

**Możliwe przyczyny:**

- Pliki są w `.prettierignore`
- Błędna konfiguracja ścieżek w skryptach

**Rozwiązanie:**

1. Sprawdź [`.prettierignore`](../../../.prettierignore)
2. Sprawdź ścieżki w skryptach `package.json`

### Debug konfiguracji

```bash
# Sprawdź wersję Prettier
npx prettier --version

# Debug konfiguracji
node -e "console.log(JSON.stringify(require('./prettier.config.js'), null, 2))"
```

## Wystąpienia

- [`overview.md`](overview.md) — filozofia code quality i decyzja o użyciu Prettier jako twardy standard
- [`technical.md`](technical.md) — architektura jakości i integracja z innymi narzędziami
- [`tech-eslint.md`](tech-eslint.md) — integracja z ESLint
- [`tech-husky.md`](tech-husky.md) — Git hooks i lint-staged
- [`prettier.config.js`](../../../prettier.config.js) — konfiguracja Prettier (linie 1-8)
- [`package.json`](../../../package.json) — dependencies (linie 164, 178, 182, 204-206) i skrypty (linie 39-40)
- [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json) — integracja z lint-staged
- [`.prettierignore`](../../../.prettierignore) — wykluczenia z formatowania
- [deployment](../15-deployment/) — CI/CD workflows
