# Build & Deploy Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## GitHub Actions Workflows API

### Reusable Workflows Structure

Projekt używa modularnych reusable workflows w [`.github/workflows/`](../../../.github/workflows/).

#### reusable-setup.yml

**Inputs:**

| Input              | Typ     | Wymagany | Domyślna            | Opis                        |
| ------------------ | ------- | -------- | ------------------- | --------------------------- |
| `install_args`     | string  | ❌       | `--frozen-lockfile` | Argumenty dla yarn install  |
| `setup_playwright` | boolean | ❌       | `false`             | Czy zainstalować Playwright |
| `node_version`     | string  | ✅       | -                   | Wersja Node.js (np. `22.x`) |

**Outputs:**

| Output                  | Opis                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `node_version`          | Używana wersja Node.js                                                             |
| `cache_keys`            | JSON z kluczami cache (deps_key, lint_key, nextBuild_key, nestBuild_key, test_key) |
| `install_playwright`    | Czy Playwright został zainstalowany                                                |
| `install_deps`          | Czy zależności zostały zainstalowane                                               |
| `setup_summary`         | JSON z podsumowaniem setup                                                         |
| `release_type_detected` | Wykryty typ release (production, preprod, prerelease, feature)                     |
| `framework_type`        | Wykryty typ framework (next, nest, react)                                          |

**Cache Keys Generation:**

```yaml
Cache types:
  - deps: yarn.lock, package.json
  - lint: .eslintrc*, .stylelintrc*, tsconfig*.json
  - nextBuild: next.config.js, package.json, .next
  - nestBuild: nest-cli.json, package.json, dist
  - test: playwright.config.*, .storybook/*, package.json
```

#### reusable-lint.yml

**Inputs:**

| Input                   | Typ     | Wymagany | Domyślna            | Opis                                 |
| ----------------------- | ------- | -------- | ------------------- | ------------------------------------ |
| `cache_keys`            | string  | ❌       | `''`                | JSON z kluczami cache                |
| `eslint_check`          | boolean | ❌       | `true`              | Czy uruchomić ESLint                 |
| `fix_issues`            | boolean | ❌       | `false`             | Czy naprawiać błędy automatycznie    |
| `install_args`          | string  | ❌       | `--frozen-lockfile` | Argumenty dla yarn install           |
| `install_deps`          | string  | ❌       | `false`             | Czy zależności zostały zainstalowane |
| `node_version`          | string  | ✅       | -                   | Wersja Node.js                       |
| `prettier_check`        | boolean | ❌       | `true`              | Czy uruchomić Prettier               |
| `stylelint_check`       | boolean | ❌       | `true`              | Czy uruchomić Stylelint              |
| `typescript_check`      | boolean | ❌       | `true`              | Czy sprawdzić typy TypeScript        |
| `upload_artifacts`      | boolean | ❌       | `true`              | Czy uploadować artefakty             |
| `release_type_detected` | string  | ❌       | `prerelease`        | Typ release                          |
| `framework_type`        | string  | ❌       | `next`              | Typ framework                        |

**Outputs:**

| Output         | Opis                                    |
| -------------- | --------------------------------------- |
| `lint_summary` | JSON z podsumowaniem wyników lintowania |

**Commands:**

- TypeScript: `yarn lint:typescript:check`
- ESLint: `yarn lint:eslint:check` / `yarn lint:eslint:fix`
- Prettier: `yarn lint:prettier:check` / `yarn lint:prettier:fix`
- Stylelint: `yarn lint:style:check` / `yarn lint:style:fix`

#### reusable-test.yml

**Inputs:**

