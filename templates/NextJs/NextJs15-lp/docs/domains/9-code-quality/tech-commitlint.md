# Commitlint Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
Commitlint waliduje format commit messages zgodnie z Conventional Commits. Jest już zainstalowane i skonfigurowane z integracją czg (Commitizen) i automatycznym formatowaniem przez Husky hooks.

**Dokumentacja:** [Commitlint Docs](https://commitlint.js.org/)

## Rola Commitlint w projekcie

Walidacja formatu commit messages przed commitem. Zapewnia spójność komunikatów, ułatwia generowanie changelogów i integrację z Linear issues. Działa przez Husky hook `prepare-commit-msg`, który wykonuje zarówno walidację Commitlint jak i automatyczne formatowanie.

**Szczegóły:** [overview.md](overview.md) — filozofia code quality

## Konfiguracja

**Pełna konfiguracja:** [.commitlintrc.js](../../../.commitlintrc.js)

**Konfiguracja bazowa:** `@commitlint/config-conventional` — standard Conventional Commits

### Niestandardowe rozwiązania projektu

#### 1. Dynamiczne pobieranie issueTag z package.json

Projekt odczytuje prefix issue tag z `package.json` zamiast hardcode:

[.commitlintrc.js](../../../.commitlintrc.js) linie 2-3

```js
const pkg = require('./package.json');
const issueTag = pkg.config?.issueTag || 'SC';
```

**Konfiguracja:** [package.json](../../../package.json) linia 248

- Konfigurowalne bez edycji `.commitlintrc.js`
- Default: `SC` (można zmienić na `JIRA`, `TICKET`, etc.)
- Używane w promptach i formatowaniu

#### 2. formatMessageCB — automatyczne dodawanie SC-XXX

Niestandardowa funkcja formatująca commit message z automatycznym dodawaniem issue prefix:

[.commitlintrc.js](../../../.commitlintrc.js) linie 78-86

```js
formatMessageCB: ({ defaultMessage, footer }) => {
  if (!footer) {
    return defaultMessage;
  } else {
    const lines = defaultMessage.split('\n');
    lines.pop();
    return lines.join('\n') + '\n' + issueTag + '-' + footer.replace(/\s/g, '');
  }
},
```

- Automatycznie dodaje `SC-XXX` do końca commita (nie inline)
- Usuwa spacje z numeru issue

**Przykład:**

Przed formatMessageCB:

```
feat: ✨ add new button component

123
```

Po formatMessageCB:

```
feat: ✨ add new button component

SC-123
```

Issue number `123` jest przekształcone na `SC-123` i dodane jako footer (nie w tytule).

#### 3. Skip questions — szybszy workflow

Pomijanie niepotrzebnych pytań dla szybkiego tworzenia commitów:

[.commitlintrc.js](../../../.commitlintrc.js) linia 66

```js
skipQuestions: ['scope', 'customScope', 'body', 'breaking', 'footerPrefix'],
```

- Pomija: scope, body, breaking changes, footer prefix
- Wizualizuje tylko: type, subject, issue number
- Przyspiesza proces commita

#### 4. Aliasy — skróty dla szybkich commitów

Wbudowane aliasy dla często używanych typów:

[.commitlintrc.js](../../../.commitlintrc.js) linia 17

```js
alias: { fd: 'docs: fix typos' },
```

**Przykład:** Wpisanie `fd` w wizardzie automatycznie wybiera `docs: fix typos`

#### 5. Husky prepare-commit-msg — automatyczne formatowanie

Bash script automatycznie formatuje commit message przed walidacją:

[.husky/prepare-commit-msg](../../../.husky/prepare-commit-msg) — automatyczne:

- Wyciąganie typu commita, emoji i numeru issue (SC-XXX)
- Formatowanie: `type: emoji [SC-XXX] description`
- Fallback do czg wizard gdy commitlint nie przejdzie
- Pomijanie dla amend commits

**Szczegóły:** [tech-husky.md](tech-husky.md) — Git hooks configuration

### Rozszerzona lista typów commitów

Projekt używa więcej typów niż standardowe Conventional Commits:

[.commitlintrc.js](../../../.commitlintrc.js) linie 8-12

```js
'type-enum': [
  2,
  'always',
  ['breaking', 'chore', 'ci', 'clean', 'config', 'docs', 'feat', 'fix', 'refactor', 'release', 'test'],
],
```

**Dodatkowe typy:**

- `breaking` — breaking changes
- `clean` — czyszczenie kodu
- `config` — zmiany konfiguracji
- `release` — release

### Reguły walidacji

[.commitlintrc.js](../../../.commitlintrc.js) linie 13-14

```js
'header-max-length': [2, 'always', 128],
'header-min-length': [2, 'always', 3],
```

- Maksymalna długość nagłówka: 128 znaków
- Minimalna długość nagłówka: 3 znaki

## Dependencies

Commitlint i konfiguracje są zainstalowane w projekcie:

**Pełna lista:** [package.json](../../../package.json) linie 133-134, 140, 170

**Główne:**

- `@commitlint/cli` — walidacja commit messages
- `@commitlint/config-conventional` — standard Conventional Commits
- `czg` — Commitizen adapter z emoji support
- `@ryansonshine/commitizen` — Commitizen preset

## Użycie

### Podstawowe komendy

```bash
# Interaktywne tworzenie commita (czg wizard)
yarn commit

# Manualna walidacja
echo "feat: ✨ [SC-123] description" | npx commitlint

# Walidacja ostatniego commita
npx commitlint --from HEAD~1 --to HEAD --verbose
```

**Szczegóły skryptów:** [package.json](../../../package.json) linie 54, 58

### Automatyczna walidacja przez Husky

Commitlint uruchamiany automatycznie przez Husky hook `prepare-commit-msg`:

**Workflow:**

1. `prepare-commit-msg` → walidacja przez Commitlint (sprawdza format wiadomości)
2. Jeśli walidacja fail → uruchamia wizard (`yarn commit`) dla poprawnego formatu
3. Jeśli walidacja pass → automatyczne formatowanie (prefiks, emoji, SC-XXX) przez bash script

**Szczegóły:** [tech-husky.md](tech-husky.md) — Git hooks configuration, [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg)

## Format commit message

### Podstawowy format

```
type: emoji [ISSUE] short description
```

### Przykłady

```bash
# Feature
feat: ✨ [SC-123] add primary button component

# Bug fix
fix: 🐛 [SC-456] resolve memory leak in component

# Documentation
docs: 📚️ [SC-789] update API documentation

# Breaking change
feat!: ✨ [SC-123] change Button API (breaking change)
```

**Wynik formatMessageCB:** `SC-XXX` jest automatycznie dodawany do końca commita jako footer

## Integracja z workflow

### Husky Hooks

**Szczegóły:** [tech-husky.md](tech-husky.md) — Git hooks i automatyczne formatowanie

### Linear Integration

Automatyczne linkowanie Linear issues w changelogach przez `.releaserc.js`:

**Szczegóły:** [5-issue-tracking](../5-issue-tracking/) — Linear integration i SC-XXX linking

### Semantic Release

Commitlint wspiera automatyczne generowanie changelogów:

**Szczegóły:** [deployment](../15-deployment/) — Semantic Release configuration

## Troubleshooting

### Problem: Commitlint blokuje commit

**Możliwe przyczyny:**

- Nieprawidłowy format commit message
- Typ commita nie jest na liście dozwolonych
- Przekroczona maksymalna długość nagłówka (128 znaków)

**Rozwiązanie:**

1. Użyj `yarn commit` (czg wizard) dla poprawnego formatu
2. Sprawdź listę dozwolonych typów w [`.commitlintrc.js`](../../../.commitlintrc.js)
3. Skróć opis commita (max 128 znaków)

### Problem: Linear issue prefix nie działa

**Możliwe przyczyny:**

- Brak `config.issueTag` w `package.json`
- Nieprawidłowa konfiguracja `formatMessageCB`

**Rozwiązanie:**

1. Sprawdź [`package.json`](../../../package.json) — `config.issueTag` (default: `SC`)
2. Sprawdź [`.commitlintrc.js`](../../../.commitlintrc.js) — `formatMessageCB` funkcja (linie 78-86)

### Debug konfiguracji

```bash
# Sprawdź wersję Commitlint
npx commitlint --version

# Test walidacji
echo "feat: test" | npx commitlint

# Verbose output
echo "feat: test" | npx commitlint --verbose
```

## Wystąpienia

- [`overview.md`](overview.md) — filozofia code quality
- [`technical.md`](technical.md) — architektura jakości i integracja z innymi narzędziami
- [`tech-husky.md`](tech-husky.md) — Git hooks i walidacja commitów
- [`.commitlintrc.js`](../../../.commitlintrc.js) — konfiguracja Commitlint
- [`package.json`](../../../package.json) — dependencies, skrypty, config.issueTag
- [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg) — automatyczne formatowanie
- [`.releaserc.js`](../../../.releaserc.js) — integracja z Semantic Release
- [5-issue-tracking](../5-issue-tracking/) — Linear integration
- [deployment](../15-deployment/) — Semantic Release configuration

## Oficjalna dokumentacja

- Commitlint — https://commitlint.js.org/
- Configuration — https://commitlint.js.org/reference/configuration
- Rules — https://commitlint.js.org/reference/rules
- Conventional Commits — https://www.conventionalcommits.org/
- Commitizen — https://github.com/commitizen/cz-cli
- czg — https://github.com/Zhengqbbb/cz-git
