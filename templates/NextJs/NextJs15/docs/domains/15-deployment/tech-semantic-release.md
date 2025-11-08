# Semantic Release Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

Konfiguracja Semantic Release znajduje się w [`.releaserc.js`](../../../.releaserc.js).

### Kluczowe funkcje

**Dynamic Branch Configuration:**
- Funkcja `getBranchesConfig()` generuje konfigurację branchy dynamicznie
- Obsługuje feature branches (`feature/*`)
- Obsługuje PR do main/master dla RC releases
- Wykrywa typ release na podstawie `GITHUB_REF_NAME` i `GITHUB_EVENT_NAME`

**Linear Integration:**
- Ekstraktuje numery Linear issues (`SC-xxx`) z commit messages
- Tworzy linki do Linear issues w release notes
- Grupuje commity według `scIssue` zamiast typów
- Sortuje według numerów SC issues

**Plugins:**
- `@semantic-release/commit-analyzer` - Analiza Conventional Commits
- `@semantic-release/release-notes-generator` - Generowanie release notes z Linear links
- `@semantic-release/changelog` - Generowanie CHANGELOG.md
- `@semantic-release/github` - GitHub Releases (tylko dla `main`)
- `@semantic-release/git` - Commit z `[skip ci]`
- `@semantic-release/exec` - Prepare command (`yarn build:prod`)
- `@semantic-release/npm` - NPM publishing (jeśli NPM_TOKEN dostępny)

Szczegóły: [`.releaserc.js`](../../../.releaserc.js)

### Release Types

System automatycznie wykrywa typ release na podstawie brancha i event type. Szczegóły: [`tech-github-actions-release.md`](tech-github-actions-release.md#typy-release)

**Typy release:**
- `production` - merge do `main`/`master` → full release `v1.0.0`
- `preprod` - PR do `main`/`master` → pre-release `v1.0.0-preprod.1`
- `prerelease`/`beta` - merge do `develop`/`dev` → beta `v1.0.0-beta.1`
- `feature` - merge do `feature/*` → feature release `v1.0.0-feat-[name]-[hash].1`
- `rc` - PR do `main`/`master` → release candidate `v1.0.0-rc-pr[number]-[hash].1`

## Commit Message Standards

Projekt używa **Conventional Commits** z integracją Linear issues.

**Format:**
```
<type>: [SC-xxx] <subject>

[optional body]

[optional footer]
```

**Przykłady:**
- `feat: [SC-123] add user authentication system`
- `fix: resolve memory leak in data processing`
- `feat!: [SC-456] remove deprecated API endpoints` (breaking change)

**Commit types:**
- `feat` - nowa funkcjonalność
- `fix` - poprawka błędu
- `docs` - dokumentacja
- `style` - formatowanie
- `refactor` - refaktoryzacja
- `perf` - optymalizacja wydajności
- `test` - testy
- `chore` - zmiany w build process
- `ci` - zmiany w CI/CD
- `build` - zmiany w build system

**Linear Integration:**
- Referencje `SC-xxx` w commit message automatycznie linkowane w release notes
- Grupowanie commitów według Linear issues
- Linki do Linear issues w changelog

Szczegóły: [`../14-workflow/`](../14-workflow/) - Commit workflow

## Release Automation

Semantic Release jest automatycznie wykonywane przez GitHub Actions workflow. Szczegóły: [`tech-github-actions-release.md`](tech-github-actions-release.md)

**Proces:**
1. Workflow wykrywa typ release (production, preprod, feature, rc)
2. Wykonuje build (`yarn build:prod`)
3. Uruchamia semantic-release z odpowiednim typem
4. Tworzy GitHub Release z tagiem
5. Generuje i commituje CHANGELOG.md
6. Publikuje do NPM (jeśli NPM_TOKEN dostępny)

**Skip CI:**
Commity z `[skip ci]` w message (używane przez `@semantic-release/git`) zapobiegają infinite loops.

## Changelog Generation

**Automatyczne generowanie:**
- Changelog generowany przez `@semantic-release/changelog`
- Commity grupowane według Linear issues (SC-xxx)
- Linki do Linear issues w changelog
- Custom template z Linear integration

**Format:**
- Grupowanie według `scIssue` zamiast typów commitów
- Sortowanie według numerów SC issues
- Linki do Linear issues i commitów

Szczegóły konfiguracji: [`.releaserc.js`](../../../.releaserc.js) linie 89-182

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Semantic Release
- [`technical.md`](technical.md) — ogólna implementacja build & deploy
- [`memory-bank/workflows.md`](../../../memory-bank/workflows.md) — skrót Semantic Release dla AI
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../10-testing/`](../10-testing/) — kontekst w testing strategy
- [`.releaserc.js`](../../../.releaserc.js) — Semantic Release config (reference)
