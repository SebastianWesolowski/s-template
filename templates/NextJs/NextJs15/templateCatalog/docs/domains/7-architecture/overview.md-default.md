# Architektura Overview

> [!TIP] Źródło tematu: Architecture Philosophy
> Ten rozdział jest kanoniczny i definiuje pojęcia Architektury w szablonie. Decyzje architektoniczne, wzorce projektowe, struktura komponentów i przepływ danych.

## Concept

Architektura tej platformy opiera się na idei **modularności, skalowalności i type safety**. System projektowany jest z myślą o łatwym rozwoju oraz przejrzystości, co zapewnia zespołowi komfort pracy i szybkie wdrażanie zmian zgodnie z potrzebami organizacji.

### Next.js App Router Foundation

Podstawą architektury jest **Next.js 15 App Router** - nowoczesny system routingu oparty na strukturze plików. Architektura wykorzystuje Server Components jako domyślne podejście, zapewniając optymalizację wydajności i SEO.

### Component Architecture

System komponentów opiera się na **colocation principle** - wszystkie pliki związane z komponentem (kod, testy, dokumentacja, stories) znajdują się w jednym folderze. Komponenty wykorzystują **TypeScript** dla type safety oraz **CVA (Class Variance Authority)** dla zarządzania wariantami stylów.

### Modular Structure

Architektura promuje podział na moduły funkcjonalne:

- **Komponenty** - reużywalne elementy UI z colocation
- **Konfiguracje** - scentralizowane ustawienia i konfiguracje
- **Style** - system stylowania z Tailwind CSS i CVA
- **Utils** - funkcje pomocnicze i utilities
- **API Routes** - endpointy Next.js dla backend logic

### Data Flow Patterns

Architektura preferuje **Server-First approach**:

- **Server Components** jako domyślne - dla SEO i wydajności
- **Client Components** tylko gdy potrzebne - interaktywność, hooks, state
- **SWR** dla client-side data fetching z rewalidacją
- **Rewalidacja** dla kontroli cache i aktualizacji danych

## Problem

Wieloprojektowe środowiska i złożone aplikacje często generują trudności związane z ich rozwojem i utrzymaniem.

### Niespójne Struktury

Projekty bez jasnej struktury prowadzą do:

- **Duplikacji kodu** - te same wzorce w różnych miejscach
- **Brak przewidywalności** - trudno znaleźć gdzie coś się znajduje
- **Trudności w onboarding** - nowi developerzy muszą odkrywać strukturę
- **Rozproszone zależności** - trudno zarządzać zależnościami między modułami

### Trudności w Skalowaniu

Brak modularności utrudnia:

- **Dodawanie nowych funkcji** - nie wiadomo gdzie umieścić nowy kod
- **Refaktoryzację** - zmiany w jednym miejscu wpływają na wiele innych
- **Testowanie** - trudno testować rozproszony kod
- **Współpracę zespołu** - konflikty przy równoległej pracy

### Problemy z Type Safety

Brak silnego typowania prowadzi do:

- **Błędy runtime** - wykrywane dopiero w czasie działania
- **Trudności w refaktoryzacji** - brak bezpieczeństwa zmian
- **Słabe IDE support** - brak podpowiedzi i autouzupełniania
- **Niejasne kontrakty** - nie wiadomo jakie dane są wymagane

### Zarządzanie Stanem i Danymi

Brak spójnych wzorców dla:

- **Data fetching** - różne podejścia w różnych miejscach
- **State management** - global state vs local state
- **Error handling** - niespójne obsługiwanie błędów
- **Loading states** - różne sposoby pokazywania stanów ładowania

## Why?

Motywacją była potrzeba stworzenia elastycznej bazy, która sprosta zarówno obecnym, jak i przyszłym oczekiwaniom organizacji.

### Business Value

**Szybszy Time to Market**

- Przewidywalna struktura skraca czas implementacji
- Gotowe wzorce eliminują konieczność podejmowania decyzji od zera
- Modularność pozwala równoległą pracę zespołu

**Niższe Koszty Utrzymania**

- Spójne wzorce ułatwiają zrozumienie kodu
- Type safety redukuje błędy produkcyjne
- Colocation ułatwia lokalizację i naprawę problemów

**Wysoka Jakość**

- TypeScript zapewnia compile-time validation
- Sprawdzone wzorce redukują ryzyko błędów
- Testowalna struktura ułatwia pokrycie testami

**Skalowalność**

- Modularność pozwala dodawać funkcje bez wpływu na istniejące
- App Router zapewnia optymalizację out-of-the-box
- Server Components redukują bundle size

