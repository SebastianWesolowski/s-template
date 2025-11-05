# Dependency Management Technical Guide

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

Renovate Bot automatycznie aktualizuje dependencies poprzez pull requesty.

**Plik konfiguracyjny:** [`renovate.json`](../../../renovate.json)

### Konfiguracja

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base"],
  "packageRules": [
    {
      "enabled": false,
      "matchPackagePatterns": ["*"]
    }
  ],
  "vulnerabilityAlerts": {
    "enabled": true
  },
  "osvVulnerabilityAlerts": true
}
```

### Funkcjonalność

- **Vulnerability Alerts** - automatyczne alerty dla security issues
- **OSV Vulnerability Alerts** - Open Source Vulnerability database integration
- **Package Rules** - konfiguracja aktualizacji (obecnie wyłączone dla wszystkich pakietów)

**Szczegóły:** [Renovate Documentation](https://docs.renovatebot.com/)

## s-update-manager

Narzędzie do propagacji zmian z szablonu matki do projektów.

**Script:** [`update-template`](../../../package.json) w package.json

### Użycie

```bash
# Aktualizacja z remote template
yarn update-template

# Build i aktualizacja
yarn update-template:build
```

**Konfiguracja:** Remote repository URL w script: `https://github.com/SebastianWesolowski/s-template/tree/dev/templates/NextJs/NextJs15`

**Szczegóły:** [`../4-dependencies/tech-s-update-manager.md`](../4-dependencies/tech-s-update-manager.md)

## patch-package

Zarządzanie custom patchami dla dependencies.

**Konfiguracja:** [`package.json`](../../../package.json) - postinstall hook

```json
{
  "scripts": {
    "postinstall": "npx patch-package -y"
  }
}
```

### Workflow

1. Edytuj kod w `node_modules/package-name/`
2. Uruchom `npx patch-package package-name`
3. Patch zostanie zapisany w `patches/package-name+version.patch`
4. Patch automatycznie aplikowany przez postinstall hook

**Katalog:** [`patches/`](../../../patches/) - przechowuje wszystkie patche

**Szczegóły:** [`../4-dependencies/tech-patch.md`](../4-dependencies/tech-patch.md)

## npm audit

Security scanning dla dependencies.

### Użycie

```bash
# Sprawdź vulnerabilities
npm audit

# Automatyczne fixy (jeśli dostępne)
npm audit fix

# Fix tylko dla security issues
npm audit fix --only=security
```

### Integracja

- **Renovate** - automatyczne PR dla security updates
- **CI/CD** - można dodać `npm audit` do workflow
- **OSV Alerts** - Renovate integruje się z OSV database

**Szczegóły:** [`../13-security/`](../13-security/) — kontekst w Security Strategy

## Regular Maintenance Tasks

### Weekly

- Review Renovate PRs
- Merge non-breaking updates
- Check security alerts

### Monthly

- Review bundle size
- Check coupling graph
- Review test coverage
- Major version updates review

### Quarterly

- Architecture review
- Tool upgrades evaluation
- Dependency cleanup (unused packages)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Maintenance Strategy
- [`technical.md`](technical.md) — ogólna implementacja Maintenance
- [`../4-dependencies/`](../4-dependencies/) — kontekst w Dependency Management
- [`../13-security/`](../13-security/) — kontekst w Security Strategy
- [`renovate.json`](../../../renovate.json) — Renovate configuration (reference)
- [`package.json`](../../../package.json) — Maintenance scripts (reference)
- [`patches/`](../../../patches/) — patch-package patches (reference)
