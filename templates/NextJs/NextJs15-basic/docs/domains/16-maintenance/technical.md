# Przewodnik techniczny utrzymania

> [!NOTE] Wystąpienie tematu
> To jest skrót lub odniesienie. Pełne Źródło: [`overview.md`](overview.md)

## Dependency Management

Zarządzanie zależnościami w projekcie opiera się na automatycznych aktualizacjach i security scanning.

**Szczegóły:** [`tech-dependency-management.md`](tech-dependency-management.md)

**Faktyczne narzędzia:**

- [Renovate](renovate.json) - automatyczne aktualizacje dependencies
- [patch-package](package.json) - custom fixes (postinstall hook)
- npm audit - security scanning
- [s-update-manager](package.json) - template propagation (`update-template` script)

## Git Hooks & Automation

Git hooks zapewniają automatyczną kontrolę jakości przed commitem i push.

**Szczegóły:** [`../9-code-quality/tech-husky.md`](../9-code-quality/tech-husky.md), [`../14-workflow/`](../14-workflow/)

**Faktyczne narzędzia:**

- [Husky](.husky/) - Git hooks automation
- [lint-staged](.husky/lint-staged.config.json) - selective linting
- Quality gates - progressive enforcement (pre-commit → pre-push)

**Workflow:**

1. `prepare-commit-msg` - commit message formatting
2. `commit-msg` - commitlint validation
3. `pre-commit` - branch sync + lint-staged + snapshot management
4. `pre-push` - full quality check + smoke tests
5. `post-merge` - auto dependency install

## CI/CD Maintenance

Automatyzacja CI/CD zapewnia ciągłą weryfikację jakości i automatyczne wersjonowanie.

**Szczegóły:** [`../15-deployment/`](../15-deployment/)

**Faktyczne narzędzia:**

- [GitHub Actions](.github/workflows/) - CI/CD workflows
- [Semantic Release](.releaserc.js) - automatyczne wersjonowanie
- Automated testing - CI/CD test pipeline

**Workflows:**

- `ci.yml` - continuous integration
- `reusable-*.yml` - reusable workflows
- Bundle analysis workflow
- Release workflows

## Quality Monitoring

Monitoring jakości kodu poprzez faktyczne narzędzia w projekcie.

**Szczegóły:** [`tech-monitoring.md`](tech-monitoring.md), [`../9-code-quality/`](../9-code-quality/)

**Faktyczne narzędzia:**

- **Knip** - unused code detection (`quality:knip`)
- **Madge** - coupling analysis (`quality:coupling:graph`)
- **Bundle Analyzer** - bundle size monitoring (`build:analyze`)
- **Test Coverage** - coverage reports (`quality:coverage`)

**Użycie:**

```bash
yarn quality:knip           # Find unused code
yarn quality:coupling:graph # Generate coupling graph
yarn build:analyze          # Analyze bundle size
yarn quality:coverage       # Generate coverage report
```

## Troubleshooting

### Common Issues

#### 1. Husky Git Hooks Not Working

**Problem:** `.husky/prepare-commit-msg` and `cz` does not work

**Solution:**

```bash
chmod ug+x .husky/*
```

**Visual Reference:**
![cz-problem.png](../../cz-problem.png)

#### 2. Permission Problem During Release Action

**Problem:** GitHub Actions release fails due to token permissions

**Solution:**

1. Go to repository settings: `https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}/settings/actions`
2. Navigate to "Workflow permissions"
3. Check "Read and write permissions"

**Visual Reference:**
![gh_token_permission.png](../../gh_token_permission.png)

#### 3. Setup Repository Permissions

**Problem:** Semantic release needs read and write permissions

**Solution:**

1. Go to repository settings
2. Navigate to Actions → Workflow permissions
3. Enable "Read and write permissions"

**Visual Reference:**
![gh.png](../../gh.png)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Maintenance Strategy
- [`tech-dependency-management.md`](tech-dependency-management.md) — szczegóły zarządzania zależnościami
- [`tech-monitoring.md`](tech-monitoring.md) — quality monitoring tools
- [`../9-code-quality/tech-husky.md`](../9-code-quality/tech-husky.md) — Git hooks configuration
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../15-deployment/`](../15-deployment/) — kontekst w deployment strategy
- [`memory-bank/progress.md`](../../../memory-bank/progress.md) — skrót maintenance dla AI
- [`package.json`](../../../package.json) — Maintenance scripts (reference)
- [`renovate.json`](../../../renovate.json) — Renovate configuration (reference)