| Input                   | Typ     | Wymagany | Domyślna                    | Opis                                 |
| ----------------------- | ------- | -------- | --------------------------- | ------------------------------------ |
| `cache_keys`            | string  | ❌       | `''`                        | JSON z kluczami cache                |
| `e2e_tests`             | boolean | ❌       | `false`                     | Czy uruchomić E2E tests              |
| `install_args`          | string  | ❌       | `--frozen-lockfile`         | Argumenty dla yarn install           |
| `install_deps`          | string  | ❌       | `false`                     | Czy zależności zostały zainstalowane |
| `install_playwright`    | string  | ❌       | `false`                     | Czy zainstalować Playwright          |
| `node_version`          | string  | ✅       | -                           | Wersja Node.js                       |
| `smoke_tests`           | boolean | ❌       | `false`                     | Czy uruchomić smoke tests            |
| `storybook_build`       | boolean | ❌       | `false`                     | Czy zbudować Storybook               |
| `test_matrix`           | string  | ❌       | `{"browser": ["chromium"]}` | JSON z konfiguracją matrix           |
| `unit_tests`            | boolean | ❌       | `true`                      | Czy uruchomić unit tests             |
| `upload_artifacts`      | boolean | ❌       | `true`                      | Czy uploadować artefakty             |
| `release_type_detected` | string  | ❌       | `prerelease`                | Typ release                          |
| `framework_type`        | string  | ❌       | `next`                      | Typ framework                        |

**Outputs:**

| Output         | Opis                                |
| -------------- | ----------------------------------- |
| `test_summary` | JSON z podsumowaniem wyników testów |

**Commands:**

- Unit tests: `yarn test:unit`
- E2E tests: `yarn test:e2e`
- Smoke tests: `yarn test:smoke`
- Storybook build: `yarn storybook:build`

#### reusable-build.yml

**Inputs:**

| Input                   | Typ     | Wymagany | Domyślna            | Opis                                 |
| ----------------------- | ------- | -------- | ------------------- | ------------------------------------ |
| `analyze_bundle`        | boolean | ❌       | `false`             | Czy analizować bundle size           |
| `cache_keys`            | string  | ❌       | `''`                | JSON z kluczami cache                |
| `install_args`          | string  | ❌       | `--frozen-lockfile` | Argumenty dla yarn install           |
| `install_deps`          | string  | ❌       | `false`             | Czy zależności zostały zainstalowane |
| `node_version`          | string  | ✅       | -                   | Wersja Node.js                       |
| `production_build`      | boolean | ❌       | `true`              | Czy utworzyć production build        |
| `upload_artifacts`      | boolean | ❌       | `true`              | Czy uploadować artefakty             |
| `release_type_detected` | string  | ❌       | `prerelease`        | Typ release                          |
| `framework_type`        | string  | ❌       | `next`              | Typ framework                        |

**Outputs:**

| Output          | Opis                               |
| --------------- | ---------------------------------- |
| `build_summary` | JSON z podsumowaniem wyników build |

**Environment Variables:**

- `NODE_ENV`: `production` jeśli `production_build == true`, w przeciwnym razie `development`
- `ANALYZE`: `true` jeśli `analyze_bundle == true`, w przeciwnym razie `false`

**Commands:**

- Production build: `yarn build:prod`
- Development build: `yarn build`

**Cache Strategy:**

- Next.js: `.next/`, `out/`
- NestJS: `dist/`, `next.config.js`
- Dependencies: `node_modules/`

#### reusable-release.yml

**Inputs:**

| Input                   | Typ    | Wymagany | Domyślna            | Opis                                                       |
| ----------------------- | ------ | -------- | ------------------- | ---------------------------------------------------------- |
| `release_type_detected` | string | ✅       | -                   | Typ release (production, preprod, prerelease, feature, rc) |
| `release_branch`        | string | ❌       | `main`              | Branch do release                                          |
| `install_args`          | string | ❌       | `--frozen-lockfile` | Argumenty dla yarn install                                 |
| `node_version`          | string | ✅       | -                   | Wersja Node.js z setup                                     |
| `install_deps`          | string | ✅       | -                   | Czy zainstalować zależności                                |
| `cache_keys`            | string | ✅       | -                   | Konfiguracja kluczy cache                                  |
| `framework_type`        | string | ❌       | `next`              | Typ framework                                              |

