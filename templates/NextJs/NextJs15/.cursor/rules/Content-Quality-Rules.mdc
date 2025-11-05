---
globs: docs/domains/**/README.md,docs/domains/**/overview.md,docs/domains/**/technical.md,docs/domains/**/reference.md,docs/domains/**/tech-*.md
alwaysApply: false
---

# Content Quality Rules

Content Quality Rules maintain consistency, accuracy, and the Single Source of Truth (SSoT) across domain documentation.

**Begin with a concise checklist (3–7 bullets) of what you will do; keep items conceptual, not implementation-level.**

## Content Quality Rules

1. **Describe only project-specific changes**

   - Document custom options and settings unique to THIS project.
   - Reference actual files (specify line numbers where relevant).

2. **Link to official documentation**

   - Provide a brief explanation of each tool referenced.
   - Link directly to official documentation for further details.
   - Avoid duplicating complete tool documentation.

3. **Use actual project code**

   - Include examples only from real project files.
   - Reference files precisely: `[filename.ext](../../../filename.ext)`
   - Cite relevant code lines - [eslint.config.mjs](../../../eslint.config.mjs) linie 147-166 - (see [formatting.mdc](../formatting.mdc) — Code References Format)
   - Display only the necessary code fragments.

4. **Avoid duplication**

   - If a topic exists elsewhere, link to it instead of repeating content.
   - The "Key Topics" section must reference ONLY topics specific to THIS domain.

5. **Language style by file type**
   - **overview.md**: Use a soft, business-friendly, accessible tone (e.g., "Placeholder system allows easy brand customization").
   - **technical.md**: Maintain a precise, technical style (e.g., "Configure custom ESLint rule in `.eslintrc.js` line 45").
   - **reference.md**: Be exhaustive, precise, and complete.
   - **tech-\*.md**: Match `technical.md` in style, with a focus on a single topic.

## technical.md Philosophy & Scope

**Project Model**: Pre-configured Template → Customization

The project offers a fully pre-configured Next.js template. Developers start with a working setup and tailor it as needed:

1. **Initial Setup** (`1-getting-started/technical.md`):

   - Perform a ONE-TIME basic installation.
   - Set up the project initially (cloning, installing dependencies, first run).

2. **Technical Guides** (all other domains):
   - Focus on reconfiguration, customization, and extension — not installation, which is only in domain 1.
   - Recommendations: Favor small changes and adhere closely to the current setup, making light, necessary adjustments.
   - Examples:
     - "How to install ESLint" — not necessary (already installed)
     - "How to add custom ESLint rules"
     - "How to modify existing Tailwind config"
     - "How to create custom environment variables"

**Key Principle:**

> Developers receive a **working, pre-configured template** with major decisions documented in `overview.md`.
> `technical.md` details **how to modify and adapt** the project, recommending minimal adjustments to suit specific needs.

**Content Focus:**

- Adding options/features to existing configs
- Creating custom configurations
- Modifying the existing setup
- Troubleshooting customizations
- Exploring adaptation options, with a preference for minimal change

## Content Extraction and Topic Flow

**When to extract content to tech-[name].md:**

1. **From `technical.md` to `tech-[name].md`:**

   - If the topic is self-contained and can be easily linked.
   - When the topic will be referenced from multiple locations.
   - To enhance comprehension through a smaller, focused file.
   - Judgement on readability is preferred over a strict "3+ subsections" rule.

2. **From `overview.md` to tech-[name].md:**
   - For technical concepts that deserve more depth than business context provides.
   - For complex, linkable technical concepts.

**Content flow:**

```
1. Define concept (WHAT/WHY — business) → overview.md
   ↓
2. Implement/Use concept (HOW — technical) → technical.md
   ↓
3. Deep dive specific topic (DEPTH — focused) → tech-[name].md (if needed)
   ↓
4. Reference all parts → reference.md
```

**How to extract content:**

1. **Before extraction:**

   - Identify the content to move.
   - Check for existing references.
   - Confirm extraction benefits comprehension.

2. **During extraction:**

   - Move in-depth content to `tech-[name].md`.
   - Leave a summary and link in `technical.md`.

3. **After extraction:**
   - Update the "Occurrences" section (see `.cursor/rules/marker.mdc` for guidelines).
   - Add a link in `README.md`.
   - Update any other referring domains.

**Example Extraction:**

BEFORE (`technical.md`):

```
## How to configure ESLint
- Rule configuration
- Plugin setup
- Custom rules
- AirBnB integration
- Next.js specific rules
```

AFTER Extraction:

`technical.md`:

> [!NOTE] Topic Occurrence: ESLint Configuration
> Detailed guide: [tech-eslint.md](tech-eslint.md)

## How to configure ESLint

(Summary + link to tech-eslint.md)

`tech-eslint.md`:

# Advanced ESLint Configuration

(all technical details)

**Avoiding Duplication:**

**DON'T**:

- Copy-paste content across files.
- Repeat examples multiple times.
- Duplicate canonical definitions.

**DO**:

- Link to source documents.
- Extract and reference — do not duplicate.
- Use "See also" links for related topics.
- Keep each source canonical; reference everywhere else.

**Set reasoning_effort = medium based on the task complexity; outputs should be precise and thorough where required, but concise otherwise.**
