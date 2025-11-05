# Przewodnik techniczny budowy i wdrażania

> [!NOTE] Wystąpienie tematu
> To jest skrót lub odniesienie. Pełne Źródło: [`overview.md`](overview.md)

## GitHub Actions Configuration

Projekt używa reusable workflows w `.github/workflows/`. Szczegóły: [`tech-github-actions.md`](tech-github-actions.md)

**Główne workflow:**
- [`ci.yml`](../../../.github/workflows/ci.yml) - Main CI/CD pipeline
- [`reusable-setup.yml`](../../../.github/workflows/reusable-setup.yml) - Setup i release type detection
- [`reusable-build.yml`](../../../.github/workflows/reusable-build.yml) - Build process z cache
- [`reusable-release.yml`](../../../.github/workflows/reusable-release.yml) - Semantic Release automation

**Proces workflow:**
1. Trigger na push/PR → `ci.yml`
2. Setup → wykrywanie typu release i framework
3. Lint → ESLint, Prettier, Stylelint, TypeScript
4. Test → unit tests, component tests
5. Build → production build z cache
6. Release → semantic-release z odpowiednim typem

Szczegóły automatyzacji: [`tech-github-actions-release.md`](tech-github-actions-release.md)

## Build Process

### Build Scripts

Build scripts zdefiniowane w [`package.json`](../../../package.json):

- `build:prod` - Full production build (4-stage: prebuild → build → postbuild)
- `build:prebuild` - Cleanup i copy assets
- `build:postbuild` - Sitemap generation
- `dev:build` - Production build + local preview

**Build stages:**
1. Prebuild: Cleanup (`build:clean`) + Copy assets (`build:copyAssets`)
2. Build: Next.js build (`next:build`)
3. Postbuild: Sitemap generation (`next-sitemap`)

### Build Optimization

**Cache strategies:**
- Dependencies cache (node_modules)
- Next.js build cache (.next/, out/)
- Cache hit detection w workflows

**Performance:**
- Cold build: ~45s
- Cached build: ~15s
- TypeScript conditional config dla production

Szczegóły: [`tech-github-actions.md`](tech-github-actions.md#build-optimization)

## Environment Management

### T3 Env Configuration

Projekt używa **T3 Env** z Zod validation dla type-safe environment variables. Konfiguracja w [`env.mjs`](../../../env.mjs).

**Struktura:**
- Server variables - tylko na serwerze
- Client variables - dostępne w przeglądarce (NEXT_PUBLIC_*)
- Production variables - `PRODUCTION_ENV_VARIABLE`, `NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE`

**Validation:**
- Runtime validation przy starcie aplikacji
- TypeScript types generowane automatycznie
- Error messages dla brakujących wymaganych zmiennych

Szczegóły: [`../3-environment/`](../3-environment/) - Environment Management domain

### Security

**Security Headers:**
Konfiguracja w [`next.config.ts`](../../../next.config.ts) - security headers dla production:
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy
- Permissions-Policy

**Environment Variables Security:**
- T3 Env validation zapobiega błędom konfiguracji
- Secrets w GitHub Secrets (nie w kodzie)
- No hardcoded secrets policy

Szczegóły: [`../13-security/`](../13-security/) - Security domain

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja build & deploy
- [`tech-github-actions.md`](tech-github-actions.md) — szczegóły GitHub Actions
- [`tech-semantic-release.md`](tech-semantic-release.md) — szczegóły Semantic Release
- [`memory-bank/workflows.md`](../../../memory-bank/workflows.md) — skrót build & deploy dla AI
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../10-testing/`](../10-testing/) — kontekst w testing strategy
- [`.github/workflows/`](../../../.github/workflows/) — GitHub Actions (reference)
- [`package.json`](../../../package.json) — scripts (reference)
