# Styling Overview

> [!TIP] Źródło tematu: Styling
> Kanoniczna definicja tematu "Styling" - utility-first approach, Tailwind CSS, CVA, shadcn/ui.
> Wystąpienia: [technical.md](technical.md), [reference.md](reference.md)

## Concept

System stylowania w Next.js 15 Template opiera się na **utility-first approach** z wykorzystaniem Tailwind CSS, CVA (Class Variance Authority) oraz biblioteki shadcn/ui dla kompleksowego i nowoczesnego systemu stylowania.

## Problem

Tradycyjne podejścia do stylowania aplikacji webowych napotykają następujące problemy:

- **Powtarzalność kodu CSS** - Te same style kopiowane między komponentami
- **Brak spójności** - Różne podejścia do stylowania w zespole
- **Trudności z utrzymaniem** - CSS rozproszony po wielu plikach
- **Problemy z responsive design** - Ręczne zarządzanie breakpointami
- **Brak wsparcia dla wariantów** - Trudności z różnymi stanami komponentów

## Why?

Utility-first approach rozwiązuje fundamentalne problemy stylowania poprzez:

**Biznesowe korzyści:**
- Szybszy development - mniej czasu na pisanie CSS
- Spójniejszy design system - predefiniowane utility classes
- Łatwiejsze utrzymanie - scentralizowane podejście
- Lepsze doświadczenie użytkownika - responsywność out-of-the-box

**Techniczne korzyści:**
- Eliminacja duplikacji CSS
- Atomic design approach
- Wbudowane wsparcie dla dark mode
- Automatyczna optymalizacja (Purge CSS)

## Solution

Rozwiązanie opiera się na trzech głównych komponentach:

### Tailwind CSS
Podstawowy system utility classes zapewniający:
- Pełny zestaw utility classes dla wszystkich właściwości CSS
- Wbudowane wsparcie dla responsywności
- Dark mode i inne nowoczesne features
- Automatyczna optymalizacja przez Purge CSS

### CVA (Class Variance Authority)
Biblioteka do zarządzania wariantami komponentów:
- Type-safe wariant management
- Kompozycja klas CSS
- Łatwe rozszerzanie komponentów
- Integracja z Tailwind CSS

### shadcn/ui Integration
Biblioteka gotowych komponentów UI:
- Wysokiej jakości komponenty
- Pełna integracja z Tailwind CSS
- Dostępność (accessibility) out-of-the-box
- Łatwa customizacja

## Capabilities

System stylowania można łatwo rozszerzać i adaptować:

- **Dodatkowe utility classes** - Custom Tailwind plugins
- **Nowe komponenty wariantów** - Rozszerzanie CVA patterns
- **Custom design tokens** - Dostosowanie kolorów, spacing, typography
- **Integracja z innymi bibliotekami** - Radix UI, Headless UI itp.
- **Custom komponenty** - Budowanie na bazie shadcn/ui

## Occurrences

- [`technical.md`](technical.md) — implementacja i konfiguracja systemu stylowania
- [`reference.md`](reference.md) — kompletna referencja Tailwind config i utilities
- [`tech-tailwind.md`](tech-tailwind.md) — głęboki przewodnik po Tailwind CSS
- [`tech-cva.md`](tech-cva.md) — szczegóły Class Variance Authority
- [`tech-shadcn.md`](tech-shadcn.md) — integracja z shadcn/ui
