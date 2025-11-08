---
description: Mermaid diagram guidelines - routing hub dla wszystkich typów diagramów
globs: memory-bank/**/*.md,docs/**/*.md,*.md
alwaysApply: true
---

# Mermaid Diagram Guidelines

## Philosophy

**Zasada**: "Diagram > 1000 słów" - gdy struktura, przepływ lub relacje są złożone, użyj diagramu zamiast długiego opisu tekstowego.

**Kiedy używać diagramów:**

- Architektura systemu ma więcej niż 3 komponenty
- Przepływ danych ma więcej niż 4 kroki
- Istnieją złożone relacje między elementami
- Proces ma stany lub warunki
- Harmonogram ma zależności czasowe
- Struktura hierarchiczna ma więcej niż 2 poziomy

**Kontekst zastosowania:**

- Memory Bank files (memory-bank/\*.md)
- Dokumentacja techniczna (docs/\*.md)
- README i inne pliki Markdown (\*.md)

## Quick Decision Tree

**Co chcesz udokumentować?**

### 🚀 Szybki start z przykładami

**Użyj**: `@diagrams-quickstart`

- 13 typów diagramów z perspektywą Full-Stack
- Gotowe przykłady kodu Mermaid
- Praktyczne zastosowania

### 🏗️ Architektura i context mapping

**Użyj**: `@diagrams-architecture` (auto-attached dla memory-bank)

- Context mapping table
- Memory Bank patterns
- Component relationships
- Integration patterns

### 📋 Templates i real examples

**Użyj**: `@diagrams-templates`

- Copy-paste ready snippets
- Real project examples
- Customization tips
- Common patterns

### 🔧 Troubleshooting i rules

**Użyj**: `@diagrams-troubleshooting`

- Implementation rules (Do's & Don'ts)
- Common issues i solutions
- Debugging tips
- Performance optimization

## Routing Guide

| Potrzebujesz...         | Plik                        | Typ           | Opis                    |
| ----------------------- | --------------------------- | ------------- | ----------------------- |
| **Przykłady diagramów** | `@diagrams-quickstart`      | Manual        | 13 typów Full-Stack     |
| **Context mapping**     | `@diagrams-architecture`    | Auto Attached | Memory Bank patterns    |
| **Templates**           | `@diagrams-templates`       | Manual        | Copy-paste snippets     |
| **Debugging**           | `@diagrams-troubleshooting` | Manual        | Rules & troubleshooting |

## Workflow Examples

### Scenariusz 1: Dodaję diagram do memory-bank

1. Ten plik (Always Applied) → decision tree
2. "Architektura" → `@diagrams-architecture` (auto-attached)
3. Widzę context mapping dla systemPatterns.md
4. Wybieram Class Diagram dla component architecture

### Scenariusz 2: Potrzebuję szybkiego przykładu

1. `@diagrams-quickstart` → 13 typów
2. Kopiuję przykład Sequence Diagram dla API
3. Modyfikuję dla swojego use case

### Scenariusz 3: Diagram nie renderuje

1. `@diagrams-troubleshooting`
2. Common Issues → "Sprawdź składnię Mermaid"
3. Debugging Tips → "Użyj Mermaid Live Editor"
4. Fixuję problem

## Quick Reference

### Najczęściej używane typy

- **Graph/Flowchart** - przepływy i architektura
- **Sequence Diagram** - interakcje API
- **Class Diagram** - struktura komponentów
- **State Diagram** - cykle życia
- **User Journey** - ścieżki użytkownika

### Memory Bank integration

- `systemPatterns.md` → Class Diagrams, Block Diagrams
- `techContext.md` → State Diagrams, Sequence Diagrams
- `productContext.md` → User Journey, Sequence Diagrams
- `progress.md` → Gantt Charts, Timeline
- `activeContext.md` → Flowcharts, State Diagrams

## Mermaid Special Characters

### Znaki specjalne w Mermaid

**Ważne**: Mermaid ma problemy z niektórymi znakami specjalnymi. Używaj kodów HTML entities:

| Znak | Kod HTML | Przykład użycia        |
| ---- | -------- | ---------------------- |
| `:`  | `&#58;`  | `yarn build&#58;prod`  |
| `/`  | `&#47;`  | `src&#47;components`   |
| `&`  | `&#38;`  | `config&#38;settings`  |
| `<`  | `&#60;`  | `&#60;div&#62;`        |
| `>`  | `&#62;`  | `&#60;div&#62;`        |
| `"`  | `&#34;`  | `text&#34;quoted&#34;` |
| `'`  | `&#39;`  | `text&#39;quoted&#39;` |

### Przykłady poprawnego użycia

**❌ Błędne:**

```mermaid
note right of State: "yarn build:prod"
```

**✅ Poprawne:**

```mermaid
note right of State: "yarn build&#58;prod"
```

**❌ Błędne:**

```mermaid
A[Config & Settings] --> B[Build Process]
```

**✅ Poprawne:**

```mermaid
A[Config & Settings] --> B[Build Process]
```

### Automatyczne escape w notatkach

W notatkach Mermaid zawsze używaj cudzysłowów i kodów HTML:

```mermaid
note right of State: "Komentarz z&#58; dwukropkiem"
```
