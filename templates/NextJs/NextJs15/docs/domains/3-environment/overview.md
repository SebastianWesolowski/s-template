# Zarządzanie środowiskiem Overview

> [!TIP] Źródło tematu: Zarządzanie środowiskiem
> Kanoniczna definicja tematu "Zarządzanie środowiskiem" - T3 Env, type-safe variables, centralna konfiguracja.
> Wystąpienia: [technical.md](technical.md), [reference.md](reference.md)

## Concept

System zarządzania środowiskiem opiera się na **T3 Env** z centralizowaną konfiguracją, zapewniając type-safe environment variables.

## Problem

- **Brak type safety** - `process.env.VARIABLE` zwraca `string | undefined`
- **Brak walidacji** - Nie ma sprawdzania czy wymagane zmienne istnieją
- **Brak dokumentacji** - Trudno wiedzieć jakie zmienne są potrzebne

## Why?

T3 Env został wybrany, aby rozwiązać problemy związane z brakiem type safety, walidacji i dokumentacji w standardowych environment variables, zapewniając bezpieczne i spójne zarządzanie konfiguracją środowiskową.

## Solution

- **Type Safety** - Automatyczne generowanie typów TypeScript
- **Runtime Validation** - Sprawdzanie zmiennych przy starcie aplikacji
- **Schema Definition** - Centralne miejsce definicji wszystkich zmiennych

## Capabilities

### Project-Specific Variables

### Server Variables (Tylko na serwerze)

- **`ANALYZE`** - Włącza Next.js Bundle Analyzer
- **`NGROK_AUTH_TOKEN`** - Autentykacja dla ngrok tunneling
- **`STRICT_RULES`** - Włącza strict ESLint configuration

### Client Variables (Dostępne w przeglądarce)

- **Obecnie brak** - `client: {}` jest pusty w `env.mjs`

### Zmienne Demonstracyjne

Projekt zawiera przykładowe zmienne (`ENV_VARIABLE`, `DEBUG`, etc.) dostępne w `/development` page, pokazujące:

- Różnice między środowiskami (dev/prod/test)
- Wzorce server/client variables
- Type safety w praktyce

## Logika Wyboru Środowiska

Next.js **automatycznie** określa środowisko:

| Komenda                     | NODE_ENV      | Opis                               |
| --------------------------- | ------------- | ---------------------------------- |
| `next dev`                  | `development` | Tryb deweloperski z hot-reload     |
| `next build` + `next start` | `production`  | Tryb produkcyjny z optymalizacjami |
| `jest` / `test`             | `test`        | Tryb testowy z izolacją            |

## Architektura Konfiguracji

System opiera się na **trzech filarach**:

1. **T3 Env Schema** - Centralne miejsce definicji wszystkich zmiennych
2. **Centralized Config** - Modularna struktura konfiguracji aplikacji
3. **Type Safety** - Automatyczne generowanie typów TypeScript

## Korzyści Biznesowe

### Oszczędność Czasu

- Automatyczna walidacja przy starcie aplikacji
- Type safety w całej aplikacji
- Jasne komunikaty o błędach konfiguracji

### Bezpieczeństwo

- **Server Variables** - Tylko na serwerze
- **Client Variables** - Dostępne w przeglądarce
- **Runtime Validation** - Sprawdzanie przy każdym starcie

### Skalowalność

- Łatwe dodawanie nowych zmiennych
- Spójna konfiguracja między developerami
- Centralne zarządzanie konfiguracją

## Occurrences

- [`technical.md`](technical.md) — szczegóły implementacji i setup
- [`reference.md`](reference.md) — kompletna dokumentacja API
- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md#environment-management) — skrót dla AI
- [`../1-getting-started/`](../1-getting-started/) — setup environment w quick start
- [`tech-cross-env.md`](tech-cross-env.md) — cross-platform environment variables
- [`../../INDEX.md#3-environment`](../../INDEX.md#3-environment) — centralna nawigacja
- [`../../../.env.development.example`](../../../.env.development.example) — przykład konfiguracji development (reference)
