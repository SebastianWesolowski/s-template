---
description: Rules for using [!TIP] and [!NOTE] markers and Occurrences sections in domain documentation. Apply when creating, editing, or extracting content to files overview.md, technical.md, reference.md, tech-[name].md. Rules ensure Single Source of Truth (SSoT) and build the Knowledge Graph.
alwaysApply: false
---

# Rules for Using [!TIP] and [!NOTE] Markers

> [!WARNING] **CRITICAL RULES**
> These rules are absolutely mandatory. Violating them destroys the Knowledge Graph and leads to content duplication.

## 🔴 Core Rules – Single Source of Truth (SSoT)

### Rule 1: Markers depend on context, not file type

- **`> [!TIP] Topic Source`** = THE ONLY authoritative definition of a topic

  - Use ONCE per unique concept/topic
  - This is the topic's "home location" in the knowledge graph
  - Contains the canonical definition of "what it is" and "why it exists" for that concept
  - **CAN APPEAR IN ANY FILE TYPE**: `overview.md`, `technical.md`, `reference.md`, `tech-[name].md`
  - **Decision question**: "Is this the BEST place for the first definition of this topic?"

- **`> [!NOTE] Topic Occurrence`** = Reference to a topic defined elsewhere
  - Use MULTIPLE TIMES to refer to the `[!TIP]` source
  - Requires backlink to source: `> Source: [filename.md](filename.md)`
  - **CAN APPEAR IN ANY FILE TYPE**: `overview.md`, `technical.md`, `reference.md`, `tech-[name].md`
  - **Decision question**: "Are we describing a topic already defined elsewhere?"

### Rule 2: Never duplicate content

- If a topic exists elsewhere → LINK to it, DO NOT copy
- Each topic has ONE owner `[!TIP]`
- Each topic occurrence `[!NOTE]` with link to source
- Violating this rule destroys the Knowledge Graph

### Rule 3: Follow context, not file type

**INCORRECT thinking**: "overview.md always contains [!TIP], technical.md always contains [!NOTE]"

**CORRECT thinking**: "Where is the best place to define this topic? That place gets [!TIP]"

### Example Scenarios

**Scenario 1: Business concept → technical implementation**

```markdown
overview.md:

> [!TIP] Topic Source: Placeholder System
> (business WHY/WHAT)

technical.md:

> [!NOTE] Topic Occurrence: Placeholder System
> Source: [overview.md](overview.md)
> (technical HOW)
```

**Scenario 2: Deep technical concept as source**

```markdown
tech-error-handling.md:

> [!TIP] Topic Source: Error Handling Strategy
> (canonical definition)

technical.md:

> [!NOTE] Topic Occurrence: Error Handling Strategy
> Source: [tech-error-handling.md](tech-error-handling.md)
> (practical usage)

overview.md:

> [!NOTE] Topic Occurrence: Error Handling Strategy
> Source: [tech-error-handling.md](tech-error-handling.md)
> (business context)
```

**Scenario 3: Reference as API source**

```markdown
reference.md:

> [!TIP] Topic Source: Environment Variables API
> (complete API definition)

technical.md:

> [!NOTE] Topic Occurrence: Environment Variables API
> Source: [reference.md](reference.md)
> (how to use)
```

## 🔵 Decision Tree

### Placing [!TIP] marker

```text
START
  ↓
  Where is the BEST place to define this topic?
  ↓
  Business context (WHY/WHAT)?
  → overview.md with [!TIP]

  Technical depth?
  → tech-[name].md with [!TIP]

  Canonical API/configuration definition?
  → reference.md with [!TIP]

  Implementation instructions (without definition)?
  → technical.md with [!NOTE] + link to source
```

### Key Questions for Marker Selection

1. **Is this the FIRST and BEST place for defining this topic?**

   - ✅ YES → use `> [!TIP] Topic Source`
   - ❌ NO → use `> [!NOTE] Topic Occurrence` with link

