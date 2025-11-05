# s-update-manager

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## 1. Installation

```bash
# Install globally
npm install -g s-update-manager

# Lub użyj npx (zalecane)
npx s-update-manager@latest
```

## 2. Użycie w Projekcie

```bash
# Aktualizacja szablonu z repozytorium matki
yarn update-template

# Build szablonu z repozytorium matki
yarn update-template:build
```

**Skrypty w package.json:**

```json
{
  "scripts": {
    "update-template": "s-update --remoteRepository='https://github.com/SebastianWesolowski/s-template/tree/dev/templates/NextJs/NextJs15'",
    "update-template:build": "s-build --remoteRepository='https://github.com/SebastianWesolowski/s-template/tree/dev/templates/NextJs/NextJs15'"
  },
  "devDependencies": {
    "s-update-manager": "^1.0.0-dev.48"
  }
}
```

## 3. Konfiguracja

**Plik `.sum.config.json`:**

```json
{
  "templateCatalogName": "templateCatalog",
  "sumCatalog": "./.sum/",
  "sUpdaterVersion": "latest",
  "remoteRootRepositoryUrl": "https://raw.githubusercontent.com/SebastianWesolowski/s-template/dev/templates/NextJs/NextJs15",
  "remoteRepository": "https://github.com/SebastianWesolowski/s-template/tree/dev/templates/NextJs/NextJs15",
  "remoteFileMapURL": "https://raw.githubusercontent.com/SebastianWesolowski/s-template/dev/templates/NextJs/NextJs15/templateCatalog/repositoryMap.json"
}
```

**Struktura folderów:**

```
.sum/
├── repositoryMap.json          # Mapowanie plików szablonu
├── repositoryMap.json.backup   # Backup mapowania
└── templateCatalog/            # Katalog szablonu z plikami -default.md
    ├── package.json-default.md
    ├── next.config.ts-default.md
    ├── eslint.config.mjs-default.md
    └── ... (wszystkie pliki szablonu)
```

## 4. Workflow Aktualizacji

```bash
# 1. Sprawdź dostępne aktualizacje
yarn update-template --dry-run

# 2. Wykonaj aktualizację
yarn update-template

# 3. Sprawdź konflikty i rozwiąż je ręcznie
git status
git diff

# 4. Przetestuj zmiany
yarn test
yarn build
```

## 5. Parametry CLI

```bash
# Podstawowe użycie (używa konfiguracji z .sum.config.json)
s-update

# Lub z jawnym URL repozytorium
s-update --remoteRepository='https://github.com/SebastianWesolowski/s-template/tree/dev/templates/NextJs/NextJs15'

# Opcje dostępne (sprawdź dokumentację s-update)
s-update --help
```

**Uwaga:** Skrypt `s-update` używa konfiguracji z `.sum.config.json`, więc nie trzeba podawać URL repozytorium za każdym razem.

## 6. Zarządzanie Konfliktami

```bash
# Sprawdź status po aktualizacji
git status

# Zobacz różnice
git diff

# Rozwiąż konflikty ręcznie
git add .
git commit -m "chore: resolve template update conflicts"
```

### 3. Weryfikacja aktualizacji

```bash
# Uruchom testy po aktualizacji
yarn test

# Sprawdź build
yarn build

# Sprawdź linting
yarn lint
```

## 8. Integracja z CI/CD

### Ręczna aktualizacja (obecny stan)

Projekt nie ma zautomatyzowanego workflow dla aktualizacji szablonu. Aktualizacje są wykonywane ręcznie:

```bash
# Ręczna aktualizacja szablonu
yarn update-template

# Commit zmian
git add .
git commit -m "chore: update template from s-template"

# Push do repozytorium
git push origin main
```

### Potencjalna Automatyzacja

Można rozważyć dodanie GitHub Actions workflow dla automatycznych aktualizacji:

```yaml
# .github/workflows/template-update.yml (przykład)
name: Template Update
on:
  schedule:
    - cron: '0 6 * * 1' # Co tydzień w poniedziałek
  workflow_dispatch:

jobs:
  update-template:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: yarn install
      - name: Update template
        run: yarn update-template
      - name: Create Pull Request
        # ... konfiguracja PR
```

## 9. Troubleshooting

### Częste Problemy

```bash
# Sprawdź dostępność s-update
npx s-update --help

# Sprawdź połączenie z repozytorium
git remote -v

# Sprawdź status po aktualizacji
git status
git diff --name-only
```

### Rozwiązywanie Konfliktów

```bash
# Jeśli wystąpią konflikty merge
git status
git diff

# Rozwiąż konflikty ręcznie w edytorze
# Następnie:
git add .
git commit -m "chore: resolve template update conflicts"

# Lub cofnij zmiany jeśli potrzebne
git checkout -- .
```

### Weryfikacja Po Aktualizacji

```bash
# Sprawdź czy wszystko działa po aktualizacji
yarn test
yarn build
yarn lint

# Jeśli są błędy, sprawdź logi
yarn test --verbose
yarn build --debug
```

## Wystąpienia

- [`overview.md`](overview.md#1-s-update-manager---szablon-matka) — koncepcja szablon matki
- [`technical.md`](technical.md#1-template-propagation-flow) — synergia z innymi narzędziami
- [`reference.md`](reference.md#s-update-manager-configuration) — quick reference
- [`../16-maintenance/`](../16-maintenance/) — długoterminowe utrzymanie
- [`.sum.config.json`](../../../.sum.config.json) — konfiguracja
- [`package.json`](../../../package.json) — skrypty i wersja
