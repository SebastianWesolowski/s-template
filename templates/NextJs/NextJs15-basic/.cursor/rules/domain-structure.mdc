---
globs: docs/domains/**
alwaysApply: false
---

# Domain Structure Rules

Each domain must contain the following files, each with a clearly defined role:

- **README.md**: Serves as the HUB and follows the Content Files Principle.
- **overview.md**: Explains business WHY/WHAT using clear, approachable language.
- **technical.md**: Provides a technical HOW guide, using detailed, precise language.
- **reference.md**: Acts as an exhaustive technical reference for WHAT.
- **tech-[name].md**: An optional modular deep dive on a single topic, to be created only when beneficial for comprehension and reference. Linkable across relevant documentation.

This file structure is based on the Diátaxis documentation architecture methodology.

Begin with a concise checklist (3-7 bullets) before implementing or updating a domain structure to ensure no required files or steps are omitted.

After any documentation update or structural change, briefly validate in 1-2 lines that all required files are present and correctly categorized; address discrepancies immediately if found.

## Educational Philosophy - Domain Numbering

Domains are organized to reflect educational progression through the project lifecycle.

### Phase 1: Setup & Configuration (1-4)

- `1-getting-started`: First steps
- `2-customization`: Personalization, placeholder system **[Process]**
- `3-environment`: Environment management (T3-env, variables) **[Tool]**
- `4-dependencies`: Dependency management (Renovate) **[Tool]**

### Phase 2: Development Process (5-8)

- `5-issue-tracking`: Task management (Linear, conventional commits) **[Tool]**
- `6-developer-experience`: DX philosophy HUB, tool ecosystem **[Process]**
- `7-architecture`: Design patterns (Next.js, component patterns) **[Tool]**
- `8-styling`: Styling system (Tailwind CSS, CVA, shadcn/ui) **[Tool]**

### Phase 3: Quality & Testing (9-10)

- `9-code-quality`: Code quality tools (ESLint, Prettier, TypeScript) **[Tool]**
- `10-testing`: Testing strategy (Jest, Playwright, Storybook) **[Tool]**

### Phase 4: Deployment & Production (11-13)

- `11-performance`: Optimization (Bundle analysis) **[Tool]**
- `12-deployment`: CI/CD (Pipelines, release management) **[Process]**
- `13-analytics`: Monitoring (Analytics tools) **[Tool]**

### Phase 5: Maintenance & Documentation (14-17)

- `14-workflow`: Git workflow (Branching strategy) **[Process]**
- `15-memory-bank`: AI documentation (Mode switching) **[Process]**
- `16-documentation`: Documentation standards (Documentation tools) **[Tool]**
- `17-maintenance`: Maintenance (Maintenance tools) **[Tool]**

## tech-[name].md Files (Optional)

**Purpose:** Provide a focused deep dive on ONE referenceable topic that may be linked from multiple places.

**Decision Tree:**

```
Can you extract a self-contained, linkable topic?
  ↓ YES
Will it be referenced from 2+ places?
  ↓ YES
→ Create tech-[name].md

  ↓ NO (at any stage)
→ Keep in technical.md
```

**Detailed criteria:**

- ✅ Create when: 3 or more subsections, 2 or more references, and includes config/setup/troubleshooting.
- ❌ Keep in technical.md when: The topic is only 1-2 paragraphs or referenced just once.

**Examples:** `tech-eslint.md`, `tech-placeholder-system.md`, `tech-git-workflow.md`
