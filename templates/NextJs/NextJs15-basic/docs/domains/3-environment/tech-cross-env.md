# Cross-Platform Environment Variables

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
## Co to jest cross-env?

Cross-env to narzędzie zapewniające spójne działanie zmiennych środowiskowych między systemami operacyjnymi (Windows, macOS, Linux). Eliminuje różnice w składni ustawiania zmiennych, zapewniając identyczne zachowanie skryptów na wszystkich platformach.

## Problem i Rozwiązanie

**Problem:** Skrypty z Unix-style syntax (`VARIABLE=value`) nie działają na Windows, a Windows-style (`SET VARIABLE=value`) nie działają na Linux/macOS.

**Rozwiązanie:** Cross-env zapewnia jednolitą składnię działającą na wszystkich platformach:

```bash
# ✅ Działa wszędzie
cross-env ANALYZE=true yarn build

# ❌ Nie działa na Windows
ANALYZE=true yarn build

# ❌ Nie działa na Linux/macOS
SET ANALYZE=true && yarn build
```

## Integracja z T3 Env

Cross-env ustawia zmienne środowiskowe w skryptach, które następnie są walidowane przez T3 Env:

```bash
# package.json
"build:analyze": "cross-env ANALYZE=true run-s build"
```

Zmienna `ANALYZE` jest następnie dostępna w `env.mjs` i walidowana przez T3 Env.

**Szczegóły:** [technical.md](technical.md) — konfiguracja T3 Env z cross-env

## Wersja w projekcie

- **Package:** `cross-env@^7.0.3`
- **Typ:** devDependency

## Wystąpienia

- [`technical.md`](technical.md) — setup i integracja z T3 Env
- [`overview.md`](overview.md) — koncepcja environment management
- [`reference.md`](reference.md) — API dokumentacja environment variables
- [`package.json`](../../../package.json) — scripts używające cross-env (reference)
