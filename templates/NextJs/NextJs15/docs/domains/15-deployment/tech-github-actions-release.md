# GitHub Actions Release Automation

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
## Przepływ automatyzacji

**1. Trigger workflow ([`ci.yml`](../../../.github/workflows/ci.yml)):**

Workflow uruchamia się automatycznie przy:

- Push do `main`, `master`, `develop`, `dev`, `feature/*`
- Pull request do `main`, `master`, `develop`, `dev`

**2. Wykrywanie typu release ([`reusable-setup.yml`](../../../.github/workflows/reusable-setup.yml)):**

Step `🔍 Wykrywanie typu wydania` analizuje branch i event type:

- **Pull request** do `main`/`master` → `preprod`
- **Pull request** do `develop`/`dev` → `alpha`
- **Merge** do `main`/`master` → `production`
- **Merge** do `develop`/`dev` → `beta`
- **Merge** do `feature/*` → `feature`
- Domyślnie → `feature`

Wynik zapisywany jako output `release_type_detected` dla następnych jobów.

**3. Przekazanie do release workflow ([`ci.yml`](../../../.github/workflows/ci.yml)):**

Job `release` wywołuje `reusable-release.yml` z wykrytym typem release, nazwą brancha, wersją Node.js i kluczami cache. Przekazuje również secrets: `GH_TOKEN` i `NPM_TOKEN`.

**4. Wykonanie release ([`reusable-release.yml`](../../../.github/workflows/reusable-release.yml)):**

Workflow wykonuje:

- Checkout z odpowiedniego brancha
- Cache dependencies i build artifacts
- Budowanie projektu (`yarn build:package`)
- Semantic release z odpowiednim typem (production, preprod, feature, rc)

## Typy release

System automatycznie wykrywa typ release na podstawie brancha:

- **`production`** — merge do `main`/`master` → full release z tagiem `v1.0.0`
- **`preprod`** — PR do `main`/`master` → pre-release `v1.0.0-preprod.1`
- **`prerelease`/`beta`** — merge do `develop`/`dev` → beta release `v1.0.0-beta.1`
- **`feature`** — merge do `feature/*` → feature release `v1.0.0-feat-[name]-[hash].1`
- **`rc`** — PR do `main`/`master` → release candidate `v1.0.0-rc-pr[number]-[hash].1`

## Konfiguracja tokenów

**Wymagane GitHub Secrets:**

W repozytorium muszą być skonfigurowane następujące secrets:

1. **`GH_TOKEN`** — token GitHub z uprawnieniami `repo` (opcjonalny, obecnie nieużywany):

   - Workflow obecnie używa automatycznego `GITHUB_TOKEN`
   - Jeśli w przyszłości potrzebujesz custom token z większymi uprawnieniami, dodaj tutaj
   - Gdzie ustawić: https://github.com/settings/tokens/new → wybierz scope `repo`
   - Gdzie dodać: Repository Settings → Secrets and variables → Actions → New repository secret

2. **`NPM_TOKEN`** — token NPM (opcjonalny):

   - Używany do: publikacji pakietów do NPM
   - Gdzie ustawić: https://www.npmjs.com/settings/[username]/tokens → Generate New Token → Automation
   - Gdzie dodać: Repository Settings → Secrets and variables → Actions → New repository secret

3. **`GITHUB_TOKEN`** — automatycznie generowany przez GitHub Actions (używany domyślnie):
   - **Główny token używany przez workflow** do wszystkich operacji GitHub (releases, tagi, commity)
   - Automatycznie dostarczany przez GitHub Actions — nie wymaga konfiguracji
   - Ma uprawnienia dla repozytorium, w którym działa workflow
   - Wymaga ustawienia "Read and write permissions" w Workflow permissions

**Jak tokeny są przekazywane:**

Workflow ustawia zmienne środowiskowe w sekcji `env` ([`reusable-release.yml`](../../../.github/workflows/reusable-release.yml) linia 51-56):

- `GH_TOKEN` i `GITHUB_TOKEN` — używają automatycznego `secrets.GITHUB_TOKEN`
- `NPM_TOKEN` — z sekcji `secrets:` przekazanej z wywołania workflow

Step `🔍 Check tokens` ([`reusable-release.yml`](../../../.github/workflows/reusable-release.yml) linia 145-162) wykrywa dostępność tokenów i wybiera odpowiedni dla checkout (preferuje `GH_TOKEN`, fallback do `GITHUB_TOKEN`).

