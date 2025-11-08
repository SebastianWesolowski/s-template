# Dependencies Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Status Gotowości

### Co Jest Gotowe do Użycia

| Narzędzie            | Status Gotowości        | Co Działa Od Razu                     |
| -------------------- | ----------------------- | ------------------------------------- |
| **s-update-manager** | ✅ **GOTOWE**           | `yarn update-template` działa od razu |
| **Renovate Bot**     | ⚠️ **WYMAGA WŁĄCZENIA** | Konfiguracja gotowa, ale wyłączona    |
| **patch-package**    | ✅ **GOTOWE**           | Skonfigurowany i gotowy do użycia     |

### Instrukcje Włączania

#### s-update-manager - Gotowe ✅

```bash
# Działa od razu - brak konfiguracji potrzebnej
yarn update-template --dry-run
yarn update-template
```

#### Renovate Bot - Wymaga Włączenia ⚠️

```bash
# 1. Edytuj renovate.json - usuń "enabled": false
# 2. Dodaj token do GitHub Secrets
# 3. Włącz Renovate w GitHub Settings
```

#### patch-package - Wymaga Setup ⚠️

```bash
# 1. Dodaj do package.json scripts
npm pkg set scripts.postinstall="patch-package"

# 2. Stwórz pierwszy patch
npx patch-package package-name
```

## Status Narzędzi

### Aktywne Narzędzia

| Narzędzie            | Status                     | Opis                               |
| -------------------- | -------------------------- | ---------------------------------- |
| **s-update-manager** | ✅ Aktywne                 | Propagacja zmian z szablonu matki  |
| **Renovate Bot**     | 🔄 Ciągły flow (wyłączony) | Automatyczne PR-y (można włączyć)  |
| **patch-package**    | 🚨 Doraźne (nieużywany)    | Inteligentne poprawki (można użyć) |

### Flow Życia Projektu

#### Ciągły Flow (Renovate Bot)

- **DZIAŁA:** Non-stop, monitoruje dependencies
- **CEL:** Utrzymanie aktualności i bezpieczeństwa
- **FREKWENCJA:** Codziennie/tygodniowo
- **AUTOMATYZACJA:** Pełna

#### Doraźne Rozwiązania (patch-package)

- **DZIAŁA:** Tylko gdy jest problem
- **CEL:** Naprawa konkretnego błędu
- **FREKWENCJA:** Rzadko, w razie potrzeby
- **AUTOMATYZACJA:** Manualna

## s-update-manager Configuration

✅ **s-update-manager DZIAŁA** - gotowy do użycia od razu

**Komendy:**

```bash
yarn update-template         # Aktualizacja szablonu
yarn update-template:build   # Build szablonu
```

**Konfiguracja:** [`.sum.config.json`](../../../.sum.config.json)

**Szczegóły:** Zobacz [tech-s-update-manager.md](tech-s-update-manager.md) dla pełnej dokumentacji

## Renovate Bot Configuration

⚠️ **Renovate Bot jest WYŁĄCZONY** - `"enabled": false` w `renovate.json`

**Aktualna konfiguracja:** [`renovate.json`](../../../renovate.json)

**Szczegóły:** Zobacz [tech-renovate.md](tech-renovate.md) dla pełnej dokumentacji konfiguracji i package rules

## patch-package Configuration

✅ **patch-package GOTOWY** - skonfigurowany, brak patches (nieużywany)

**Użycie (gdy potrzebny):**

```bash
# postinstall już skonfigurowany
npx patch-package package-name
```

**Szczegóły:** Zobacz [tech-patch.md](tech-patch.md) dla pełnej dokumentacji

## Workflow Integration

### Template Update Workflow

```bash
yarn update-template --dry-run  # Sprawdź aktualizacje
yarn update-template            # Wykonaj aktualizację
git diff                        # Sprawdź zmiany
yarn test && yarn build         # Test
```

**Szczegóły:** [tech-s-update-manager.md#4-workflow-aktualizacji](tech-s-update-manager.md#4-workflow-aktualizacji)

### Dependency Update Workflow (gdy włączysz Renovate)

Renovate automatycznie tworzy PR-y → Review → Merge po testach

**Szczegóły:** [tech-renovate.md](tech-renovate.md)

### Patch Management Workflow (gdy potrzebny)

```bash
npx patch-package package-name  # Stwórz patch
git add patches/                # Commit
```

**Szczegóły:** [tech-patch.md](tech-patch.md)

## Environment Variables

### Development

```bash
# .env.local
NGROK_AUTH_TOKEN=your-ngrok-token
```

### CI/CD

```bash
# GitHub Actions Secrets
RENOVATE_TOKEN=your-renovate-token
NGROK_AUTH_TOKEN=your-ngrok-token
```

## Troubleshooting Commands

**s-update-manager:** Zobacz [tech-s-update-manager.md#9-troubleshooting](tech-s-update-manager.md#9-troubleshooting)

**Renovate Bot:** Zobacz [tech-renovate.md#3-troubleshooting](tech-renovate.md#3-troubleshooting)

**patch-package:** Zobacz [tech-patch.md#3-troubleshooting](tech-patch.md#3-troubleshooting)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia
- [`technical.md`](technical.md) — synergia między narzędziami
- [`tech-s-update-manager.md`](tech-s-update-manager.md) — szczegóły s-update-manager
- [`tech-renovate.md`](tech-renovate.md) — szczegóły Renovate Bot
- [`tech-patch.md`](tech-patch.md) — szczegóły patch-package
- [`../16-maintenance/`](../16-maintenance/) — długoterminowe utrzymanie
- [`package.json`](../../../package.json) — dependencies i skrypty
- [`renovate.json`](../../../renovate.json) — konfiguracja Renovate
- [`.sum.config.json`](../../../.sum.config.json) — konfiguracja s-update-manager
