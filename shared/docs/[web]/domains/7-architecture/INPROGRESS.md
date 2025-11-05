# IN PROGRESS — Status prac i zmiany przejściowe dla domeny architecture

> [!NOTE] **DOKUMENTACJA I KOD W TRAKCIE MIGRACJI / WDROŻENIA**
>
> Poniższy plik opisuje wszystkie tymczasowe wyjątki i trwające prace w domenie architektury. Stan ten jest przejściowy i nie należy go uznawać za finalny wzorzec — po ukończeniu migracji dokumentacja zostanie zaktualizowana.

---

## 1. Komponent Button — stan przejściowy

- **Obecnie istnieją dwie implementacje Button:**
  - `src/ui/button.tsx` — wersja bazowa/prymityw, testowana pod kątem bazowania na shadcn/ui/Radix UI
  - `src/components/Button/Button/Button.tsx` — dotychczasowa, rozbudowana wersja aplikacyjna (feature, obsługa linków, warianty intent)
- Trwa **migracja do jednej, spójnej implementacji Button**
  - Docelowa wersja będzie oparta o shadcn/ui (lub własną forkowaną bibliotekę)
  - Różnice i dublowanie są stanem przejściowym wynikającym z testów oraz stopniowej adopcji nowych wzorców
  - Aktualna dokumentacja opisuje obie wersje — po ujednoliceniu wzorzec będzie podany TYLKO dla architektury docelowej.

## 2. Middleware — przykład referencyjny, brak implementacji produkcyjnej

- Przykłady middleware (`src/middleware.ts`) są tylko propozycją/wzorcami na przyszłość
- Brak faktycznej implementacji — jeśli pojawi się potrzeba produkcyjna, powstanie rzeczywisty plik i docelowa dokumentacja

## 4. Data Fetching i Error Handling — wzorce referencyjne

- Sekcje w `tech-data-fetching.md` oraz `tech-error-handling.md` zawierają wzorce referencyjne (Server Components + rewalidacja, SWR po stronie klienta, `ErrorBoundary`, globalna strona błędów)
- Przykłady kodu mogą nie odpowiadać aktualnym plikom w repozytorium; adopcja będzie odnotowana i zsynchronizowana z kodem, a dokumentacja zaktualizowana

## 5. Zustand — opcjonalny wzorzec, brak użycia

- W `tech-state-management.md` opisano `Zustand` jako opcję do rozważenia (persist, lekkie sklepy)
- Aktualnie `Zustand` nie jest używany w repozytorium; docelowa decyzja i ewentualne wdrożenie zostaną odnotowane tutaj

## 6. State Management — plan adopcji lekkich sklepów

- Stan obecny: globalne konteksty z `AppProvider` (wdrożone)
- W toku: ewaluacja lekkich sklepów dla izolowanych funkcji (np. `Zustand`) pod kątem prostoty i persystencji
- Po decyzji: aktualizacja implementacji + synchronizacja dokumentacji (`tech-state-management.md`) i tego pliku

## 3. Prace ogólne / migracje

- Migracja ThemeProvider musi zakończyć się usunięciem wszystkich customowych patternów na rzecz (lub z pełną integracją) `next-themes`
- Testy nowych wzorców colocation dla komponentów (README, stories, testy w folderach komponentów)
- Standaryzacja use-case`ów dla utils (własne vs. external fork)

## Status

- Na bieżąco uaktualniaj ten plik przy każdej niestandardowej sytuacji czy większej migracji
- In progress: migracja Button, migracja theme, konwergencja struktur komponentów