## Integracja z semantic-release

**Semantic-release używa tokenów do:**

1. **Analiza commitów** (`@semantic-release/commit-analyzer`):

   - Odczytuje historię commitów z repozytorium
   - Wymaga `GH_TOKEN` lub `GITHUB_TOKEN`

2. **Generowanie release notes** (`@semantic-release/release-notes-generator`):

   - Tworzy notatki release na podstawie Conventional Commits
   - Grupuje według Linear issues (SC-xxx)

3. **GitHub Release** (`@semantic-release/github`):

   - Tworzy GitHub Release z tagiem wersji
   - Wymaga `GH_TOKEN` z uprawnieniami `repo`

4. **NPM Publish** (`@semantic-release/npm`):
   - Publikuje pakiet do NPM (jeśli `NPM_TOKEN` jest dostępny)
   - Aktualizuje `package.json` z nową wersją

**Kluczowe konfiguracje w [`.releaserc.js`](../../../.releaserc.js):**

- **`getBranchesConfig()`** ([`.releaserc.js`](../../../.releaserc.js) linia 4-68) — dynamicznie generuje konfigurację branchy na podstawie zmiennych środowiskowych (`GITHUB_REF_NAME`, `GITHUB_EVENT_NAME`), obsługuje feature branches i PR do main/master
- **`@semantic-release/release-notes-generator`** ([`.releaserc.js`](../../../.releaserc.js) linia 144-235) — transformuje commity:
  - Ekstraktuje numery Linear issues (`SC-xxx`) z commit messages
  - Tworzy linki do Linear issues w release notes
  - Grupuje commity według `scIssue` zamiast typów
  - Sortuje według numerów SC issues
- **Plugins:** `@semantic-release/changelog`, `@semantic-release/github` (tylko dla `main`), `@semantic-release/git` (commit z `[skip ci]`), `@semantic-release/exec`, `@semantic-release/npm`

**Szczegóły:** [.releaserc.js](../../../.releaserc.js) — pełna konfiguracja semantic-release

## Workflow Permissions

**Wymagane uprawnienia repozytorium:**

Semantic-release wymaga uprawnień **Read and Write** dla GitHub Actions:

1. Przejdź do: Repository Settings → Actions → General → Workflow permissions
2. Wybierz: **Read and write permissions**
3. Zapisz zmiany

**Dlaczego to jest potrzebne:**

- Czytanie commitów i tagów
- Tworzenie GitHub Releases
- Tworzenie i push tagów
- Commit CHANGELOG.md z nową wersją

## Troubleshooting

**Problem: Semantic-release nie może utworzyć release**

**Przyczyna:** Brak lub nieprawidłowy `GH_TOKEN`

**Rozwiązanie:**

```bash
# Sprawdź czy secret istnieje
# Repository Settings → Secrets → Actions → GH_TOKEN

# Sprawdź uprawnienia tokenu
# Token musi mieć scope "repo" (full control of private repositories)
```

**Problem: Publikacja do NPM nie działa**

**Przyczyna:** Brak lub nieprawidłowy `NPM_TOKEN`

**Rozwiązanie:**

```bash
# Sprawdź czy secret istnieje
# Repository Settings → Secrets → Actions → NPM_TOKEN

# Sprawdź typ tokenu
# NPM token musi być typu "Automation" (nie Read-only)
```

**Problem: Workflow nie ma uprawnień do zapisu**

**Przyczyna:** Workflow permissions ustawione na Read-only

**Rozwiązanie:**

1. Przejdź do: Repository Settings → Actions → General → Workflow permissions
2. Wybierz: **Read and write permissions**
3. Zapisz zmiany

## Wystąpienia

- [`technical.md`](technical.md) — overview automatyzacji workflow
- [`tech-semantic-release.md`](tech-semantic-release.md) — konfiguracja semantic-release
- [`tech-github-actions.md`](tech-github-actions.md) — konfiguracja GitHub Actions
- [`../../HowToAutoDeploy.md`](../../../HowToAutoDeploy.md) — kompletny przewodnik setupu
- [`README.md`](README.md) — overview deployment
- [`../6-developer-experience/overview.md`](../6-developer-experience/overview.md) — kontekst DX workflow