**Secrets:**

| Secret      | Wymagany | Opis                      |
| ----------- | -------- | ------------------------- |
| `GH_TOKEN`  | ✅       | GitHub token z repo scope |
| `NPM_TOKEN` | ❌       | NPM token dla publikacji  |

**Release Types:**

- `production`: Pełny release na main/master
- `preprod`: Pre-production release dla PR do main/master
- `prerelease`: Beta release dla develop/dev
- `feature`: Feature release dla feature branches
- `rc`: Release candidate dla PR do main/master

**Commands:**

- Build: `yarn build:package`
- Release: `npx semantic-release` (z odpowiednimi flagami)

## Semantic Release Configuration API

### .releaserc.js Structure

**Lokalizacja:** [`.releaserc.js`](../../../.releaserc.js)

**Branches Configuration:**

```javascript
getBranchesConfig() {
  Returns array of branch configurations:
  - main/master: channel 'latest'
  - dev/develop: channel 'dev', prerelease 'dev'
  - alfa: channel 'alfa', prerelease 'alfa'
  - beta: channel 'beta', prerelease 'beta'
  - rc: channel 'rc', prerelease 'rc'
  - feature/*: channel 'feature', prerelease 'featureName-{hash}'
  - PR to main/master: channel 'rc', prerelease 'rc-pr{number}-{hash}'
}
```

**Plugins:**

1. **@semantic-release/commit-analyzer**

   - Preset: `conventionalcommits`
   - Note keywords: `BREAKING CHANGE`, `BREAKING CHANGES`, `BREAKING`
   - Release rules: `build(deps): patch`

2. **@semantic-release/release-notes-generator**

   - Preset: `conventionalcommits`
   - Group by: `scIssue` (Linear issue grouping)
   - Commits sort: `['scIssue', 'type']`
   - Custom transform dla Linear links

3. **@semantic-release/changelog**

   - File: `CHANGELOG.md`

4. **@semantic-release/github**

   - Branches: `['main']` (tylko dla main branch)

5. **@semantic-release/git**

   - Assets: `['CHANGELOG.md']`
   - Message: `release: 📦 ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}`

6. **@semantic-release/exec**

   - Prepare command: `yarn build:prod`

7. **@semantic-release/npm**
   - Publish: `process.env.NPM_PUBLISH || true`

**Environment Variables:**

- `GITHUB_REF_NAME`: Current branch name
- `GITHUB_EVENT_NAME`: Event type (push, pull_request)
- `GITHUB_SHA`: Commit SHA (first 7 chars for hash)
- `GITHUB_BASE_REF`: Base branch for PR
- `GITHUB_HEAD_REF`: Head branch for PR

## Build Scripts API

### package.json Build Scripts

**Lokalizacja:** [`package.json`](../../../package.json)

#### Production Build Scripts

| Script             | Opis                    | Komendy                                                                       |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------- |
| `build:prod`       | Full production build   | `run-s build build:postbuild`                                                 |
| `build`            | Standard build          | `run-s build:prebuild next:build`                                             |
| `build:prebuild`   | Pre-build cleanup       | `run-s build:clean build:copyAssets`                                          |
| `build:postbuild`  | Post-build tasks        | `next-sitemap`                                                                |
| `build:clean`      | Cleanup build artifacts | `rimraf public/assets public/sitemap*`                                        |
| `build:copyAssets` | Copy assets             | `cpy './src/assets/**/*' '!**.tsx' '!**.gitkeep' './public/assets' --parents` |
| `next:build`       | Next.js build           | `next build`                                                                  |

#### Build Stages

1. **Prebuild:**

   - Cleanup: usuwa `public/assets`, `public/sitemap*`
   - Copy assets: kopiuje `src/assets/**/*` do `public/assets`

2. **Build:**

   - Next.js build: `next build`

3. **Postbuild:**
   - Sitemap generation: `next-sitemap`

