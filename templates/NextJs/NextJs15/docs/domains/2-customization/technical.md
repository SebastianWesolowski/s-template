# Customization How-to Guide

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## How-to Scenarios

### Jak skonfigurować pierwszy projekt

> [!NOTE] Wystąpienie tematu: Project Setup
> Proces customizacji w kontekście inicjalizacji projektu.
> Źródło: [tech-customize.md](tech-customize.md#przykład-1-nowy-projekt)

**Problem:** Masz świeży clone template i chcesz go spersonalizować.

**Rozwiązanie:**

1. Edytuj konfigurację: [`tools/customize/customize.config.ts`](../../../tools/customize/customize.config.ts)
2. Uruchom customize: `yarn customize`
3. Weryfikacja: Sprawdź czy wszystkie placeholdery zostały zastąpione

**Szczegóły:** [tech-customize.md](tech-customize.md#przykład-1-nowy-projekt) — kompletny przewodnik z przykładami

### Jak dodać własne placeholdery

> [!NOTE] Wystąpienie tematu: Custom Placeholders
> Dodawanie własnych placeholderów do systemu customization.
> Źródło: [tech-customize.md](tech-customize.md#przykład-2-customizacja-zaawansowana---własne-placeholdery)

**Problem:** Chcesz dodać nowy placeholder, którego nie ma w domyślnej konfiguracji.

**Rozwiązanie:**

1. Dodaj placeholder do plików - wstaw `{{PLACEHOLDER_MY_CUSTOM}}` w odpowiednie pliki
2. Dodaj do konfiguracji - dodaj nowy obiekt w `replacements`
3. Uruchom customize - `yarn customize`

**Ważne:** Musisz utrzymywać synchronizację między miejscami gdzie placeholder występuje a listą `files` w konfiguracji.

**Szczegóły:** [tech-customize.md](tech-customize.md#przykład-2-customizacja-zaawansowana---własne-placeholdery) — szczegółowy przewodnik z wszystkimi krokami

### Jak spersonalizować tylko wybrane pliki

**Problem:** Chcesz zaktualizować tylko niektóre pliki, nie wszystkie.

**Rozwiązanie:**

1. **Edytuj konfigurację** - usuń niepotrzebne pliki z tablicy `files`
2. **Uruchom customize** - tylko wybrane pliki zostaną zaktualizowane

**Przykład:** Zobacz [reference.md](reference.md) — konfiguracja plików

### Jak cofnąć customization

**Problem:** Chcesz cofnąć zmiany i wrócić do stanu przed customization.

**Rozwiązanie:**

1. **Git reset** - `git reset --hard HEAD~1` (jeśli commit był po customization)
2. **Ręczne cofnięcie** - edytuj pliki ręcznie
3. **Fresh clone** - sklonuj template ponownie

### Jak współdzielić konfigurację z zespołem

**Problem:** Chcesz, żeby zespół używał tej samej konfiguracji.

**Rozwiązanie:**

1. **Commit konfiguracji** - dodaj `customize.config.ts` do Git
2. **Udostępnij zespół** - każdy może skopiować plik
3. **Dostosuj indywidualnie** - każdy może zmienić swoje dane

**Przykład workflow:** Zobacz [reference.md](reference.md) — przykłady konfiguracji

### Troubleshooting

> [!NOTE] Wystąpienie tematu: Troubleshooting
> Rozwiązywanie problemów z customization.
> Źródło: [tech-customize.md](tech-customize.md#troubleshooting)

Wszystkie problemy i rozwiązania znajdziesz w: [tech-customize.md](tech-customize.md#troubleshooting)

**Typowe problemy:**

- Customization fails - brak wartości w konfiguracji
- Placeholders not replaced - placeholder nie znaleziony w pliku
- File not found - brakujący plik w konfiguracji

## Wystąpienia

### Właściciel tematu

- [`overview.md`](overview.md) — filozofia template customization
- [`tech-customize.md`](tech-customize.md) — kompletny przewodnik z przykładami i troubleshooting
- [`reference.md`](reference.md) — kompletna dokumentacja placeholderów i API

### Kontekst w projekcie

- [`../1-getting-started/technical.md`](../1-getting-started/technical.md) — proces instalacji
- [`../6-developer-experience/technical.md`](../6-developer-experience/technical.md) — customization w ekosystemie DX
- [`../../README.md`](../../README.md) — quick start guide
- [`../../INDEX.md#2-template-customization`](../../INDEX.md#2-template-customization) — centralna nawigacja

### Implementacja

- [`tools/customize/customize.example.config.ts`](../../../tools/customize/customize.example.config.ts) — przykład konfiguracji
