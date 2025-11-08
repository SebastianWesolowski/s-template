# Przewodnik techniczny śledzenia zadań

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Jak zrobić poprawny commit z SC-XXX

### Użyj czg wizard

```bash
yarn commit
```

**Co się dzieje:**

1. czg wizard otwiera interaktywny prompt
2. Wybierasz type (feat, fix, docs, etc.)
3. Wpisujesz description
4. Wpisujesz SC-XXX issue number (opcjonalnie)
5. `.husky/prepare-commit-msg` automatycznie formatuje commit message

**Przykładowy output:**

```
type: feat
description: add primary button component
issue: 123
→ feat: ✨ [SC-123] add primary button component
```

### Auto-formatting przez Husky

```12:16:.husky/prepare-commit-msg
get_issue_number() {
    local issue=$(echo "$1" | grep -oE "SC-[0-9]+" | head -n1)
    # Return "NO-TICKET" if no issue number found
    echo "${issue:-NO-TICKET}"
}
```

**SC-XXX ekstrakcja:**

- Wyciąga `SC-XXX` z commit message za pomocą regex `SC-[0-9]+`
- Jeśli brak SC-XXX, używa "NO-TICKET"
- Formatuje na `type: emoji [SC-XXX] description`

### Wspierane formaty SC-XXX

- `SC-123` - bezpośredni w commit message
- `[SC-123]` - w nawiasach kwadratowych
- `(SC-123)` - w nawiasach okrągłych

**Przykłady:**

```bash
feat add button SC-123
→ feat: ✨ [SC-123] add button

fix: 🐛 SC-456 login bug
→ fix: 🐛 [SC-456] login bug

docs update readme (SC-789)
→ docs: 📚 [SC-789] update readme
```

## Jak zmienić issue tag (SC → inna)

### Pliki do edycji

1. **package.json** - zmień `config.issueTag` na nowy prefix
2. **.commitlintrc.js** - używa `pkg.config?.issueTag` automatycznie
3. **.releaserc.js** - zmień regex pattern z `SC-` na nowy prefix

Szczegółowa implementacja w [`reference.md`](reference.md#issue-tag-configuration).

**Proces:**

- Zmiana w `package.json` propaguje się do `.commitlintrc.js`
- W `.releaserc.js` musisz ręcznie zmienić regex pattern dla nowego prefixu
- Przykład: `SC-123` → `JIRA-123` wymaga zmiany regex z `/\[?(SC-\d+)\]?/` na `/\[?(JIRA-\d+)\]?/`

## Jak działa changelog generation

### Jak działa transform function

Implementacja w [`.releaserc.js`](../../../.releaserc.js#L147-L158).

**Proces:**

1. Regex ekstrahuje SC-XXX z commit.subject
2. Tworzy `scIssue` property dla grupowania
3. Zamienia SC-XXX na klikalny link do Linear issue
4. Gruppuje commity po scIssue w changelog sections

### Przykład wygenerowanego changelog

```markdown
## [1.2.0]

### [SC-123](https://linear.app/wesolowskidev/issue/SC-123)

- feat: ✨ [[SC-123](https://linear.app/wesolowskidev/issue/SC-123)] add authentication ([abc1234](https://github.com/repo/commit/abc1234))

### Other tasks

- chore: 🔧 update dependencies ([def5678](https://github.com/repo/commit/def5678))
```

## Troubleshooting

### Commit message rejected przez commitlint

**Problem:** commitlint odrzuca commit message.

**Rozwiązanie:**

```bash
# Sprawdź aktualny format
yarn commitlint --from HEAD~1 --to HEAD

# Jeśli błąd w type-enum, dodaj nowy typ do .commitlintrc.js
# Jeśli błąd w header-length, skróć subject
```

**Common errors:**

- `type must be lowercase` → użyj lowercase w commit message
- `subject may not be empty` → dodaj description
- `type must be one of [feat, fix, ...]` → dodaj nowy typ do rules.type-enum

### czg wizard nie działa

**Problem:** `yarn commit` nie otwiera czg wizard.

**Rozwiązanie:**

```bash
# Reinstal husky hooks
yarn prepare

# Sprawdź czy czg jest zainstalowany
yarn why czg

# Reinstal dependencies
yarn install
```

### SC-XXX nie pojawia się w changelog

**Problem:** SC-XXX w commit message, ale brak linku w changelog.

**Rozwiązanie:**

1. Sprawdź czy SC-XXX jest w poprawnym formacie: `SC-123`, `[SC-123]`, `(SC-123)`
2. Sprawdź `.releaserc.js` regex pattern:

```javascript
/\[?(SC-\d+)\]?/; // powinien pasować do wszystkich formatów
```

3. Sprawdź czy `semantic-release` uruchamia się na branch'u:

```bash
yarn release:dry  # test dry-run
```

### Issue tag nie działa dla nowego typu

**Problem:** Zmieniłeś issue tag w package.json, ale nie działa.

**Rozwiązanie:**

1. Upewnij się, że zmieniony w `.commitlintrc.js`:

```javascript
const issueTag = pkg.config?.issueTag || 'SC';
```

2. Upewnij się, że zmieniony w `.releaserc.js` regex
3. Upewnij się, że formatMessageCB używa issueTag

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia issue tracking
- [`reference.md`](reference.md) — kompletna referencja konfiguracji i jak rozszerzyć
- [`tech-cz-git.md`](tech-cz-git.md) — szczegóły cz-git configuration
- [`README.md`](README.md) — Quick Start dla issue tracking
- [`../14-workflow/`](../14-workflow/) — kontekst Git workflow
- [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg) — Git hook implementation
- [`.commitlintrc.js`](../../../.commitlintrc.js) — Commitlint config (reference)
