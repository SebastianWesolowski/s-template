---
globs: docs/domains/**/README.md
alwaysApply: false
---

# Role in Workflow

README.md serves as the **starting point** (Quick Start) in the documentation process:

- **Entry point** for AI/Developers browsing the domain
- **Navigation** to the appropriate documentation type
- **Quick start** without overwhelming with details
- **HUB** connecting all domain files

### In Diátaxis Navigation

README.md is the **first step** in the documentation navigation process:

```
STEP 1: Start at HUB
  → Read README.md (this file)
STEP 2: Match query type
  → overview.md (WHY/WHAT?)
  → technical.md (HOW TO?)
  → reference.md (WHAT IS IT?)
  → tech-[name].md (ONE topic)
```

## Length and Structure file

- **Maximum 5-20 lines** of main content

1. **Header with number and domain name** - `# [Number]. [Domain Name]` (e.g., `# 10. Testing`)
2. **Short description**: `**Description:**` - domain function in one sentence and embedding in the overall concept
3. **Quick Start** - domain-specific steps (if needed)
4. **Key Topics** - ONLY topics from THIS domain (section "🎯 Key Topics")
5. **Links** - to domain files (overview.md, technical.md, reference.md)

### Key Topics Section

```markdown
🎯 Key Topics

- [overview.md](overview.md) — business concept
- [technical.md](technical.md) — implementation guide
```

**IMPORTANT**:

- Only topics from THIS domain
- Do not add links to other domains
- Links to domain files (overview.md, technical.md, reference.md, tech-\*.md)

## SSoT Markers

README.md does **NOT contain** `[!TIP]` or `[!NOTE]` markers. It is a neutral HUB for navigation and quick domain overview.

## Example Structure

```markdown
# 6. Developer Experience

**Opis:** Łączy wszystkie narzędzia odciążające developera w spójny ekosystem. NIE jest właścicielem szczegółów narzędzi - linkuje do właścicieli w innych domenach.

## Quick Start

1. **Przeczytaj [overview.md](overview.md)** - zrozum filozofię Zero Friction Development
2. **Sprawdź [technical.md](technical.md)** - poznaj ekosystem DX i workflow integration
3. **Uruchom [yarn customize](tech-customize.md)** - personalizacja szablonu
4. **Skonfiguruj [ngrok](tech-ngrok.md)** - external testing i webhook testing
5. **Użyj narzędzi analizy** - knip, madge, bundle analyzer

## 🎯 Key Topics

### Filozofia i Ekosystem

- [Filozofia DX](overview.md) - zero friction development, automatyzacja
- [Workflow Integration](technical.md) - Husky, commitlint, semantic release

### Narzędzia DX (właściciel: ta domena)

- [Template Customization](tech-customize.md) - yarn customize, placeholder system
- [ngrok](tech-ngrok.md) - external testing, webhook testing, mobile testing
- [Cross-Platform Scripts](tech-cross-env.md) - cross-env dla spójnych scripts
- [Madge](tech-madge.md) - coupling analysis, dependency graphs

### Narzędzia Code Quality (właściciel: code-quality)

- [ESLint, Prettier, Husky](../code-quality/) - automated quality gates
- [Knip](../code-quality/tech-knip.md) - unused code detection
- [TypeScript](../code-quality/tech-typescript.md) - strict type checking

### Narzędzia Performance (właściciel: performance)

- [Bundle Analyzer](../performance/tech-bundle-analyzer.md) - bundle optimization

### Workflow Automation (właściciel: inne domeny)

- [Git Workflow](../14-workflow/) - branching strategy, code review
- [Issue Tracking](../5-issue-tracking/) - Linear integration, conventional commits
- [Deployment](../deployment/) - CI/CD, semantic release, changelog
- [Dependencies](../4-dependencies/) - s-update-manager, Renovate, patch-package

### Testing Infrastructure (właściciel: testing)

- [Storybook](../testing/tech-storybook.md) - component development
- [Jest](../testing/tech-jest.md) - unit testing
- [Playwright](../testing/tech-playwright.md) - E2E testing
```

## Pre-Save Checklist

Verify each point:

- [ ] Header: `# [Number]. [Domain Name]`
- [ ] Description: 1-2 line
- [ ] Maximum 20 lines of main content
- [ ] "🎯 Key Topics" section exists
- [ ] Only topics from THIS domain
- [ ] Links to domain files (overview, technical, reference)
- [ ] No SSoT markers
