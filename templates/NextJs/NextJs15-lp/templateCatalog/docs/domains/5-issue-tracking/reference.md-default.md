# Issue Tracking Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.

## Pliki konfiguracyjne

### package.json

```244:249:package.json
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    },
    "issueTag": "SC"
  }
```

**Config.commitizen.path**

- Type: `string`
- Default: `"node_modules/cz-git"`
- Description: Ścieżka do cz-git adaptera dla commitizen
- Used by: `yarn commit` (czg wizard)

**Config.issueTag**

- Type: `string`
- Default: `"SC"`
- Description: Prefix issue tag (SC, JIRA, TICKET, etc.)
- Used by: `.commitlintrc.js`, `.releaserc.js`
- Example: `"JIRA"` dla Jira issues

### .commitlintrc.js

Kompletny plik: [`.commitlintrc.js`](../../../.commitlintrc.js)

**Specyficzne dla projektu:**

- **prompt.formatMessageCB** - custom SC-XXX prefix formatting (linie 118-126)
- **prompt.skipQuestions** - pomija body, scope dla szybszego workflow (linia 106)
- **prompt.types** - lista typów z emoji (linie 65-89)

Reszta zgodna z [cz-git documentation](https://github.com/Zhengqbbb/cz-git).

### .releaserc.js

Transform function dla SC-XXX linking (linie 147-166):

```javascript
const scMatch = commit.subject ? commit.subject.match(/\[?(SC-\d+)\]?/) : null;
if (scMatch) {
  const scIssue = scMatch[1];
  result.scIssue = scIssue;
  // Replace SC issue with linked version
  result.subject = commit.subject.replace(
    /\[?(SC-\d+)\]?/,
    `[[${scIssue}](https://linear.app/wesolowskidev/issue/${scIssue})]`
  );
} else {
  result.scIssue = 'Other tasks';
}
```

**Regex pattern:** `/\[?(SC-\d+)\]?/`

- Matchuje: `SC-123`, `[SC-123]`, `(SC-123)`
- Ekstrahuje tylko number

**URL construction:**

- Base: `https://linear.app/wesolowskidev/issue/SC-123`
- Gruppuje commity po scIssue
- Tworzy sections: `### [SC-123](url)`

Pełny plik: [`.releaserc.js`](../../../.releaserc.js)

### .husky/prepare-commit-msg

SC-XXX extraction i auto-formatting.

**SC-XXX extraction** (linie 12-16):

```bash
get_issue_number() {
    local issue=$(echo "$1" | grep -oE "SC-[0-9]+" | head -n1)
    # Return "NO-TICKET" if no issue number found
    echo "${issue:-NO-TICKET}"
}
```

**Format validation** (linie 29-35):

```bash
get_commit_type() {
    local commit_type=$(echo "$1" | sed -nE 's/^([a-z]+):.*/\1/p')
    local valid_types="feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert"

    [[ -n "$commit_type" && "$commit_type" =~ ^($valid_types)$ ]] && echo "$commit_type" || echo ""
}
```

**Formatowanie output:** `type: emoji [SC-XXX] description`

Kompletny hook: [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg)

## Komendy

### yarn commit

Uruchamia czg wizard dla interactive commit message.

**Usage:**

```bash
yarn commit
```

**Co robi:**

1. Otwiera czg wizard
2. Prompt dla type (feat, fix, etc.)
3. Prompt dla description
4. Prompt dla SC-XXX issue (opcjonalne)
5. Auto-formatuje przez `.husky/prepare-commit-msg`

**Alternatives:**

```bash
npx czg  # bezpośrednie wywołanie
yarn czg  # jeśli zainstalowany globalnie
```

### yarn husky:prepare-commit-msg

Test Husky hook dla commit message formatting.

**Usage:**

```bash
yarn husky:prepare-commit-msg
```

**Co robi:**

1. Sprawdza czy commit message ma poprawny format
2. Ekstrahuje SC-XXX i emoji
3. Formatuje commit message
4. Testuje commitlint walidację

### yarn release

Uruchamia semantic-release dla generowania changelog.

**Usage:**

```bash
yarn release
```

**Co robi:**

1. Analizuje commity od ostatniego release
2. Określa version bump (major/minor/patch)
3. Generuje changelog z linkami do Linear
4. Tworzy git tag i GitHub release
5. Publikuje do NPM (jeśli NPM_TOKEN)

### yarn release:dry

Dry-run semantic-release bez committów i publikacji.

**Usage:**

```bash
yarn release:dry
```

**Co robi:**

1. Symuluje release process
2. Pokazuje jaką wersję by utworzył
3. Pokazuje co by znalazło się w changelog
4. Nie committuje zmian ani nie publikuje

## Commit Message Convention

### Format

```
type: emoji [SC-XXX] description
```

**Przykłady:**

- `feat: ✨ [SC-123] add primary button component`
- `fix: 🐛 [SC-456] fix theme toggle dark mode`
- `docs: 📚 [SC-789] update component documentation`

### Commit Types

**Lista typów z emoji:**

- **feat** - ✨ New feature
- **fix** - 🐛 Bug fix
- **docs** - 📚 Documentation changes
- **style** - 💄 Code style changes
- **refactor** - ♻️ Code refactoring
- **perf** - ⚡ Performance improvements
- **test** - 🧪 Test changes
- **chore** - 🔧 Maintenance tasks
- **ci** - 🎡 CI/CD changes
- **build** - 📦 Build system changes
- **revert** - ⏪ Revert previous commit

Lista typów w konfiguracji: [`.commitlintrc.js`](../../../.commitlintrc.js#L65-L89)

Opis każdego typu: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### SC-XXX Issue Reference Format

**Wspierane formaty:**

- `[SC-123]` - w nawiasach kwadratowych
- `SC-123` - bez nawiasów
- `(SC-123)` - w nawiasach okrągłych

**Ekstrakcja:** `.husky/prepare-commit-msg` automatycznie ekstrahuje SC-XXX i formatuje commit message

**Przykład:**

```
Input:  feat add button SC-123
Output: feat: ✨ [SC-123] add button
```

## Jak rozszerzyć konfigurację

### Jak dodać nowy typ commita

**Pliki do edycji:**

1. **.commitlintrc.js** - dodaj nowy typ do `prompt.types` array
2. **.commitlintrc.js** - dodaj typ do `rules.type-enum` dla walidacji

**Proces:**

- Dodaj `{ value, name, emoji }` do `prompt.types`
- Dodaj `value` do `rules.type-enum` array
- Testuj z `yarn commit` - nowy typ powinien pojawić się w wizard

**Przykład:**

```javascript
// W .commitlintrc.js
prompt: {
  types: [
    { value: 'custom', name: 'custom: Custom change', emoji: '⚙️' },
    // ... inne typy
  ]
},
rules: {
  'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'custom', /* ... */]]
}
```

Szczegółowa implementacja w [`tech-cz-git.md`](tech-cz-git.md#customization-examples).

### Jak dodać nowy scope

**Dwie opcje:**

**Opcja 1: Predefiniowana lista** - dodaj do `prompt.scopes` array w `.commitlintrc.js`

**Opcja 2: Custom scopes** - już włączone (`allowCustomScopes: true`), możesz wpisać dowolny scope w wizard

**Rekomendacja:** Użyj custom scopes (Opcja 2) - szybsze, bez edycji configu, elastyczne dla różnych projektów.

Szczegóły w [`tech-cz-git.md`](tech-cz-git.md#promptscopes---customization).

## Environment Variables

**Brak** - issue tracking nie wymaga żadnych env variables.

Używane tylko przez semantic-release:

- `GH_TOKEN` - dla GitHub releases
- `NPM_TOKEN` - dla NPM publish
- `GITHUB_REF_NAME` - dla branch detection
- `GITHUB_SHA` - dla commit hash

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia issue tracking
- [`technical.md`](technical.md) — praktyczny przewodnik użycia
- [`tech-cz-git.md`](tech-cz-git.md) — szczegóły cz-git configuration i customization
- [`README.md`](README.md) — Quick Start dla issue tracking
- [`../14-workflow/`](../14-workflow/) — kontekst Git workflow
- [`../15-deployment/`](../15-deployment/) — kontekst release management i changelog
- [`memory-bank/workflows.md`](../../../memory-bank/workflows.md) — skrót issue tracking dla AI
- [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg) — Git hook implementation
- [`.commitlintrc.js`](../../../.commitlintrc.js) — Commitlint config (reference)
- [`.releaserc.js`](../../../.releaserc.js) — Semantic-release config (reference)
- [`package.json`](../../../package.json) — config.issueTag configuration