### Architectural Decisions

**Next.js App Router** - wybór dla Server Components, SEO, i optymalizacji wydajności

**TypeScript Strict Mode** - dla type safety i lepszego Developer Experience

**Colocation Principle** - dla łatwiejszego utrzymania i usuwania komponentów

**CVA dla Variants** - dla type-safe zarządzania wariantami stylów

**Server-First Data Fetching** - dla SEO i wydajności, Client Components tylko gdy potrzebne

## Solution

Wdrożenie modularnej architektury Next.js i sprawdzonych wzorców projektowych zapewnia zespołowi przewidywalną strukturę oraz łatwość wprowadzania nowych funkcji.

### File-Based Routing

Next.js App Router wykorzystuje strukturę folderów w `src/app/` do definiowania routingu. Każdy folder reprezentuje segment route, a specjalne pliki (`page.tsx`, `layout.tsx`, `error.tsx`) definiują zachowanie dla danego segmentu.

### Component Colocation

Komponenty organizowane są według zasady colocation - każdy komponent ma własny folder zawierający:

- Komponent główny (`ComponentName.tsx`)
- Testy (`ComponentName.test.tsx`)
- Storybook stories (`ComponentName.stories.tsx`)
- Dokumentację (`README.md`)
- Public API (`index.ts`)

### Type Safety Architecture

Cały kod pisany w TypeScript z strict mode. Komponenty mają zdefiniowane interfejsy dla props, CVA variants są type-safe, a API routes mają typowane request/response.

### Styling Integration

System stylowania zintegrowany z architekturą komponentów:

- Tailwind CSS dla utility classes
- CVA dla type-safe variants
- Colocation stylów przy komponentach

### Data Fetching Strategy

Hierarchia podejść do data fetching:

1. **Server Components** - domyślne, dla SEO i wydajności
2. **API Routes** - dla backend logic i external APIs
3. **SWR** - dla client-side data fetching z cache
4. **Rewalidacja** - dla kontroli aktualizacji danych

### Error Handling Architecture

Wielopoziomowa obsługa błędów:

- **Error Boundaries** - dla komponentów React
- **Global Error Pages** - dla błędów aplikacji
- **API Error Handling** - dla błędów API routes
- **Type-safe Errors** - dla przewidywalnej obsługi błędów

## Capabilities

Projekt umożliwia proste skalowanie, personalizację oraz adaptację do nowych wymagań.

### Modular Extension

Architektura pozwala na łatwe dodawanie nowych modułów bez wpływu na istniejące:

- **Nowe routes** - dodaj folder w `src/app/`
- **Nowe komponenty** - stwórz folder z colocation pattern
- **Nowe API endpoints** - dodaj route w `src/app/api/`
- **Nowe utilities** - dodaj do `src/utils/`

### Customization Options

Projekt można dostosować do specyficznych potrzeb:

- **Custom routing** - przez middleware i route handlers
- **Custom components** - przez rozszerzanie istniejących wzorców
- **Custom data fetching** - przez API routes i external services
- **Custom styling** - przez rozszerzanie Tailwind i CVA variants

### Integration Points

Architektura zapewnia jasne punkty integracji:

- **External APIs** - przez API routes i Server Components
- **Third-party Services** - przez utilities i wrappery
- **Database** - przez API routes i Server Components
- **Authentication** - przez middleware i context providers

### Performance Optimization

Built-in optymalizacje Next.js:

- **Automatic Code Splitting** - przez App Router
- **Image Optimization** - przez Next.js Image component
- **Font Optimization** - przez next/font
- **Server Components** - redukują bundle size client-side

### Team Collaboration

Architektura wspiera współpracę zespołu:

- **Colocation** - redukuje konflikty przy równoległej pracy
- **Type Safety** - ułatwia code review i refaktoryzację
- **Spójne wzorce** - ułatwiają onboarding nowych developerów
- **Clear ownership** - każdy komponent ma jasne miejsce

## Occurrences

- [`technical.md`](technical.md) — szczegóły implementacyjne i techniczne
- [`tech-nextjs.md`](tech-nextjs.md) — architektura Next.js App Router
- [`memory-bank/systemPatterns.md`](../../../memory-bank/systemPatterns.md) — skrót architektury dla AI
- [`../component-development/`](../component-development/) — szczegóły komponentów
- [`../8-styling/`](../8-styling/) — kontekst systemu stylowania
- [`../../README.md#architecture-patterns`](../../README.md#architecture-patterns) — sekcja w README