2. **Is this the canonical/authoritative definition?**

   - ✅ YES → use `> [!TIP] Topic Source`
   - ❌ NO → use `> [!NOTE] Topic Occurrence` with link

3. **Are you explaining HOW to use something defined elsewhere?**
   - ✅ YES → use `> [!NOTE] Topic Occurrence` with link
   - ❌ NO → check if this should be `> [!TIP]`

**IMPORTANT:** Don't assume file type determines the marker. The marker is determined by context.

## 📋 Marker Formatting

### File-level marker (lines 3–5)

```markdown
> [!TIP] Topic Source
```

### Section-level marker

```markdown
> [!TIP] Topic Source: Topic Name

## Topic Name
```

### Combined markers (when combining two markers)

```markdown
> [!NOTE] Topic Occurrence
> Implementation guide
> Source: [overview.md](overview.md)
> See also: [reference.md](reference.md)
```

## ✅ Best Practices

### DO

- Link to source via `> [!NOTE]` with appropriate reference
- Extract and reference, don't duplicate
- Add "See also" to related content
- Keep source in one place, everything else is references

### DON'T

- Copy content between files
- Repeat the same examples in multiple places
- Define the same concept twice with `> [!TIP]` marker
- Assume file type determines the marker

## 🎯 Critical Reminders

1. **Markers are context-dependent, not file-type dependent**

   - `[!TIP]` and `[!NOTE]` can be in any file type
   - Decision factor: "Where is the BEST place to define this topic?"

2. **Single Source of Truth**
   - ONE `[!TIP]` per concept (regardless of file)
   - MULTIPLE `[!NOTE]` with link to source
   - Never duplicate, always link

## 📎 Occurrences Section

### Requirements

Every file (`overview.md`, `technical.md`, `reference.md`, `tech-*.md`) MUST end with a section:

```markdown
## Occurrences

- [technical.md](technical.md) — implementation details
- [../other-domain/](../other-domain/) — related context
```

### Section Purpose

The "Occurrences" section builds bidirectional links in the Knowledge Graph and helps navigate related content.

### What to Include

- **All internal references** within the domain (other files that reference or extend this topic)
- **Cross-domain references** if topics are closely related (e.g., styling → components)
- **Upstream dependencies** – when file depends on concepts from other domains
- **Downstream references** – when other domains depend on concepts from this file

### Link Categorization

```markdown
## Occurrences

### Within Domain

- [technical.md](technical.md) — implementation details
- [tech-eslint.md](tech-eslint.md) — ESLint deep dive

### Cross-Domain References

- [../architecture/](../architecture/) — component patterns used here
- [../styling/](../styling/) — styling integration details

### External Resources

- [Official ESLint Docs](https://eslint.org/docs) — complete rule reference
```

### Best Practices

- Add meaningful cross-domain links
- Link to external documentation only when necessary
- Keep list concise – optimally 3–8 entries
- Update this section with each new cross-reference

### Updating After Content Extraction

Before performing content extraction or major refactoring, create a brief checklist (3–7 items) of main steps and decisions to execute.
After moving content to a new file (e.g., `tech-[name].md`):

**YOU MUST update:**

1. **Occurrences section in both files** – add mutual links
2. **README.md** – add appropriate link
3. **Other domains referencing the topic** – update links if necessary

**After each content edit, verify that all required links in the Occurrences section are complete and correct; fix any inconsistencies before completing the task.**

**Example after extraction:**

```markdown
# technical.md (at the end)

## Occurrences

- [overview.md](overview.md) — business concept
- [tech-eslint.md](tech-eslint.md) — detailed ESLint guide

---

# tech-eslint.md (at the end)

## Occurrences

- [overview.md](overview.md) — ESLint concept
- [technical.md](technical.md) — basic guide
```

**IMPORTANT:** Without updating Occurrences, the Knowledge Graph will be broken!
