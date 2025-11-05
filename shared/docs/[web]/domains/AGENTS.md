# AI Agent Instructions for Domain Documentation

> [!WARNING] CRITICAL RULES
> These rules are non-negotiable. Violating them breaks the Knowledge Graph and creates content duplication.

## 🔵 CORE WORKFLOW - Diátaxis Navigation

When navigating domain documentation, follow this exact sequence:

### Step 1: Start at HUB

Read `README.md` first - domain entry point.

### Step 2: Match Your Query Type

**Need to understand "WHY?" or "WHAT?" concept (business perspective)**
→ Read `overview.md`

**Need to solve "HOW TO..." problem (technical instructions)**
→ Read `technical.md`

**Need complete technical reference "WHAT IS IT?" (API, config, types)**
→ Read `reference.md`

**Need focused deep dive on ONE specific topic**
→ Read `tech-[name].md`

---

## 📋 DOCUMENTATION ARCHITECTURE

### File Structure

Each domain contains these files with defined roles:

- **README.md** — Hub and navigation entry point
- **overview.md** — Business WHY/WHAT (soft language)
- **technical.md** — Technical HOW (hard language, file paths, line numbers)
- **reference.md** — Complete technical reference (exhaustive)
- **tech-[name].md** — Focused deep dive on single topic (optional)

### Project Philosophy

**Template → Customization**: Developers get pre-configured template and customize it.

- Domain 1 = one-time setup
- Other domains = how to customize existing setup
- Recommend staying close to current proposal

---

## 📚 DETAILED RULES

For specific implementation rules, see:

- **Content Quality** — [Content-Quality-Rules.mdc](../../.cursor/rules/Content-Quality-Rules.mdc)
- **Domain Structure** — [domain-structure.mdc](../../.cursor/rules/domain-structure.mdc)
- **File-specific Rules** — [domain-readme.mdc](../../.cursor/rules/domain-readme.mdc), [domain-overview.mdc](../../.cursor/rules/domain-overview.mdc), [domain-technical.mdc](../../.cursor/rules/domain-technical.mdc), [domain-reference.mdc](../../.cursor/rules/domain-reference.mdc), [domain-tech-specific.mdc](../../.cursor/rules/domain-tech-specific.mdc)
- **Markers & Links** — [marker.mdc](../../.cursor/rules/marker.mdc)
- **Formatting** — [formatting.mdc](../../.cursor/rules/formatting.mdc)

---

## ✅ CRITICAL REMINDERS

1. **Single Source of Truth** — Never duplicate content, always link to canonical source
2. **Follow Markers** — Use `[!TIP]` markers for canonical definitions and implementations
3. **Follow Markers** Use `[!NOTE]` for Topic Occurrence
4. **Modular Files** — Create `tech-[name].md` for referenceable topics, not just technologies
5. **Language Style** — Match file type: soft for overview, hard/technical for technical files
