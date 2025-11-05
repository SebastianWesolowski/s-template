# Jakość kodu Overview

> [!TIP] Źródło tematu: Jakość kodu
> Kanoniczna definicja tematu "Jakość kodu" - linting, formatting, type checking, code analysis.
> Wystąpienia: [technical.md](technical.md), [reference.md](reference.md)

## Concept

Warstwowe bramki jakości zapewniają spójność i przewidywalność pracy zespołu. Jakość jest egzekwowana lokalnie (w edytorze i przed commitem) oraz w CI, co obniża koszt błędów i przyspiesza decyzje.

## Problem

- Rozjazd standardów i stylu między członkami zespołu
- Ręczne poprawki i późne wykrywanie błędów
- Dryf jakości wraz ze wzrostem projektu
- Brak odniesienia kodu wyprodukowanego przez AI
- Wysoki koszt wejścia dla nowych developerów

## Why?

Stałe standardy i automatyzacja przynoszą korzyści biznesowe: krótszy time‑to‑merge, mniej regresji, łatwiejszy onboarding i większa przewidywalność dostarczania.

## Solution

- Warstwowe bramki jakości: edytor → pre‑commit/pre‑push → CI
- Minimalna modyfikacja szablonu: adaptacja zamiast instalacji od zera
- Decyzje projektowe (nietypowe względem oficjalnych przykładów):
  - Progresywny „dual ESLint” (standard/strict) dla stopniowego zaostrzania jakości
  - Prettier jako twardy standard formatu, bez negocjacji reguł
  - Husky jako realne bramki wejściowe do repozytorium (blokada błędów przed push)
  - Dodatkowa czystość kodu i zależności przez Knip/Madge (poza kanonem starterów)

## Capabilities

- Łatwe zaostrzanie polityk (przejście z standard → strict)
- Wymienność i rozszerzenia narzędzi bez zmiany filozofii
- Zachowanie szybkości pracy dzięki automatycznym fixom i spójnym zasadom

## Wystąpienia

- [technical.md](technical.md) — jak dostosować istniejący setup
- [reference.md](reference.md) — kompletna referencja i komendy
- [tech-eslint.md](tech-eslint.md) — zasady i strategia progresji
- [tech-prettier.md](tech-prettier.md) — standard formatu i integracja
- [tech-stylelint.md](tech-stylelint.md) — linting CSS/SCSS
- [tech-typescript.md](tech-typescript.md) — ścisłe typowanie i bezpieczeństwo zmian
- [tech-husky.md](tech-husky.md) — bramki pre‑commit/pre‑push
- [tech-commitlint.md](tech-commitlint.md) — walidacja commitów
- [tech-knip.md](tech-knip.md) — wykrywanie nieużywanego kodu
- [tech-madge.md](tech-madge.md) — analiza coupling
