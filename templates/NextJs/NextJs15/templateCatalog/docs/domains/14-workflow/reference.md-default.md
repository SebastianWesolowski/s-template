# Workflow Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.

## Lokalizacje konfiguracji

- [`.husky/`](../../../.husky/) — Git hooks (pre-commit, prepare-commit-msg, pre-push, post-merge)
- [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json) — konfiguracja lint-staged
- [`.commitlintrc.js`](../../../.commitlintrc.js) — konfiguracja commitlint i cz-git
- [`.github/workflows/`](../../../.github/workflows/) — GitHub Actions workflows (CI/CD)
- [`package.json`](../../../package.json) — skrypty workflow (husky:\*, commit, prepare, release)

## Git Hooks (Husky)

### Struktura plików

- `.husky/pre-commit` — hook uruchamiany przed commitem
- `.husky/prepare-commit-msg` — hook formatujący commit message z Linear integration
- `.husky/pre-push` — hook uruchamiany przed pushem
- `.husky/post-merge` — hook uruchamiany po merge (auto-install dependencies)

### Pre-commit Hook

Plik: [`.husky/pre-commit`](../../../.husky/pre-commit)

**Funkcjonalność:**

- Sprawdzanie synchronizacji brancha z main (fetch + rev-list)
- Sprawdzanie synchronizacji z remote branch
- Uruchamianie lint-staged (prettier, eslint, stylelint, jest)
- Automatyczne aktualizowanie test snapshots
- Aktualizacja VS Code colors przy zmianie tailwind.config.ts

**Komendy wywoływane:**

- `yarn husky:pre-commit` — lint-staged z konfiguracją

### Prepare-commit-msg Hook

Plik: [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg)

**Funkcjonalność:**

- Formatowanie commit message z emoji i Linear issue number
- Wyciąganie commit type (feat, fix, docs, etc.)
- Walidacja przez commitlint
- Fallback do czg wizard przy nieudanej walidacji

**Format commit message:**

```
<type>: <emoji> [SC-XXX] <subject>
```

**Przykład:**

```
feat: ✨ [SC-123] add primary button component
```

### Pre-push Hook

Plik: [`.husky/pre-push`](../../../.husky/pre-push)

**Funkcjonalność:**

- Uruchamianie pełnego lint check
- Uruchamianie smoke tests

**Komendy wywoływane:**

- `yarn husky:pre-push` → `run-p lint:check test:smoke`

### Post-merge Hook

Plik: [`.husky/post-merge`](../../../.husky/post-merge)

**Funkcjonalność:**

- Automatyczna instalacja dependencies po merge

**Komenda:**

- `yarn` — instalacja dependencies

## Lint-staged Configuration

Plik: [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json)

**Konfiguracja:**

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

**Zachowanie:**

- Dla JS/TS/JSX/TSX: prettier → eslint → jest (tylko zmienione pliki)
- Dla JSON/MD/YML: prettier
- Dla CSS: stylelint

## Commitlint Configuration

Plik: [`.commitlintrc.js`](../../../.commitlintrc.js)

**Główne ustawienia:**

- **extends**: `['@commitlint/config-conventional']` — bazowa konfiguracja Conventional Commits
- **rules.type-enum**: `['breaking', 'chore', 'ci', 'clean', 'config', 'docs', 'feat', 'fix', 'refactor', 'release', 'test']`
- **rules.header-max-length**: `128` znaków
- **rules.header-min-length**: `3` znaki

**cz-git prompt configuration:**

- **useEmoji**: `true` — emoji w commit messages
- **skipQuestions**: `['scope', 'customScope', 'body', 'breaking', 'footerPrefix']` — uproszczony workflow
- **issueTag**: z `package.json.config.issueTag` (domyślnie `"SC"`)
- **formatMessageCB**: custom formatting z Linear issue number

**Commit types z emoji:**

- `feat`: ✨ (new feature)
- `fix`: 🐛 (bug fix)
- `docs`: 📚️ (documentation)
- `style`: 💄 (formatting)
- `refactor`: ♻️ (refactoring)
- `perf`: ⚡ (performance)
- `test`: 🚨 (tests)
- `build`: 📦 (build system)
- `ci`: 🎡 (CI changes)
- `chore`: 🔧 (other changes)
- `revert`: ⏪ (revert)

