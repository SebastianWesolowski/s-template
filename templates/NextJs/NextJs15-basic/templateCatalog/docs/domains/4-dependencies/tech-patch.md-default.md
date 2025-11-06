# patch-package

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

> [!WARNING] Status w projekcie
> **patch-package jest zainstalowany ale NIE UŻYWANY** - katalog `patches/` nie istnieje.
> Dokumentacja poniżej jest przygotowana na wypadek potrzeby użycia.

## 1. Tworzenie Patches

### Manualny Proces

```bash
# 1. Make changes to node_modules
# Edit: node_modules/some-package/lib/index.js

# 2. Create patch
npx patch-package some-package

# 3. Verify patch was created
ls patches/
# some-package+1.2.3.patch
```

## 2. Zarządzanie Patches

```bash
# Check if patches apply correctly
npx patch-package --check

# Apply patches manually
npx patch-package

# Reverse patches
npx patch-package --reverse
```

## 3. Troubleshooting

### Częste Problemy

```bash
# Patch not applying
npx patch-package --reverse
npx patch-package

# Check patch format
cat patches/some-package+1.2.3.patch | head -20

# Validate patch
npx patch-package --check

# Debug patch application
npx patch-package --debug
```

## Wystąpienia

- [`overview.md`](overview.md#3-patch-package---inteligentne-poprawki) — koncepcja inteligentnych poprawek
- [`technical.md`](technical.md#3-doraźne-rozwiązania) — synergia z innymi narzędziami
- [`reference.md`](reference.md#patch-package-configuration) — quick reference
- [`../16-maintenance/`](../16-maintenance/) — długoterminowe utrzymanie
- [`package.json`](../../../package.json) — scripts i dependencies
