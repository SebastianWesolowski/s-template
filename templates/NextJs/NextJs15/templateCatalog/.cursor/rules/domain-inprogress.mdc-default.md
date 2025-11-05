# Rule: INPROGRESS.md — Usage and Standards

> Purpose: Define how to use `INPROGRESS.md` per domain to track temporary states, migrations, and exceptions without breaking SSoT.

## Checklist (before editing INPROGRESS.md)

1. Confirm the topic is temporary or undecided (not canonical content)
2. Verify canonical sources exist elsewhere (overview/technical/tech-\*.md)
3. Add clear status, scope, and exit conditions
4. Link to source and target documents (avoid duplication)
5. Mark patterns as reference-only if not implemented in code
6. Update occurrences and remove content once finalized

## Role and Scope

- Temporary log of ongoing work, exceptions, migrations, or pending decisions inside a domain
- Not a canonical source; never contains full specifications
- Bridges gaps until code and canonical docs are updated

## When to Use

- New pattern under evaluation (e.g., adopting Zustand)
- Example exists only as a reference (no code yet)
- File mentioned in docs does not exist (e.g., `src/middleware.ts`)
- Migration in progress (e.g., Button convergence, theme changes)

## When NOT to Use

- Finalized decisions and permanent documentation (put in `overview.md`, `technical.md`, `tech-*.md`)
- API/reference details (put in `reference.md`)

## File Placement

- One `INPROGRESS.md` per domain directory, next to `overview.md` and `technical.md`

## Structure Template

```markdown
# IN PROGRESS — Status prac i zmiany przejściowe dla domeny <domain>

> [!NOTE] Dokument w trakcie — niekanoniczny. Finalne informacje trafią do odpowiednich plików.

---

## 1. <Temat / Obszar>

- Problem/zakres: …
- Status: w toku / zablokowane / gotowe do wdrożenia
- Plan/exit criteria: …
- Odniesienia:
  - Kanoniczne: `overview.md`, `technical.md`, `tech-<name>.md`
  - Kod: `src/...` (jeśli istnieje)

## 2. <Następny temat>

...
```

## Authoring Guidelines

- Keep entries short and status-oriented (what/why/next)
- Use `[!NOTE]` to mark reference-only patterns (not implemented)
- Prefer links over duplication; include file paths that actually exist
- Explicitly call out missing files (e.g., “plik nie istnieje”) and intended target
- Record decisions with dates if relevant

## Lifecycle and Maintenance

- Create entry at start of work or when a gap is found
- Update on each milestone (decision made, PR merged)
- Remove or migrate content to canonical files immediately after finalization
- Ensure `technical.md` references `INPROGRESS.md` only for active topics

## Architecture Domain Examples (lessons learned)

- Middleware examples are reference-only; `src/middleware.ts` does not exist → tracked here until adopted
- State management: Only `AppProvider` exists; Zustand is an optional pattern under evaluation → tracked here
- Data fetching and error handling: Example patterns exist; adoption status tracked here until code added

## Do / Don’t

- Do: mark optional patterns, link to official docs for framework basics
- Do: state exit criteria and next steps
- Don’t: duplicate official Next.js docs (App Router, etc.)
- Don’t: keep stale entries — migrate or delete once finalized

## Cross-Links

- From `technical.md`: reference active items with a short note and link
- From `tech-*.md`: add status note if examples are reference-only
- Update `README.md` in the domain to mention `INPROGRESS.md` for live status
