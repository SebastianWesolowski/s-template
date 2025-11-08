# Maintenance Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Lokalizacje konfiguracji

- [`package.json`](../../../package.json) — maintenance scripts (quality:knip, quality:coupling:graph, quality:coverage, build:analyze, update-template)
- [`renovate.json`](../../../renovate.json) — Renovate Bot configuration
- [`.husky/`](../../../.husky/) — Git hooks configuration (pre-commit, commit-msg, pre-push, prepare-commit-msg, post-merge)
- [`.github/workflows/`](../../../.github/workflows/) — CI/CD workflows
- [`knip.json`](../../../knip.json) — Knip configuration (unused code detection)
- [`patches/`](../../../patches/) — patch-package patches
- [`.releaserc.js`](../../../.releaserc.js) — Semantic Release configuration

## Kluczowe skrypty (package.json)

### Quality Monitoring

- **`yarn quality:knip`** — Unused code detection (Knip)
- **`yarn quality:coupling:graph`** — Coupling analysis graph (Madge) - generates `reports/coupling.svg` and `reports/coupling.png`
- **`yarn quality:coupling:json`** — Coupling analysis JSON (Madge) - generates `reports/coupling.json`
- **`yarn quality:coverage`** — Test coverage report (Jest) - generates `reports/coverage/`
- **`yarn build:analyze`** — Bundle size analysis (Next.js Bundle Analyzer)

### Dependency Management

- **`yarn update-template`** — Template propagation (s-update-manager) - updates from remote template repository
- **`yarn update-template:build`** — Template build and update (s-build)
- **`postinstall`** — Automatic patch-package application after npm install

### Git Hooks (Husky)

- **`yarn husky:pre-commit`** — Pre-commit hook (lint-staged)
- **`yarn husky:commit-msg`** — Commit message validation (commitlint)
- **`yarn husky:prepare-commit-msg`** — Commit message formatting (czg)
- **`yarn husky:pre-push`** — Pre-push hook (lint:check + test:smoke)

## Renovate Bot Configuration

**Plik:** [`renovate.json`](../../../renovate.json)

**Aktualna konfiguracja:**
- `enabled: false` — wszystkie package updates wyłączone
- `vulnerabilityAlerts.enabled: true` — security alerts włączone
- `osvVulnerabilityAlerts: true` — OSV (Open Source Vulnerability) alerts włączone

**Status:** Konfiguracja gotowa, ale updates wyłączone. Wymaga włączenia przez zmianę `enabled: false` na `enabled: true` w packageRules.

## Knip Configuration

**Plik:** [`knip.json`](../../../knip.json)

**Funkcjonalność:**
- Wykrywa nieużywane pliki
- Wykrywa nieużywane exports
- Wykrywa nieużywane dependencies
- Wykrywa dead code

**Użycie:**
```bash
yarn quality:knip
```

## Git Hooks (Husky)

**Lokalizacja:** [`.husky/`](../../../.husky/)

**Hooki:**
- `prepare-commit-msg` — commit message formatting (czg)
- `commit-msg` — commitlint validation
- `pre-commit` — lint-staged + branch sync + snapshot management
- `pre-push` — full quality check + smoke tests
- `post-merge` — auto dependency install

**Szczegóły:** [`../9-code-quality/tech-husky.md`](../9-code-quality/tech-husky.md)

## CI/CD Workflows

**Lokalizacja:** [`.github/workflows/`](../../../.github/workflows/)

**Workflows:**
- `ci.yml` — continuous integration
- `reusable-*.yml` — reusable workflows (setup, build, release)
- Bundle analysis workflow
- Release workflows

**Szczegóły:** [`../15-deployment/`](../15-deployment/)

## Semantic Release Configuration

**Plik:** [`.releaserc.js`](../../../.releaserc.js)

**Funkcjonalność:**
- Automatic versioning (Conventional Commits)
- Changelog generation
- GitHub Releases
- Multi-branch support (production, preprod, beta, feature)

**Użycie:**
```bash
yarn release        # Production release
yarn release:dry    # Dry run release
```

## patch-package Configuration

**Lokalizacja:** [`patches/`](../../../patches/)

**Konfiguracja:** [`package.json`](../../../package.json) - postinstall hook

**Funkcjonalność:**
- Custom fixes dla dependencies
- Automatyczne aplikowanie patchy po `npm install`
- Patchy przechowywane w `patches/` directory

**Workflow:**
1. Edytuj kod w `node_modules/package-name/`
2. Uruchom `npx patch-package package-name`
3. Patch zapisany w `patches/package-name+version.patch`
4. Patch automatycznie aplikowany przez postinstall hook

## Uruchamianie lokalne

### Quality Monitoring

```bash
# Unused code detection
yarn quality:knip

# Coupling analysis (graph)
yarn quality:coupling:graph

# Coupling analysis (JSON)
yarn quality:coupling:json

# Test coverage
yarn quality:coverage

# Bundle analysis
yarn build:analyze
```

### Dependency Management

```bash
# Template update
yarn update-template

# Template build and update
yarn update-template:build

# Security audit
npm audit

# Security audit fix
npm audit fix
```

### Git Hooks

```bash
# Manual hook execution
yarn husky:pre-commit
yarn husky:commit-msg
yarn husky:pre-push
```

## Wystąpienia

- [README.md](README.md) — domena entry point
- [overview.md](overview.md) — koncepcja i filozofia Maintenance Strategy
- [technical.md](technical.md) — implementacja i troubleshooting
- [tech-dependency-management.md](tech-dependency-management.md) — szczegóły zarządzania zależnościami
- [tech-monitoring.md](tech-monitoring.md) — quality monitoring tools
- [`../4-dependencies/`](../4-dependencies/) — kontekst w Dependency Management
- [`../9-code-quality/`](../9-code-quality/) — Git hooks i quality tools
- [`../15-deployment/`](../15-deployment/) — CI/CD workflows
- [`package.json`](../../../package.json) — Maintenance scripts (reference)
- [`renovate.json`](../../../renovate.json) — Renovate configuration (reference)
- [`.husky/`](../../../.husky/) — Git hooks (reference)
- [`.github/workflows/`](../../../.github/workflows/) — CI/CD workflows (reference)
- [`knip.json`](../../../knip.json) — Knip configuration (reference)
- [`.releaserc.js`](../../../.releaserc.js) — Semantic Release configuration (reference)
