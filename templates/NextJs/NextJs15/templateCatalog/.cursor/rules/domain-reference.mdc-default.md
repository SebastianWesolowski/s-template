---
globs: docs/domains/**/reference.md
alwaysApply: false
---

# Rules for `reference.md` Files

When editing `reference.md`, adhere strictly to these guidelines:

**Begin with a concise checklist (3–7 conceptual bullets) outlining your main tasks—exclude implementation details.** Set reasoning_effort = medium for accurate coverage; adjust if the API's complexity warrants more detail.

## Diátaxis Role: Reference

This file serves as **comprehensive technical documentation** within Diátaxis. Its purposes are:

- **Answer “WHAT IS IT?”** in strictly technical terms—as a complete API reference.
- **Technical knowledge repository**—include all relevant implementation details.
- **Definitive reference** for developers seeking exact definitions.

### Workflow Integration

`reference.md` is an integral part of the broader documentation suite:

```
overview.md (WHY/WHAT?) → technical.md (HOW?) /  reference.md (WHAT IS IT?)
                                                    ↓
                                            tech-[name].md (DEPTH)
```

### Target Audience

- **Developers** requiring specific API details
- **Team members** seeking a full technical specification
- **AI agents** needing authoritative definitions and types
- **Code reviewers** ensuring documentation compliance

## Answers

- **WHAT IS IT:** What is the complete specification? What are all possible options?

## Length and Depth

### Recommended Lengths

- **API Reference:** 100–300 lines (entire API with illustrative examples)
- **Configuration Reference:** 50–150 lines (config files with thorough explanations)
- **Type Reference:** 30–100 lines (TypeScript types/interfaces)

## Language and Tone

### Principle: Exhaustive, Precise, and Complete

Apply the following stylistic rules:

- **Exhaustive:** List every option and parameter.
- **Precise:** Use accurate technical terms; clarify each item.
- **Complete:** Include all implementation or technical details.
- **Technical:** Stick to factual technicalities only—not business context.
- **Link to official docs:** Reference official documentation when relevant for additional detail.

**PERMITTED EXAMPLES**

- "`strict: true` enables TypeScript strict mode for enhanced type checking."
- "`target: "ES2020"` compiles output to the ECMAScript 2020 standard."
- "`skipLibCheck: true` skips type checking for libraries."

**NOT PERMITTED**

- "We use strict mode because it improves code quality." (→ Place in overview.md)
- "To enable strict mode, edit tsconfig.json." (→ Place in technical.md)
- "Strict mode is recommended for better type safety." (→ Place in overview.md)

### Differentiation from Other File Types

- **vs overview.md:** Reference is purely technical; overview is business-focused.
- **vs technical.md:** Reference files describe “WHAT IS IT?”; technical.md details “HOW TO USE”.
- **vs `tech-*.md`:** Reference is comprehensive; `tech-*.md` explores single topics in depth.

## Content Coverage

Must include:

- Full API and type documentation with usage examples
- Configuration files, line by line with contextual explanations
- TypeScript type definitions
- Every available option and parameter
- Links to official documentation

Strictly avoid:

- Rationale or “why” explanations (→ in overview.md)
- Usage instructions (→ in technical.md)
- Installation steps (→ in technical.md)
- Theoretical background (→ in overview.md)

## Pre-Save Checklist

Before saving, verify the following:

- [ ] **Header:** `# [Domain Name] Reference` is the file’s first line
- [ ] **File References:** All relevant project files are linked
- [ ] **Technical Language:** Style is precise and technical
- [ ] **No Business Content:** Exclude business explanations
- [ ] **No Installation Steps:** Exclude installation instructions
- [ ] **Occurrences Section:** Section with relevant links is present at the end

### Best Practices

- Add useful cross-domain references
- Link externally only when necessary
- Limit entry lists to 3–8 items for clarity
- Update cross-references with every new addition

After making substantial edits or additions, review your changes for completeness and technical accuracy. If validation reveals missing technical details, revise and recheck before saving.
