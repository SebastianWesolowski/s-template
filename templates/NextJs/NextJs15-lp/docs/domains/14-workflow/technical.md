# Przewodnik techniczny workflow

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Development Workflow

### Git Hooks Setup

Projekt używa Husky do automatycznych sprawdzeń jakości kodu. Wszystkie hooki są skonfigurowane w [`.husky/`](../../../.husky/) directory.

**Pre-commit hook:**
```bash
# Sprawdza jakość kodu przed commitem
yarn lint && yarn type-check && yarn test
```

**Commit-msg hook:**
```bash
# Waliduje format commit message zgodnie z conventional commits
npx commitlint --edit $1
```

**Prepare-commit-msg hook:**
```bash
# Automatycznie formatuje commit message z Linear integration
npx czg --hook
```

## Commit & Push Workflow

Po zakończeniu developmentu, użyj zautomatyzowanego workflow:

```bash
# Dodaj pliki i rozpocznij commit
gaa && gc

# Wypełnij commit message z Linear issue (SC-XXX)
# Hooki automatycznie sprawdzą jakość kodu
# Push do brancha
git push origin feature/my-feature
```

**Commit message format:**
```
feat: ✨ [SC-123] add primary button component
```

**Automatyczne integracje:**
- Linear issue SC-123 zostanie zlinkowany
- GitHub Actions zaktualizuje status w Linear
- Changelog zostanie wygenerowany automatycznie

## Pull Request Workflow

```bash
# Po push, utwórz Pull Request
# GitHub Actions automatycznie uruchomi:
# - Lint + TypeScript check
# - Unit tests + E2E tests
# - Security scan
# - Performance tests
```

**PR Checklist:**
- [ ] Code review completed
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Linear issue linked

## Deployment Integration

Deployment jest obsługiwany przez dedykowane workflow w domenie [15-deployment](../15-deployment/):

- **Feature branches:** Automatic deployment to staging
- **Main branch:** Production deployment via semantic release
- **Release branches:** Controlled deployment to production

**Szczegóły:** [Deployment Technical Guide](../15-deployment/technical.md)

## Code Quality Integration

Wszystkie sprawdzenia jakości kodu są skonfigurowane w domenie [9-code-quality](../9-code-quality/):

- **Pre-commit:** ESLint, Prettier, TypeScript
- **CI/CD:** Full test suite + coverage reports
- **Security:** Automated security scans

**Szczegóły:** [Code Quality Technical Guide](../9-code-quality/technical.md)

## Troubleshooting

### Git Hooks Issues

**Problem:** Hooki nie uruchamiają się
```bash
# Sprawdź czy husky jest zainstalowany
yarn husky

# Reinstall hooks
yarn prepare
```

**Problem:** Commit message validation fails
```bash
# Sprawdź format: type(scope): description [issue]
feat: add login component [SC-123]

# Użyj commitizen do automatycznego formatowania
gc
```

### Linear Integration Issues

**Problem:** Issue nie linkuje się automatycznie
```bash
# Sprawdź format: [SC-XXX] w commit message
# Upewnij się, że issue istnieje w Linear
# Sprawdź konfigurację w .releaserc.js
```

## Rekomendacje

- **Commit często:** Małe, atomiczne commity ułatwiają review
- **Używaj conventional commits:** Automatyczne generowanie changelog
- **Linkuj issues:** [SC-XXX] format dla automatycznej integracji
- **Testuj lokalnie:** Przed push'em uruchom pełne testy

---

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia workflow
- [reference.md](reference.md) — kompletna referencja konfiguracji workflow
- [../5-issue-tracking/](../5-issue-tracking/) — integracja z Linear issue tracking
- [../9-code-quality/](../9-code-quality/) — code quality checks w workflow
- [../10-testing/](../10-testing/) — testing integration w CI/CD
- [../15-deployment/](../15-deployment/) — deployment workflow
- [../13-security/](../13-security/) — security checks w workflow
