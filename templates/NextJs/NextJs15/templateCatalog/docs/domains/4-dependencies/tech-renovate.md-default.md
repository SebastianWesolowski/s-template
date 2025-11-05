# Renovate Bot

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

> [!WARNING] Status w projekcie
> **Renovate Bot jest WYŁĄCZONY** - wszystkie package rules mają `"enabled": false`.
> Dokumentacja poniżej jest przygotowana na wypadek potrzeby włączenia.

## 1. Konfiguracja w Projekcie

### Aktualna Konfiguracja (Wyłączona)

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

### Podstawowa Konfiguracja (Gdy Włączysz)

```json
{
  "extends": ["config:base"],
  "timezone": "Europe/Warsaw",
  "schedule": ["before 6am on monday"],
  "labels": ["dependencies"],
  "prConcurrentLimit": 5,
  "prHourlyLimit": 2,
  "rangeStrategy": "bump",
  "bumpVersion": "patch"
}
```

## 2. Package Rules - Wzorce Konfiguracji

### Major Updates - Aktualizacje Wersji Głównych

**KIEDY UŻYWAĆ:** Gdy chcesz kontrolować aktualizacje, które mogą złamać kompatybilność wsteczną.

**CO SIĘ DZIEJE:** Renovate tworzy PR-y dla aktualizacji major, ale NIE merguje ich automatycznie. Wymaga review od zespołu.

**KONSEKWENCJE:**

- ✅ Bezpieczeństwo - nie ma niespodzianek w produkcji
- ❌ Wolniejsze aktualizacje - wymaga manual review
- ❌ Ryzyko przestarzałych dependencies

```json
{
  "matchUpdateTypes": ["major"],
  "labels": ["dependencies", "major"],
  "reviewers": ["@team/backend", "@team/frontend"],
  "assignees": ["@team/lead"],
  "automerge": false,
  "requiredStatusChecks": ["ci/tests", "ci/build"]
}
```

**SCENARIUSZ:** Duży zespół, stabilna aplikacja produkcyjna - lepiej być ostrożnym.

### Minor/Patch Updates - Aktualizacje Bezpieczne

**KIEDY UŻYWAĆ:** Gdy chcesz automatyczne aktualizacje dla bezpiecznych zmian.

**CO SIĘ DZIEJE:** Renovate automatycznie merguje PR-y dla minor/patch po przejściu testów.

**KONSEKWENCJE:**

- ✅ Szybkie aktualizacje bezpieczeństwa
- ✅ Mniej pracy manualnej
- ❌ Ryzyko problemów z CI/CD (rzadkie)

```json
{
  "matchUpdateTypes": ["minor", "patch"],
  "labels": ["dependencies", "minor"],
  "automerge": true,
  "automergeType": "pr",
  "requiredStatusChecks": null
}
```

**SCENARIUSZ:** Mały zespół, szybki development - automatyzacja oszczędza czas.

### Security Updates - Aktualizacje Bezpieczeństwa

**KIEDY UŻYWAĆ:** ZAWSZE - bezpieczeństwo to priorytet.

**CO SIĘ DZIEJE:** Renovate natychmiast tworzy PR-y dla vulnerabilites, ale wymaga review security team.

**KONSEKWENCJE:**

- ✅ Szybka reakcja na security issues
- ✅ Kontrola nad security changes
- ❌ Może wymagać szybkiego review

```json
{
  "vulnerabilityAlerts": {
    "labels": ["security", "dependencies"],
    "assignees": ["@team/security"],
    "reviewers": ["@team/security"],
    "automerge": false
  }
}
```

**SCENARIUSZ:** Każdy projekt - security vulnerabilities muszą być naprawiane natychmiast.

## 3. Troubleshooting

### Problem: Renovate Nie Tworzy PR-ów

**SYMPTOMY:** Brak nowych PR-ów od Renovate przez kilka dni/tygodni.

**KROKI DIAGNOSTYCZNE:**

1. **Sprawdź status Renovate w GitHub:**

   ```
   GitHub → Settings → Webhooks → Renovate
   ```

   - Czy webhook jest aktywny?
   - Czy ostatnie delivery było successful?

2. **Sprawdź token autoryzacji:**

   ```bash
   echo $RENOVATE_TOKEN
   ```

3. **Sprawdź logi w GitHub Actions:**

   ```
   GitHub → Actions → Renovate
   ```

4. **Test konfiguracji:**
   ```bash
   npx renovate-config-validator renovate.json
   ```

**ROZWIĄZANIE:** Jeśli wszystko wygląda OK, spróbuj ręcznego uruchomienia:

```bash
npx renovate --dry-run --config-file=renovate.json
```

### Problem: Zbyt Wiele PR-ów

**SYMPTOMY:** Renovate zalewa repo dziesiątkami PR-ów, zespół nie nadąża z review.

**ROZWIĄZANIE - Ograniczenie częstotliwości:**

```json
{
  "prConcurrentLimit": 3,
  "prHourlyLimit": 1,
  "schedule": ["before 6am on monday"]
}
```

**ROZWIĄZANIE - Grupowanie aktualizacji:**

```json
{
  "groupName": "Non-major dependencies",
  "groupSlug": "non-major",
  "matchUpdateTypes": ["minor", "patch"],
  "automerge": true
}
```

### Problem: Automerge Nie Działa

**SYMPTOMY:** PR-y są tworzone, ale nie mergują się automatycznie mimo `automerge: true`.

**KROKI DIAGNOSTYCZNE:**

1. **Sprawdź czy CI przechodzi** - czy wszystkie required checks są green?
2. **Sprawdź konfigurację automerge:**
   ```json
   {
     "automerge": true,
     "automergeType": "pr",
     "requiredStatusChecks": null
   }
   ```
3. **Sprawdź czy repo ma włączone auto-merge:**
   ```
   GitHub → Settings → General → Pull Requests
   → "Allow auto-merge" musi być włączone
   ```

## 4. Testowanie Konfiguracji

### Walidacja Konfiguracji

**PRZED COMMITEM** zawsze sprawdź czy konfiguracja jest poprawna:

```bash
npx renovate-config-validator renovate.json
```

### Test Dry-Run

**SYMULACJA** działania Renovate bez tworzenia PR-ów:

```bash
npx renovate --dry-run --config-file=renovate.json
```

### Debugging Commands

**GDY COŚ NIE DZIAŁA:**

```bash
# Szczegółowe logi
npx renovate --log-level=debug --dry-run --config-file=renovate.json

# Test konkretnego pakietu
npx renovate --dry-run --config-file=renovate.json --package-files=package.json
```

## Wystąpienia

- [`overview.md`](overview.md#2-renovate-bot---automatyczne-aktualizacje) — koncepcja automatycznych aktualizacji
- [`technical.md`](technical.md#2-ciągły-flow-updates) — synergia z innymi narzędziami
- [`reference.md`](reference.md#renovate-bot-configuration) — quick reference
- [`../16-maintenance/`](../16-maintenance/) — długoterminowe utrzymanie
- [`renovate.json`](../../../renovate.json) — konfiguracja
- [Renovate Docs](https://docs.renovatebot.com/) — oficjalna dokumentacja
