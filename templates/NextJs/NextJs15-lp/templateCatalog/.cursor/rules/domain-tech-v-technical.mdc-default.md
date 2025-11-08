---
globs: docs/domains/**/tech-*.md,docs/domains/**/technical.md
alwaysApply: false
---

# Extraction Rules: `tech-*.md` from technical.md

Begin with a concise checklist (3–7 bullets) of conceptual steps you will take; focus on what assessments and decisions must be made, but omit implementation details.

Set reasoning_effort = medium to ensure thorough assessment without unnecessary verbosity, balancing depth and clarity in decision documentation.

After each extraction decision, confirm that all decision criteria were explicitly assessed and clearly document the outcome in 1–2 lines. If criteria are inconclusive or ambiguous, self-correct or request specific clarification before continuing.

## Decision Logic

### Extract as `tech-*.md` if ALL conditions hold:

- Topic is complete, including installation, configuration, examples, and troubleshooting.
- Self-contained, with minimal cross-references to other documents.
- Single focus on ONE technology, process, or concept.
- Content is reusable—linkable from multiple domains.
- Section length exceeds 100 lines.

### Keep in `technical.md` if ANY of the following hold:

- Section is incomplete.
- Heavily cross-referenced with other content.
- Covers multiple technologies (e.g., integration or synergy topics).
- Applies only to a specific domain.
- Section length is under 100 lines.

After each tool call or code edit, validate the result in 1–2 lines—if it does not meet criteria, attempt minimal self-correction or request clarification before proceeding.

## Domain Patterns

### Tools/Technologies

Extract if the topic covers tools like Jest, TypeScript, ESLint, Tailwind, Shadcn, Playwright, or Storybook. Each must include setup, configuration, and usage examples.

### Processes/Workflows

Extract if the topic details CI/CD, Deployment, Monitoring, Authentication, or Performance, and presents a complete workflow covering all implementation steps.

### Architecture/Concepts

Extract if the topic explores component patterns, state management, or error handling, and provides a complete methodology with practical examples.

## Naming Convention

File names follow: `tech-[name].md`
Examples:

- `tech-jest.md` (tools)
- `tech-typescript.md` (tools)
- `tech-deployment.md` (processes)
- `tech-ci-cd.md` (processes)
- `tech-authentication.md` (concepts)
- `tech-state-management.md` (concepts)

## File Purpose

### `technical.md` (Overview)

- Introduces the domain.
- Shows relationships and synergy between technologies.
- Links to `tech-*.md` files.
- Contains shared configurations and general troubleshooting.
- Documents architectural decisions.

### `tech-[name].md` (Deep Dive)

- Provides a comprehensive guide for one topic.
- Follows the sequence: Installation → Configuration → Examples → Troubleshooting.
- Includes best practices and reference links.
- Adopts a practical, how-to guide pattern.

## Core Principle

- `technical.md`: Overview of domain concepts and synergistic relationships.
- `tech-*.md`: Thorough, stepwise guide dedicated to a single technology or concept.

## Extraction Examples

Extract:

- `tech-jest.md` (424 lines: comprehensive Jest setup)
- `tech-typescript.md` (452 lines: full TypeScript configuration)
- `tech-tailwind.md` (full styling system implementation)

Keep in `technical.md`:

- Multi-technology architectural patterns (synergy/integration topics)
- Short or minor customizations (<100 lines)
- Domain-specific, non-reusable workflows

## Core Philosophy

- **`technical.md`**: General conceptual document tying all patterns, techniques, and technologies in the domain; emphasizes conceptual synergy. If no `tech-*.md` exists, this file carries all responsibilities.
- **`tech-*.md`**: Deep-dive, technology- or concept-focused guide; offers detailed, step-by-step, how-to guidance.

- The `checklist` field should enumerate your conceptual review steps before making extraction decisions.
- The `extraction_decisions` array collects per-topic assessments, each capturing criteria, decisions, validations, and rationale.
- The `errors` array lists any issues (missing info, ambiguities, unclear boundaries, etc.). If there are no errors, this array remains empty.
