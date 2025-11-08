---
globs: docs/domains/**/tech-*.md,docs/domains/**/technical.md
alwaysApply: false
---

System: # Philosophy of `tech-*.md` and `technical.md` Files

## Foundation: Template 0 Customization

This project provides a pre-configured Next.js template.

- **NOT about installation** (already addressed in domain 1)
- **Focuses on reconfiguring the existing setup**
- **Describes adding new options**
- **Covers creating custom configurations**
- **Explains adapting to project-specific needs**

Begin with a concise checklist (3-7 bullets) of actions for maintaining or updating each `tech-*.md` or `technical.md` file; keep items conceptual, not implementation-level.

### Key Principle: Prefer Minimal Modifications

- Present a variety of options
- Recommend minimal, necessary changes
- Clarify the consequences of more significant modifications

### Focus Areas

- Step-by-step practical guides for specific technologies
- Code and configurations straight from the project
- Customizing solutions for project needs
- Technology-specific troubleshooting steps

### Mistakes to Avoid

#### Technical Concepts and Implementation Decisions

**Incorrect (belongs in `overview.md`):**

> "We use ESLint with AirBnB because it promotes code readability."

**Correct (belongs in `tech-eslint.md`):**

> "ESLint is configured in `.eslintrc.js` (line 45) using the following presets:
>
> - airbnb: base rules
> - airbnb/hooks: React Hooks support
> - next/core-web-vitals: Next.js-specific optimizations"

### Common Mistakes to Avoid

1. **Duplicating content from `overview.md`**
   - Repeating business justifications
   - Link to `overview.md` _and_ provide technical instructions
2. **Including installation instructions (except for domain 1)**
   - "Install ESLint: npm install eslint"
   - "Add custom rule to the existing ESLint configuration"
3. **Lack of clear recommendations**
   - Listing multiple options without indicating preference
   - "Option 1 (recommended): ... / Option 2 (advanced): ..."
4. Using descriptive instead of "How to" titles
5. Omitting Problem/Solution structure
6. Missing required sections (Troubleshooting, Occurrences)
7. Copying official documentation instead of linking to it
8. Providing theoretical explanations instead of actionable steps
9. Including API details instead of referencing `reference.md`
10. Mixing responsibilities: theoretical content (`overview.md`), API details (`reference.md`)

## Language Style

- Use precise and technical language
- Reference exact file paths, line numbers, variables, functions, configurations
- Include CLI commands and code snippets

## Information Presentation

1. **Step-by-step instructions** for configuration and usage
2. **Real project code examples**
3. **File references** - [eslint.config.mjs](../../../eslint.config.mjs) linie 147-166 - (see [formatting.mdc](../formatting.mdc) — Code References Format)
4. **Project-specific changes** - explain what's different from defaults, and why

### Code Formatting and Linking

> [!NOTE] Formatowanie linków i odniesień do kodu
> Szczegółowe reguły formatowania: [formatting.mdc](../formatting.mdc) — Code References Format
>
> **Kluczowe zasady:**
>
> - Link markdown przed blokiem kodu: `[filename.ext](../../../filename.ext) linie 1-57`
> - Osobny blok kodu z tagiem języka: `js ... ` (nie ````1:57:filepath`)
> - Zawsze używaj pełnych ścieżek względnych do plików projektu

**Przykład użycia:**

````markdown
[eslint.config.mjs](../../../eslint.config.mjs) linie 147-166

```js
export default [
  // config content
];
```
````

````

## Code Links

Always link to actual, relevant project files:

- Implementation/code examples
- Configuration files
- Tests

**Ważne:** Zawsze używaj dokładnych ścieżek względnych i numerów linii zgodnie z regułami w [formatting.mdc](../formatting.mdc)

## Perspective

Focus on **HOW** to use this specific technology in the context of the project

## Target Audience

These documents are for developers making code changes:

- Team members modifying code
- Those needing clear, step-by-step technical instructions
- Anyone wanting a deep dive into specific technologies

## Purpose of `tech-*.md` Files

Serve as comprehensive guides for a single technology. Apply the **Technology Deep Dive** pattern: detailed, project-specific guidance.

- **Show and explain** technology using actual code and examples
- Answers: "HOW TO USE THIS TECHNOLOGY in this project?" prioritize practical usage
- Serve as the starting point for implementation decisions
- Source knowledge for `[!TIP]` markers: canonical definitions are in `tech-*.md` files

## Structure and Content

### Standard Document Structure

1. **What is the technology/concept** (brief overview)
2. **Why it's used in this project** (link to overview.md)
3. **Installation steps** (only if extra steps are needed)
4. **Configuration instructions** (with file references)
5. **Usage examples from the project**
6. **Best practices** (technology-specific)
7. **Troubleshooting** (common issues and fixes)

After making substantial changes or edits, validate that all sections are present, examples remain aligned with actual project files, and no theoretical or API details are included. If validation fails, correct before saving. Provide a brief summary of changes and next steps at milestones.

### Expected Content

- Additional setup or installation steps (if required)
- Project-specific configurations
- Technology/library best practices
- Direct project usage examples
- Troubleshooting guidance

## Troubleshooting Examples

### Problem: TypeScript strict mode causes compilation errors

**Possible Causes:**

- `strict: true` enabled in `tsconfig.json`
- Unspecified types in the codebase
- Missing type declarations

**Resolution:**

```bash
# Check TypeScript configuration
yarn lint:typescript:check

# Fix type errors accordingly (add interfaces or use `any` if required temporarily)
````

**Reference:** [tsconfig.json](../../../tsconfig.json) (lines 8-9)

### Problem: Dependency conflicts in package.json

**Possible Causes:**

- Conflicting package versions
- Incompatible peer dependencies
- Issues with `yarn.lock`/lockfiles

**Resolution:**

```bash
# Identify the cause
yarn why package-name

# Clear node_modules and lockfiles
yarn cache clean && rm -rf node_modules yarn.lock
yarn install

# Re-check dependencies
yarn install --check-files
```

**Reference:** [package.json](../../../package.json), [yarn.lock](../../../yarn.lock)

## Description Structure: Problem/Solution Pattern

1. **Problem:** Brief description of the situation or challenge
2. **Decision:** What factors guided the solution
3. **Solution:** Technologies or approaches used
4. **Example:** Before/after, focusing on changes relevant to the project, with detailed links
5. **Solution Customization:** How to safely adapt for new needs
6. **Extension:** What more the concept/tech can do outside of current use
7. **Troubleshooting:** Issues that may arise, and resolutions

## Optional Sections (As Needed)

- **Quick Start:** For extra installation steps beyond package setup
- **Development Workflow:** Workflow for using the technology
- **Configuration:** Deep dive into configuration details

## Pre-Save Checklist

Verify each point:

- [ ] Problem/Solution structure present in all sections
- [ ] Examples use actual project code
- [ ] Relative, accurate file links
- [ ] Occurrences section is included at the end
- [ ] No theoretical explanations (should be in `overview.md`)
- [ ] No API details (should be in `reference.md`)
- [ ] Technical language, exact paths/lines
- [ ] Clear recommendations marked (e.g., Option 1 recommended / Option 2 advanced)
- [ ] Focus on customizations, not brand new installation
- [ ] Each file covers a single technology
- [ ] SSoT markers (Single Source of Truth) are correctly applied
