# GitHub Actions Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

Projekt używa **reusable workflows** dla modularności i DRY. Wszystkie workflow znajdują się w [`.github/workflows/`](../../../.github/workflows/).

### Main CI/CD Pipeline

**Główny workflow:** [`ci.yml`](../../../.github/workflows/ci.yml)

**Reusable workflows:**
- [`reusable-setup.yml`](../../../.github/workflows/reusable-setup.yml) - Setup, Node.js, cache keys, release type detection
- [`reusable-lint.yml`](../../../.github/workflows/reusable-lint.yml) - ESLint, Prettier, Stylelint, TypeScript
- [`reusable-test.yml`](../../../.github/workflows/reusable-test.yml) - Unit tests, component tests
- [`reusable-build.yml`](../../../.github/workflows/reusable-build.yml) - Build process z cache
- [`reusable-release.yml`](../../../.github/workflows/reusable-release.yml) - Semantic Release automation

**Proces:**
1. **Setup** - Wykrywa typ release, framework, Node.js version
2. **Lint** - ESLint, Prettier, Stylelint, TypeScript checks
3. **Test** - Unit i component tests
4. **Build** - Production build z cache optimization
5. **Release** - Semantic Release z odpowiednim typem

Szczegóły automatyzacji: [`tech-github-actions-release.md`](tech-github-actions-release.md)

## Build Optimization

### Cache Strategies

**Dependencies Cache:**
- Cache `node_modules/` między workflow runs
- Cache key based na lockfile hash
- Automatic cache restoration

**Build Artifacts Cache:**
- Next.js build cache (`.next/`, `out/`)
- Cache hit detection w `reusable-build.yml`
- Conditional build skip jeśli cache hit

**Performance:**
- Cold build: ~45s
- Cached build: ~15s
- Cache invalidation na lockfile changes

Szczegóły w [`reusable-build.yml`](../../../.github/workflows/reusable-build.yml)

## Secrets Management

### GitHub Secrets

Projekt używa GitHub Secrets dla bezpiecznego przechowywania tokenów:

**Wymagane secrets:**
- `GH_TOKEN` (opcjonalny) - GitHub token z uprawnieniami `repo`
- `NPM_TOKEN` (opcjonalny) - NPM token dla publikacji pakietów
- `GITHUB_TOKEN` (automatic) - Automatycznie generowany przez GitHub Actions

**Użycie w workflows:**
Secrets przekazywane przez `secrets:` sekcję w `reusable-release.yml`. Szczegóły: [`tech-github-actions-release.md`](tech-github-actions-release.md#konfiguracja-tokenów)

**Workflow Permissions:**
Wymagane "Read and write permissions" dla Semantic Release. Szczegóły: [`tech-github-actions-release.md`](tech-github-actions-release.md#workflow-permissions)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja GitHub Actions
- [`technical.md`](technical.md) — ogólna implementacja build & deploy
- [`memory-bank/workflows.md`](../../../memory-bank/workflows.md) — skrót GitHub Actions dla AI
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../10-testing/`](../10-testing/) — kontekst w testing strategy
- [`.github/workflows/`](../../../.github/workflows/) — GitHub Actions workflows (reference)
- [`package.json`](../../../package.json) — scripts (reference)
