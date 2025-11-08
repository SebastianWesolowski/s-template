# Śledzenie zadań Overview

> [!TIP] Źródło tematu: Śledzenie zadań
> Kanoniczna definicja tematu "Śledzenie zadań" - conventional commits, SC-XXX linking, minimal friction workflow.
> Wystąpienia: [technical.md](technical.md), [reference.md](reference.md)

## Concept

System śledzenia zadań w Next.js 15 Template opiera się na **minimal friction approach** - prostej, ale efektywnej metodzie łączenia commitów z zadaniami poprzez conventional commits i SC-XXX tagging, bez konieczności skomplikowanych integracji API.

## Problem

Tradycyjne systemy śledzenia zadań wymagają:

- **Złożonych integracji API** - webhooki, tokens, permissions
- **Ręcznych aktualizacji** - osobne oznaczanie zadań jako wykonane
- **Dodatkowych narzędzi** - JIRA, GitHub Issues, Linear bots
- **Czasochłonnego setupu** - konfiguracja każdej nowej integracji

**Rezultat:** Zespół poświęca czas na konfigurację zamiast na development.

## Why?

Minimal friction approach przynosi kluczowe korzyści biznesowe:

**Dla developerów:**
- Brak konieczności nauki nowych narzędzi
- Brak czekania na approval webhooków
- Natychmiastowe łączenie commitów z zadaniami
- Zachowanie kontroli nad workflow

**Dla zespołów:**
- Szybsze onboardowanie nowych członków
- Spójność procesów między projektami
- Łatwiejsze utrzymanie i skalowanie
- Mniej punktów awarii

**Dla organizacji:**
- Obniżenie kosztów utrzymania narzędzi
- Zwiększenie produktywności zespołu
- Lepsze traceability bez overhead

## Solution

Rozwiązanie opiera się na trzech filarach:

### Conventional Commits + SC-XXX
- **Conventional commits** - standaryzacja formatu commit messages
- **SC-XXX tagging** - proste łączenie z Linear issues
- **Zero API dependency** - działa offline, bez webhooków

### Developer Control
- **Opcjonalne tagging** - developer decyduje o granularności
- **Formatowanie bez blokowania** - husky hooks pomagają, nie przeszkadzają
- **Fallback support** - działa nawet bez SC-XXX

### Changelog Integration
- **Automatyczne linki** - semantic-release generuje linki do Linear
- **Grupowanie po zadaniach** - changelog zorganizowany wg SC-XXX
- **Direct navigation** - linki prowadzą bezpośrednio do issues

## Capabilities

System można rozszerzać i adaptować:

- **Custom tagging** - zmiana formatu SC-XXX na inny
- **Additional validation** - silniejsze wymagania SC-XXX
- **Integration expansion** - dodanie webhooków jeśli potrzebne
- **Multi-platform** - rozszerzenie na GitHub Issues, JIRA itp.

## Occurrences

- [`technical.md`](technical.md) — szczegóły implementacji i konfiguracji
- [`reference.md`](reference.md) — kompletna referencja formatów i konfiguracji
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`../15-deployment/`](../15-deployment/) — integracja z release management
