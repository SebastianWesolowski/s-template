---
globs: docs/domains/**/overview.md
alwaysApply: false
---

# The Role of overview.md in the Workflow

This file serves as a **concept explanation** within the Diátaxis framework:

- **Builds understanding**: Explains "WHY?" and "WHAT?"—what concepts does it introduce?
- **Starting point** for architectural decisions
- **Business concept**: Clarifies project and business value impact
- **Source in Knowledge Graph**: overview.md contains canonical topic definitions used by `[!TIP]` markers

### Focus Areas

- Concepts and philosophy
- Architectural decisions
- Project impact
- Background and business context

### Avoid

- Specific implementation steps (see: technical.md)
- Technical API details (see: reference.md)
- ✅ ALLOWED: Business sections such as "Business Value", "ROI", or "Benefits"

## Structure and Content

### Required Elements

1. **Header**: `# [Domain Name] Overview` must be the first line and formatted exactly
2. **Concept**: What is the domain responsible for? What philosophy does it introduce? Sometimes there may be multiple concepts, architectural decisions, or solutions.
3. **Problem**: What problem is being solved? What pain points led to this solution?
4. **Why?**: Explain the Problem → Solution → Business Value. Why was this introduced? What decisions led to creating this solution? How does it connect with others?
5. **Solution**: Describe how the solution addresses the problem and what exists now.
6. **Capabilities**: Indicate how the domain's concepts can be adapted.
7. **Occurrences**: At the end, include a section titled `## Occurrences` with links to relevant usage or references, e.g.: `- [Link description](url)`

**Note:** All five core content sections (Concept, Problem, Why?, Solution, Capabilities) must appear, in the listed order.

## Length and Depth

### Optimal Length

- **Short domains:** 50–100 lines (simple tools)
- **Complex domains:** 100–200 lines (architecture, processes)

### Depth Principles

- **Create architecture**, do not document every element
- **Use Mermaid diagrams** for complex concepts if useful (optional)
- **Connect concepts**, rather than detailing every aspect
- **Optional:** Link to technical.md for further implementation details

## Language and Tone

### Principle: Soft, Business-Friendly

The tone must be:

- Soft and business-focused
- Free of technical jargon
- Accessible to non-technical audiences
- Focused on benefits, not on implementation

**PERMISSIBLE EXAMPLES:**

- "Placeholder system allows easy branding customization."
- "Master template propagates changes to all projects."

**NOT PERMISSIBLE:**

- "Edit .eslintrc.js file at line 45" (for technical.md)
- "ANALYZE variable enables Next.js Bundle Analyzer" (too technical)

## Exception

`1-getting-started/overview.md` may contain additional instructional sections, specific to first steps.

## Output Format

The structure of `overview.md` must be as follows:

```
# [Domain Name] Overview

## Concept
[Concept explanation]

## Problem
[Describe problem and pain points]

## Why?
[Explain motivation, business value, and connecting rationale]

## Solution
[Describe how solution addresses the problem]

## Capabilities
[List or explain adaptability, future directions]

## Occurrences
- [Link description 1](url1)
- [Link description 2](url2)
```

Begin with a concise checklist (3-7 bullets) of what you will do; keep items conceptual, not implementation-level.

### Checklist for Validation

Before saving, confirm:

- The header is the exact format: `# [Domain Name] Overview` as the first line
- All five core content sections are present and in order: Concept, Problem, Why?, Solution, Capabilities
- Tone is soft, business-friendly, and void of technical jargon
- No technical details or implementation steps (these go into `technical.md`)
- Emphasis is on business benefits, not implementation
- A `## Occurrences` section at the end lists relevant links

After drafting or editing, validate that all output requirements are met in 1-2 lines. If any requirement is not satisfied, self-correct before proceeding.

### Error Handling

If any required section is missing, misordered, or formatted incorrectly, flag the document for revision before saving.
If technical language or implementation details are found, request clarification or correction.
If the header or `## Occurrences` section is absent, flag and halt saving until corrected.

### Optional Elements

- Mermaid diagrams for visualizing complex concepts (optional)
- Hyperlinks to `technical.md` for more technical detail (optional)
