# Quality Monitoring Technical Guide

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

Faktyczne narzędzia do monitorowania jakości kodu w projekcie.

### Knip - Unused Code Detection

Wykrywa nieużywany kod, dependencies i exports.

**Script:** [`quality:knip`](../../../package.json)

**Użycie:**

```bash
yarn quality:knip
```

**Konfiguracja:** [`knip.json`](../../../knip.json)

**Co wykrywa:**
- Nieużywane pliki
- Nieużywane exports
- Nieużywane dependencies
- Dead code

**Szczegóły:** [`../9-code-quality/tech-knip.md`](../9-code-quality/tech-knip.md)

### Madge - Coupling Analysis

Analizuje coupling i circular dependencies między modułami.

**Script:** [`quality:coupling:graph`](../../../package.json)

**Użycie:**

```bash
# Wygeneruj coupling graph
yarn quality:coupling:graph

# JSON output
yarn quality:coupling:json

# Sprawdź circular dependencies
npx madge --circular ./src
```

**Output:** [`reports/coupling.svg`](../../../reports/coupling.svg), [`reports/coupling.png`](../../../reports/coupling.png)

**Szczegóły:** [`../9-code-quality/tech-madge.md`](../9-code-quality/tech-madge.md)

### Bundle Analyzer

Monitorowanie rozmiaru bundle i analiza dependencies.

**Script:** [`build:analyze`](../../../package.json)

**Użycie:**

```bash
yarn build:analyze
```

**Funkcjonalność:**
- Analiza rozmiaru bundle
- Wizualizacja dependencies
- CI integration (bundle-analysis workflow)
- Bundle size limits tracking

**Szczegóły:** [`../11-performance/tech-bundle-analyzer.md`](../11-performance/tech-bundle-analyzer.md)

### Test Coverage

Raporty pokrycia testami.

**Script:** [`quality:coverage`](../../../package.json)

**Użycie:**

```bash
yarn quality:coverage
```

**Output:** [`reports/coverage/`](../../../reports/coverage/)

**Funkcjonalność:**
- Coverage reports przez Jest
- HTML reports
- Coverage thresholds

## Regular Quality Checks

### Weekly

- Run `yarn quality:knip` - check for unused code
- Review coupling graph - check for circular dependencies
- Review bundle size - check for size increases

### Monthly

- Review test coverage - ensure coverage thresholds
- Analyze bundle size trends
- Review quality metrics

## TODO: Future Monitoring

Następujące monitoring capabilities są planowane do implementacji:

- **Performance Monitoring** - Runtime performance metrics
- **Error Tracking** - Production error tracking system
- **Health Checks** - System health monitoring endpoints
- **Security Monitoring** - Real-time security alerts

**Status:** Teoretyczne - brak implementacji w projekcie

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Maintenance Strategy
- [`technical.md`](technical.md) — ogólna implementacja Maintenance
- [`../9-code-quality/tech-knip.md`](../9-code-quality/tech-knip.md) — Knip documentation
- [`../9-code-quality/tech-madge.md`](../9-code-quality/tech-madge.md) — Madge documentation
- [`../11-performance/tech-bundle-analyzer.md`](../11-performance/tech-bundle-analyzer.md) — Bundle Analyzer documentation
- [`../11-performance/`](../11-performance/) — kontekst w Performance Strategy
- [`../13-security/`](../13-security/) — kontekst w Security Strategy
- [`package.json`](../../../package.json) — Quality scripts (reference)
- [`knip.json`](../../../knip.json) — Knip configuration (reference)
