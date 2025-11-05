# Knip - Unused Code Detection

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
## Rola Knip w projekcie

Wykrywa nieużywany kod, dependencies i exports. Narzędzie manualne — uruchamiane na żądanie do czyszczenia projektu i optymalizacji bundle.

## Co wykrywa Knip

- Nieużywane pliki — pliki nieimportowane w kodzie
- Nieużywane exports — funkcje/zmienne eksportowane ale nieużywane
- Nieużywane dependencies — pakiety w package.json nieużywane w kodzie
- Dead code — kod, który nigdy nie jest wykonywany

## Jak używać

### Podstawowe uruchomienie

```bash
yarn quality:knip
```

**Szczegóły:** Zobacz [package.json](../../../package.json) (linia 48)

### Opcje reportera

```bash
# Kompaktowy output
yarn knip --reporter compact

# JSON output
yarn knip --reporter json

# Bez progress bar
yarn knip --no-progress
```

## Konfiguracja w projekcie

**Plik:** [knip.json](../../../knip.json)

**Kluczowe decyzje:**

- **Entry points:** `src/app/**`, `src/pages/**`, `src/components/**`, `src/lib/**`, `src/utils/**`, `src/configs/**`, `src/assets/**`
  - To są katalogi, które Next.js traktuje jako entry points (routes, komponenty, utilities). Knip analizuje tylko te katalogi, ignorując build artifacts i node_modules.
- **Ignore:** pliki testowe (`.test.ts`, `.spec.ts`, `__tests__`), `.next`, `node_modules`
- **Ignore dependencies:** `@types/*`, `typescript`, `eslint-*`, `@typescript-eslint/*` (narzędzia dev)
- **ignoreExportsUsedInFile:** `interface` i `type` — ignoruje eksporty używane w tym samym pliku (np. type używany tylko w tym samym pliku nie jest traktowany jako unused)

## Interpretacja wyników (skrót)

- **Unused files** → Sprawdź czy rzeczywiście nieużywane, usuń lub dodaj do `ignore`
- **Unused exports** → Usuń lub dodaj do `ignore`
- **Unused dependencies** → Sprawdź czy używane, usuń lub dodaj do `ignoreDependencies`
- **False positives** → Dodaj do `ignore` w `knip.json`

## Status integracji

**Aktualnie:** Narzędzie manualne — uruchamiane przez `yarn quality:knip`

**Możliwe rozszerzenia:**

- Pre-push hook: dodać `yarn quality:knip` do `.husky/pre-push` (opcjonalnie, może spowolnić workflow)
- CI/CD: dodać do GitHub Actions workflow (opcjonalnie)

**Szczegóły:** Zobacz [tech-husky.md](tech-husky.md) — jak dodać do hooków

## Troubleshooting

- "Module not found" → Sprawdź `entry` w `knip.json`, uruchom `yarn knip --debug`
- "Too many false positives" → Dodaj do `ignore` w `knip.json`
- "Performance issues" → Użyj `--cache` lub ogranicz scope analizy

## Wystąpienia

- [overview.md](overview.md) — kontekst i decyzje (poza kanonem starterów)
- [technical.md](technical.md) — synergia narzędzi jakości
- [tech-madge.md](tech-madge.md) — podobne narzędzie (coupling analysis)
- [6-developer-experience/technical.md](../6-developer-experience/technical.md) — kontekst DX tools

## Oficjalna dokumentacja

- Knip — https://knip.dev
- Configuration — https://knip.dev/configuration
- Reporters — https://knip.dev/reporters