## Package.json Scripts

### Git Hooks Scripts

- `husky:commit-msg` — `commitlint --edit ${HUSKY_GIT_PARAMS:-$1}`
- `husky:pre-commit` — `lint-staged -c ./.husky/lint-staged.config.json`
- `husky:pre-push` — `run-p lint:check test:smoke`
- `husky:prepare-commit-msg` — `exec < /dev/tty && yarn commit --hook || true`

### Commit Scripts

- `commit` — `czg` (cz-git wizard)
- `prepare` — `husky` (init Husky hooks)

### Release Scripts

- `release` — `semantic-release --debug`
- `release:dry` — `cross-env SKIP_TRANSFORM=true semantic-release --debug --dry-run`

## GitHub Actions Workflows

Lokalizacja: [`.github/workflows/`](../../../.github/workflows/)

### Główne Workflows

- **`ci.yml`** — Main CI/CD pipeline (trigger: push/PR na main/develop/feature/\*)
- **`reusable-setup.yml`** — Setup job (Node.js, cache, dependencies, release type detection)
- **`reusable-lint.yml`** — Lint job (ESLint, Prettier, Stylelint, TypeScript)
- **`reusable-test.yml`** — Test job (Jest, Playwright)
- **`reusable-build.yml`** — Build job (Next.js build z cache)
- **`reusable-release.yml`** — Release job (Semantic Release automation)
- **`bundle-analysis.ready-yml`** — Bundle analysis workflow
- **`preRelease.fixit-yml`** — Pre-release workflow

### CI Workflow (`ci.yml`)

**Trigger:**

- Push na: `main`, `master`, `develop`, `dev`, `feature/*`
- Pull Request na: `main`, `master`, `develop`, `dev`

**Jobs:**

1. `setup` — Setup environment (Node.js 22.x, Playwright, cache)
2. `lint` — Linting (ESLint, Prettier, Stylelint, TypeScript)
3. `test` — Testing (Jest, Playwright)
4. `build` — Build application
5. `release` — Semantic Release (tylko dla main/develop)

**Concurrency:**

- Group: `${{ github.workflow }}-${{ github.ref }}`
- Cancel in progress: `true`

## Conventional Commits Format

**Format:**

```
<type>: <emoji> [<issue-number>] <subject>

[optional body]

[optional footer]
```

**Przykłady:**

```bash
feat: ✨ [SC-123] add user authentication
fix: 🐛 [SC-456] resolve database timeout
docs: 📚️ update API documentation
style: 💄 format code with prettier
refactor: ♻️ extract user service logic
test: 🚨 add unit tests for auth
chore: 🔧 update dependencies
```

**Breaking Changes:**

```bash
feat!: ✨ [SC-789] change API response format
BREAKING CHANGE: API now returns data in 'result' field
```

## Branching Strategy

**Branch Types:**

- `main` — Production-ready code
- `develop` — Integration branch for features
- `feature/*` — New features and enhancements
- `hotfix/*` — Critical bug fixes
- `release/*` — Release preparation

**Merge Strategy:**

- Feature branches → `develop` (via PR)
- Hotfix branches → `main` (via PR)
- Release branches → `main` (via PR)
- `develop` → `main` (via release process)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja workflow i filozofia
- [`technical.md`](technical.md) — szczegółowy przewodnik implementacji
- [`../5-issue-tracking/`](../5-issue-tracking/) — Linear integration i commit conventions
- [`../15-deployment/`](../15-deployment/) — deployment workflow i CI/CD
- [`../9-code-quality/`](../9-code-quality/) — quality gates i linting tools
- [`.husky/`](../../../.husky/) — Git hooks (reference)
- [`.github/workflows/`](../../../.github/workflows/) — CI/CD workflows (reference)
- [`.commitlintrc.js`](../../../.commitlintrc.js) — commitlint config (reference)
- [`package.json`](../../../package.json) — scripts i dependencies (reference)
