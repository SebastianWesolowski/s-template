# Personalizacja szablonu Overview

> [!TIP] Źródło tematu: Personalizacja szablonu
> Kanoniczna definicja tematu "Personalizacja szablonu" - filozofia placeholder system, automatyzacja setupu.
> Wystąpienia: [technical.md](technical.md), [reference.md](reference.md)

## Concept

System customizacji szablonu to **inteligentna automatyzacja**, która eliminuje ręczne, czasochłonne procesy setupu nowego projektu. Zamiast godzin kopiowania, wklejania i edytowania plików - jedna komenda personalizuje cały projekt w sekundach.

## Problem

Każdy nowy projekt wymaga:

- **Kopiowania** nazw projektów, autorów, opisów w dziesiątkach plików
- **Edytowania** package.json, README.md, LICENSE, .github, dokumentacji
- **Sprawdzania** czy wszystkie miejsca zostały zaktualizowane
- **Poprawiania** błędów i przeoczeń

**Rezultat:** 30-60 minut ręcznej pracy przy każdym projekcie, ryzyko błędów, frustracja.

## Why?

Automatyzacja została wprowadzona, aby wyeliminować czasochłonny, ręczny proces setupu projektów, który prowadzi do błędów, niespójności i frustracji developerów.

## Solution

**Jeden plik konfiguracyjny** zawiera wszystkie informacje o projekcie:

- Nazwa projektu, autor, email, opis
- URL repozytorium, dokumentacji
- Wersje, licencje, metadane

**Jedna komenda** propaguje te informacje do wszystkich plików w projekcie:

- `package.json`, `README.md`, `LICENSE`
- Dokumentacja, konfiguracje, skrypty
- Automatyczna walidacja kompletności

**Rezultat:** Setup w 2 minuty zamiast 30, zero błędów, spójność w całym projekcie.

## Capabilities

### Filozofia Placeholder System

### Mentalny Model: Template jako "Formularz"

Wyobraź sobie template jako **inteligentny formularz** z polami do wypełnienia:

- **Placeholdery** to pola formularza (`{{PLACEHOLDER_FULL_NAME}}`)
- **Konfiguracja** to wypełnienie formularza (jeden plik)
- **Customization** to automatyczne wypełnienie wszystkich miejsc w projekcie

### Dlaczego Placeholdery?

**Alternatywne podejścia i ich problemy:**

1. **Ręczne edytowanie** - czasochłonne, podatne na błędy
2. **Kopiowanie całych plików** - brak elastyczności, duplikacja
3. **Szablony z GUI** - ograniczone możliwości, brak wersjonowania
4. **CLI tools** - skomplikowane, wymagają nauki

**Nasze rozwiązanie - Placeholder System:**

- **Proste** - jeden plik, jedna komenda
- **Elastyczne** - dowolne pliki, dowolne placeholdery
- **Wersjonowane** - Git śledzi konfigurację
- **Przenośne** - działa w każdym projekcie
- **Walidowane** - automatyczne sprawdzanie poprawności

### Zasada "Single Source of Truth"

**Problem:** Te same informacje w wielu miejscach prowadzą do:

- Inconsistency między plikami
- Błędów przy aktualizacji
- Frustracji przy maintenance

**Rozwiązanie:** Jeden plik konfiguracyjny jako źródło prawdy:

- Wszystkie dane w jednym miejscu
- Automatyczna propagacja do wszystkich plików
- Gwarancja spójności
- Łatwość aktualizacji

## Korzyści Biznesowe

### Oszczędność Czasu

**Przed automatyzacją:**

- 30-60 minut ręcznego setupu każdego projektu
- Ryzyko błędów i przeoczeń
- Frustracja z powtarzających się zadań
- Inconsistency między projektami

**Po automatyzacji:**

- 2 minuty setupu nowego projektu
- Zero błędów dzięki walidacji
- Satysfakcja z efektywnej pracy
- Spójność we wszystkich projektach

### Przenośność Między Projektami

**Jeden plik konfiguracyjny** można:

- **Kopiować** między projektami
- **Wersjonować** w Git
- **Współdzielić** z zespołem
- **Dostosowywać** do potrzeb projektu

**Rezultat:** Standardyzacja procesów w zespole, łatwiejsze onboardowanie nowych developerów, spójność w całej organizacji.

### Skalowalność

**Dla pojedynczego developera:**

- Szybki setup nowych projektów
- Mniej czasu na rutynę, więcej na rozwój
- Mniej błędów, więcej pewności

**Dla zespołu:**

- Standardyzacja procesów
- Łatwiejsze onboardowanie
- Spójność w dokumentacji i konfiguracji

**Dla organizacji:**

- Redukcja czasu setupu projektów
- Zwiększenie produktywności zespołu
- Lepsze doświadczenie developerów

## Occurrences

### Pliki domeny

- [`tech-customize.md`](tech-customize.md) — kompletny przewodnik po customization (główny przewodnik techniczny)
- [`technical.md`](technical.md) — scenariusze użycia z linkami do tech-customize.md
- [`reference.md`](reference.md) — kompletna dokumentacja placeholderów i API

### Kontekst w projekcie

- [`../1-getting-started/`](../1-getting-started/) — kontekst w quick start
- [`../6-developer-experience/`](../6-developer-experience/) — customization w ekosystemie DX
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../../README.md#template-customization`](../../README.md#template-customization) — sekcja w README
- [`../../INDEX.md#2-template-customization`](../../INDEX.md#2-template-customization) — centralna nawigacja

### Memory Bank

- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md) — skrót customization dla AI