#### Development Build Scripts

| Script      | Opis                             |
| ----------- | -------------------------------- | ----------------------------- |
| `dev:build` | Production build + local preview | `run-s build:prod next:start` |

#### Bundle Analysis Scripts

| Script          | Opis                 |
| --------------- | -------------------- | ------------------------------------ |
| `build:analyze` | Bundle size analysis | `cross-env ANALYZE=true run-s build` |

## Environment Variables API

### Build & Deploy Environment Variables

**Server Variables:**

| Zmienna    | Typ     | Wymagana | Opis                 | Przykład                    |
| ---------- | ------- | -------- | -------------------- | --------------------------- |
| `NODE_ENV` | string  | ❌       | Environment mode     | `production`, `development` |
| `ANALYZE`  | boolean | ❌       | Bundle analyzer flag | `true`, `false`             |

**GitHub Actions Environment Variables:**

| Zmienna    | Opis                                       | Ustawienie                                    |
| ---------- | ------------------------------------------ | --------------------------------------------- |
| `NODE_ENV` | Set automatically przez reusable-build.yml | `production` jeśli `production_build == true` |
| `ANALYZE`  | Set automatically przez reusable-build.yml | `true` jeśli `analyze_bundle == true`         |

**Semantic Release Environment Variables:**

| Zmienna             | Opis                | Źródło                 |
| ------------------- | ------------------- | ---------------------- |
| `GITHUB_REF_NAME`   | Current branch name | GitHub Actions context |
| `GITHUB_EVENT_NAME` | Event type          | GitHub Actions context |
| `GITHUB_SHA`        | Commit SHA          | GitHub Actions context |
| `GITHUB_BASE_REF`   | Base branch (PR)    | GitHub Actions context |
| `GITHUB_HEAD_REF`   | Head branch (PR)    | GitHub Actions context |
| `GH_TOKEN`          | GitHub token        | GitHub Secrets         |
| `GITHUB_TOKEN`      | GitHub token        | GitHub Actions default |
| `NPM_TOKEN`         | NPM token           | GitHub Secrets         |
| `NPM_PUBLISH`       | Publish to NPM flag | Environment variable   |

## Configuration Files Reference

### .github/workflows/ Structure

**Main Workflows:**

- `ci.yml` - Main CI/CD pipeline
- `release.yml` - Production releases
- `preRelease.yml` - Pre-production releases
- `bundle-analysis.yml` - Bundle size analysis

**Reusable Workflows:**

- `reusable-setup.yml` - Environment setup
- `reusable-lint.yml` - Linting
- `reusable-test.yml` - Testing
- `reusable-build.yml` - Building
- `reusable-release.yml` - Release process

### .releaserc.js Structure

**Function: `getBranchesConfig()`**

Dynamicznie generuje konfigurację branchy na podstawie:

- `GITHUB_REF_NAME`: Current branch
- `GITHUB_EVENT_NAME`: Event type
- `GITHUB_BASE_REF`: Base branch (PR)

**Plugins Configuration:**

Każdy plugin ma własną konfigurację z opcjami specyficznymi dla projektu.

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia build & deploy
- [`technical.md`](technical.md) — szczegóły implementacji i setup
- [`tech-environments.md`](tech-environments.md) — strategia środowisk i mapowanie branchy
- [`tech-github-actions.md`](tech-github-actions.md) — szczegóły GitHub Actions
- [`tech-semantic-release.md`](tech-semantic-release.md) — szczegóły Semantic Release
- [`tech-github-actions-release.md`](tech-github-actions-release.md) — automatyzacja release
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../10-testing/`](../10-testing/) — kontekst w testing strategy
- [`.github/workflows/`](../../../.github/workflows/) — GitHub Actions workflows (reference)
- [`.releaserc.js`](../../../.releaserc.js) — Semantic Release configuration (reference)
- [`package.json`](../../../package.json) — Build scripts (reference)
