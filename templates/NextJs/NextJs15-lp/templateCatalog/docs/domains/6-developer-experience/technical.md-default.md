# Przewodnik techniczny doświadczenia dewelopera

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

### Template Customization

**yarn customize** - skrypt do wielopoziomowego wypełniania projektu: setup kodu + customizacja dokumentacji z gotowymi linkami do tokenów.

**W kontekście DX:**

- Eliminuje friction przy setupie z szablonu
- Przygotowuje projekt do natychmiastowej pracy (kod + dokumentacja)
- Automatycznie aktualizuje dokumentację z gotowymi linkami i instrukcjami tokenów

**Szczegóły:**

- [Jak działa customization](../2-customization/tech-customize.md#jak-działa-template-customization) — koncepcja i placeholdery
- [Jak uruchomić customization](../2-customization/tech-customize.md#jak-uruchomić-customization) — podstawowe użycie i proces
- [Integration z DX Workflow](../2-customization/tech-customize.md#integration-z-dx-workflow) — wielopoziomowe wypełnianie projektu
- [Przykłady użycia](../2-customization/tech-customize.md#przykłady-użycia) — nowy projekt i zaawansowana customizacja
- [Troubleshooting](../2-customization/tech-customize.md#troubleshooting) — rozwiązywanie problemów

# Jak zautomatyzować workflow

## Automatyzacja Release z GitHub Actions

System automatycznego release'u integruje [GitHub Actions](https://docs.github.com/en/actions), [semantic-release](https://semantic-release.gitbook.io/) i zarządzanie tokenami przez GitHub Secrets.

**Funkcje:**

- Automatyczne wykrywanie typu release na podstawie brancha (production, preprod, feature, rc)
- Integracja z semantic-release dla automatycznego versioningu
- Zarządzanie tokenami (GH_TOKEN, NPM_TOKEN, GITHUB_TOKEN)
- Workflow permissions configuration

**Szczegóły:** [../15-deployment/tech-github-actions-release.md](../15-deployment/tech-github-actions-release.md) — kompletny przewodnik automatyzacji release

**Setup:** [HowToAutoDeploy.md](../../../HowToAutoDeploy.md) — instrukcja konfiguracji tokenów i permissions

## Git Hooks ([Husky](https://typicode.github.io/husky/))

**Pre-commit:**

- [lint-staged](https://github.com/lint-staged/lint-staged) - automatyczne formatowanie
- [ESLint](https://eslint.org/) check - sprawdzanie jakości kodu
- [TypeScript](https://www.typescriptlang.org/) check - walidacja typów

**Commit-msg:**

- [Conventional Commits](https://www.conventionalcommits.org/) validation
- Format: `type(scope): message`
- Enforced przez [commitlint](https://commitlint.js.org/)

**Pre-push:**

- Testy jednostkowe
- Quality checks
- Smoke tests

**Szczegóły:** [../9-code-quality/tech-husky.md](../9-code-quality/tech-husky.md) — Git hooks configuration

### Conventional Commits

**Format:** `type(scope): message`

**Typy:**

- `feat` - nowa funkcjonalność
- `fix` - poprawka błędu
- `docs` - dokumentacja
- `chore` - zadania maintenance
- `refactor` - refaktoryzacja
- `test` - testy

**Enforced przez commitlint** - automatyczna walidacja formatu

**Szczegóły:** [../5-issue-tracking/tech-cz-git.md](../5-issue-tracking/tech-cz-git.md) — conventional commits setup

## Jak skonfigurować release management

### [Semantic Release](https://semantic-release.gitbook.io/)

Automatyczny versioning ([semver](https://semver.org/)), generowanie CHANGELOG.md z [Conventional Commits](https://www.conventionalcommits.org/), automatyczne GitHub Releases i publikacja do NPM.

**Szczegóły:** [../15-deployment/tech-semantic-release.md](../15-deployment/tech-semantic-release.md) — konfiguracja semantic-release

## Narzędzia deweloperskie

### Cross-Platform Environment Variables

**[cross-env](https://github.com/kentcdodds/cross-env)** zapewnia spójność zmiennych środowiskowych między systemami operacyjnymi (Windows, macOS, Linux).

**Szczegóły:** [../3-environment/tech-cross-env.md](../3-environment/tech-cross-env.md) — cross-platform environment setup

### Component Development

**[Storybook](https://storybook.js.org/):**

- Component documentation
- Visual testing
- Isolated development
- Hot reload

**Hot Reload (Turbopack):**

- Szybki feedback
- Next.js 15 optimization
- Development server

**Absolute Imports:**

- Czytelniejsze importy
- @components, @utils aliases
- TypeScript support

**Szczegóły:** [../10-testing/tech-storybook.md](../10-testing/tech-storybook.md) — Storybook configuration

### Code Analysis

**[Knip](https://knip.dev/) - Unused Code Detection:**

- Wykrywanie nieużywanego kodu
- Dependencies analysis
- Exports validation

**[Madge](https://github.com/pahen/madge) - Coupling Analysis:**

- Circular dependencies
- Module relationships
- Coupling metrics

**Bundle Analyzer:**

- Bundle size optimization
- Performance analysis
- Tree shaking effectiveness

**Szczegóły:**

- [../9-code-quality/tech-knip.md](../9-code-quality/tech-knip.md) — Knip setup
- [../9-code-quality/tech-madge.md](../9-code-quality/tech-madge.md) — Madge analysis
- [../11-performance/tech-bundle-analyzer.md](../11-performance/tech-bundle-analyzer.md) — Bundle optimization

### External Testing

**[ngrok](https://ngrok.com/docs) - Local Tunneling:**

- Webhook testing
- Mobile testing
- External device access
- Demo presentations

**Szczegóły:** [../10-testing/tech-ngrok.md](../10-testing/tech-ngrok.md) — ngrok tunneling setup

## Troubleshooting

### Git Hooks Issues

**Problem:** Hooks nie działają

**Rozwiązanie:** [Husky troubleshooting](https://typicode.github.io/husky/)

```bash
# Sprawdź instalację Husky
yarn husky install

# Sprawdź uprawnienia
chmod +x .husky/*
```

### Semantic Release Problems

**Problem:** Release nie działa

Zobacz: [../15-deployment/tech-github-actions-release.md](../15-deployment/tech-github-actions-release.md#troubleshooting) — szczegółowe rozwiązania problemów z tokenami i permissions

### Commit Validation Errors

**Problem:** Commit odrzucony

**Rozwiązanie:** [Conventional Commits](https://www.conventionalcommits.org/), [commitlint docs](https://commitlint.js.org/)

```bash
# Sprawdź format commitu
git commit -m "feat: add new feature"

# Sprawdź commitlint config
cat .commitlintrc.js
```

## Wystąpienia

### Domeny DX (właściciel: ta domena)

- [overview.md](overview.md) — filozofia i koncepcja DX
- [../10-testing/tech-ngrok.md](../10-testing/tech-ngrok.md) — local tunneling setup
- [../9-code-quality/tech-madge.md](../9-code-quality/tech-madge.md) — coupling analysis
- [../3-environment/tech-cross-env.md](../3-environment/tech-cross-env.md) — cross-platform environment

### Template Customization (właściciel: 2-customization)

- [../2-customization/tech-customize.md](../2-customization/tech-customize.md) — pełny przewodnik po template customization

### Domeny Code Quality (właściciel: 9-code-quality)

- [../9-code-quality/](../9-code-quality/) — quality tools (ESLint, Prettier, Husky)
- [../9-code-quality/tech-knip.md](../9-code-quality/tech-knip.md) — unused code detection
- [../9-code-quality/tech-typescript.md](../9-code-quality/tech-typescript.md) — TypeScript configuration

### Domeny Performance (właściciel: performance)

- [../11-performance/tech-bundle-analyzer.md](../11-performance/tech-bundle-analyzer.md) — bundle optimization

### Domeny Testing (właściciel: testing)

- [../10-testing/tech-storybook.md](../10-testing/tech-storybook.md) — Storybook configuration
- [../10-testing/tech-jest.md](../10-testing/tech-jest.md) — Jest testing
- [../10-testing/tech-playwright.md](../10-testing/tech-playwright.md) — Playwright E2E

### Domeny Workflow (właściciel: inne domeny)

- [../14-workflow/](../14-workflow/) — Git workflow i processes
- [../5-issue-tracking/](../5-issue-tracking/) — Linear integration, conventional commits
- [../15-deployment/](../15-deployment/) — CI/CD pipelines i release
- [../4-dependencies/](../4-dependencies/) — dependency management

## Zewnętrzne Zasoby

### Oficjalne Dokumentacje Narzędzi

**Git Hooks i Automatyzacja:**

- [Husky](https://typicode.github.io/husky/) — Git hooks configuration
- [lint-staged](https://github.com/lint-staged/lint-staged) — Pre-commit formatting
- [Commitlint](https://commitlint.js.org/) — Commit message validation
- [Conventional Commits Specification](https://www.conventionalcommits.org/) — Commit message standards

**Release Management:**

- [Semantic Release](https://semantic-release.gitbook.io/) — Automated versioning and releases
- [Keep a Changelog](https://keepachangelog.com/) — Changelog format guidelines
- [Semantic Versioning](https://semver.org/) — Version numbering specification

**Code Quality Tools:**

- [ESLint](https://eslint.org/) — Code linting and fixing
- [Prettier](https://prettier.io/) — Code formatting
- [TypeScript](https://www.typescriptlang.org/docs/) — Type checking documentation

**Testing Tools:**

- [Storybook Documentation](https://storybook.js.org/docs) — Component development
- [Jest Documentation](https://jestjs.io/docs/getting-started) — Unit testing
- [Playwright Documentation](https://playwright.dev/docs/intro) — E2E testing
- [ngrok Documentation](https://ngrok.com/docs) — External testing and tunneling

**Code Analysis:**

- [Knip Documentation](https://knip.dev/) — Unused code detection
- [Madge GitHub](https://github.com/pahen/madge) — Coupling analysis

**CI/CD:**

- [GitHub Actions Documentation](https://docs.github.com/en/actions) — Workflow automation
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) — Secure token management

**Cross-Platform:**

- [cross-env](https://github.com/kentcdodds/cross-env) — Cross-platform environment variables
