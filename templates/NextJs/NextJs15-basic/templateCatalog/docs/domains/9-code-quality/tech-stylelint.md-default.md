# Stylelint Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
Stylelint zapewnia linting i automatyczne naprawianie błędów w plikach CSS/SCSS/SASS. Jest już zainstalowane i skonfigurowane z integracją Tailwind CSS i wsparciem dla nowoczesnych funkcji CSS.

**Dokumentacja:** [Stylelint Docs](https://stylelint.io/)

## Rola Stylelint w projekcie

Linting i autofix dla stylów w edytorze i na bramkach (lint-staged). Integruje się z Tailwind CSS, sprawdza wsparcie przeglądarek i utrzymuje spójny porządek właściwości CSS.

**Szczegóły:** [overview.md](overview.md) — filozofia code quality

## Konfiguracja

**Pełna konfiguracja:** [stylelint.config.js](../../../stylelint.config.js)

### Niestandardowe rozwiązania projektu

#### 1. Transform Browser List

Projekt używa własnego narzędzia do parsowania `.browserslistrc`:

[stylelint.config.js](../../../stylelint.config.js) linia 1

```js
const browsersList = require('./tools/transform-browser-list/index')('./.browserslistrc');
```

[tools/transform-browser-list/index.js](../../../tools/transform-browser-list/index.js) — niestandardowe narzędzie konwertujące `.browserslistrc` na tablicę dla plugin `stylelint-no-unsupported-browser-features`.

**Dlaczego jest potrzebne:** Plugin `stylelint-no-unsupported-browser-features` wymaga tablicy stringów, a `.browserslistrc` jest plikiem tekstowym z query (np. `> 0.5%`, `last 2 versions`). Transform-browser-list czyta plik linia po linii i zwraca tablicę do użycia w konfiguracji Stylelint.

**Przykład transformacji:**

`.browserslistrc`:

```
> 0.5%
last 2 versions
not dead
```

Transform do array:

```js
['> 0.5%', 'last 2 versions', 'not dead'];
```

#### 2. Browser Support jako Warningi

Sprawdzanie wsparcia przeglądarek nie blokuje commita — ostrzeżenia zamiast błędów:

[stylelint.config.js](../../../stylelint.config.js) linie 41-48

```js
'plugin/no-unsupported-browser-features': [
  true,
  {
    severity: 'warning',  // nie blokuje commita
    browsers: browsersList,
    ignorePartialSupport: true,
  },
],
```

#### 3. Rational Order Customizacja

Sortowanie właściwości CSS z wyłączonymi niektórymi opcjami:

[stylelint.config.js](../../../stylelint.config.js) linie 19-25

```js
'plugin/rational-order': [
  true,
  {
    'border-in-box-model': false,
    'empty-line-between-groups': false,
  },
],
```

#### 4. Tailwind CSS Integration

Podwójne ignorowanie Tailwind at-rules (CSS + SCSS):

[stylelint.config.js](../../../stylelint.config.js) linie 28-40

```js
'at-rule-no-unknown': [
  true,
  {
    ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen'],
  },
],
'scss/at-rule-no-unknown': [
  true,
  {
    ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen'],
  },
],
```

### Standardowe configs i pluginy

**Configs:**

- `stylelint-config-standard` — standardowe reguły
- `stylelint-config-standard-scss` — wsparcie SCSS
- `stylelint-config-tailwindcss` — integracja Tailwind
- `stylelint-config-rational-order-fix` — sortowanie właściwości

**Pluginy:**

- `stylelint-scss` — linting SCSS
- `stylelint-no-unsupported-browser-features` — sprawdzanie wsparcia przeglądarek
- `stylelint-order` — sortowanie właściwości

**Pełna lista dependencies:** [package.json](../../../package.json) linie 210-218

## Użycie

### Podstawowe komendy

```bash
# Sprawdź style
yarn lint:style:check

# Automatyczne naprawianie błędów
yarn lint:style:fix

# Pełny lint (włącznie z Stylelint)
yarn lint
```

**Szczegóły skryptów:** [package.json](../../../package.json) linie 44-45

### Integracja z Git hooks

Stylelint uruchamiany automatycznie na staged files przez lint-staged:

[.husky/lint-staged.config.json](../../../.husky/lint-staged.config.json) linia 8

```json
"src/**/*.{css,scss,sass}": ["stylelint --fix --allow-empty-input"]
```

**Szczegóły:** [tech-husky.md](tech-husky.md) — konfiguracja Git hooks

## Kluczowe funkcje

### Browser Support Checking

Plugin sprawdza wsparcie przeglądarek na podstawie `.browserslistrc`:

- Ostrzeżenia dla nieobsługiwanych funkcji CSS
- `severity: 'warning'` — nie blokuje commita
- `ignorePartialSupport: true` — ignoruje częściowe wsparcie

### Property Ordering

Automatyczne sortowanie właściwości CSS:

- Grupowanie właściwości logicznie
- Auto-fix dostępny
- Customizacja przez `plugin/rational-order`

### Selector Patterns

Reguła `selector-class-pattern` wymusza spójne nazewnictwo:

- Pattern: `^[a-zA-Z0-9-_]+$`
- Obsługa camelCase, kebab-case, snake_case

### Inlinowe wyłączanie reguł

Przykład użycia w kodzie:

[src/styles/global.scss](../../../src/styles/global.scss) linie 4-19

```scss
/* stylelint-disable-next-line no-vendor-prefix, property-no-vendor-prefix */
/* stylelint-disable plugin/no-unsupported-browser-features */
::selection {
  color: #242424;
  text-shadow: none;
  background-color: #f9b80f;
}
/* stylelint-enable plugin/no-unsupported-browser-features */
```

## Integracja z workflow

### IDE (VS Code)

- Extension: `stylelint.vscode-stylelint`
- Auto-fix on save (opcjonalnie)

### Git Hooks

**Szczegóły:** [tech-husky.md](tech-husky.md) — Git hooks i lint-staged

### CI/CD

**Szczegóły:** [deployment](../15-deployment/) — CI/CD workflows

## Troubleshooting

### Problem: Błędy dla Tailwind directives

**Możliwe przyczyny:**

- Brak `ignoreAtRules` dla Tailwind
- Nieprawidłowa konfiguracja `stylelint-config-tailwindcss`

**Rozwiązanie:**

1. Sprawdź [`stylelint.config.js`](../../../stylelint.config.js) — `ignoreAtRules` powinno zawierać `tailwind`, `apply`, `layer`
2. Upewnij się, że `stylelint-config-tailwindcss` jest w `extends`

### Problem: Stylelint nie działa w IDE

**Rozwiązanie:**

1. Zainstaluj extension: `stylelint.vscode-stylelint`
2. Ustaw Stylelint jako default linter w VS Code settings
3. Włącz `editor.codeActionsOnSave` dla CSS/SCSS

### Debug konfiguracji

```bash
# Sprawdź wersję Stylelint
npx stylelint --version

# Debug konfiguracji
npx stylelint --print-config 'src/**/*.css'

# Test na konkretnym pliku
npx stylelint 'src/styles/global.scss' --config stylelint.config.js
```

## Wystąpienia

- [`overview.md`](overview.md) — filozofia code quality
- [`technical.md`](technical.md) — architektura jakości i integracja z innymi narzędziami
- [`tech-husky.md`](tech-husky.md) — Git hooks i lint-staged
- [`tech-prettier.md`](tech-prettier.md) — formatowanie (integracja)
- [`stylelint.config.js`](../../../stylelint.config.js) — konfiguracja Stylelint
- [`package.json`](../../../package.json) — dependencies i skrypty
- [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json) — integracja z lint-staged
- [`tools/transform-browser-list/`](../../../tools/transform-browser-list/) — niestandardowe narzędzie
- [deployment](../15-deployment/) — CI/CD workflows

## Oficjalna dokumentacja

- Stylelint — https://stylelint.io/
- Configuration — https://stylelint.io/user-guide/configure
- Rules — https://stylelint.io/user-guide/rules
- Plugins — https://stylelint.io/user-guide/plugins
