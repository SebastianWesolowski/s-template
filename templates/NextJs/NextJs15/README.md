# {{PLACEHOLDER_REPO_NAME}}

<a href="https://github.com/SebastianWesolowski/starter-npm-package"><img align="left" width="440" height="180" alt="{{PLACEHOLDER_REPO_NAME}} package" src=".github/assets/heroImageReposytory-next.png"></a>

## Important Links

- [![npm package][npm-img]][npm-url]
- [![Build Status][build-img]][build-url]
- [![GitHub Contributors][github-contributors-badge]][github-contributors-badge-link]
- [Author page](https://{{PLACEHOLDER_PAGE_AUTHOR}})
- [📚 **Complete Documentation**](docs/INDEX.md) - Full project documentation index
- [🚀 **Getting Started**](docs/domains/1-getting-started/README.md) - Quick start guide
- [⚙️ **Developer Experience**](docs/domains/developer-experience/README.md) - DX tools and workflows
- [Git Hooks Documentation](.husky/README.md)

<br/><br/>

**Remove before final release**

- [Set up your repository](docs/domains/15-deployment/tech-github-actions-release.md#konfiguracja-tokenów)
- [Way to work](docs/domains/workflow/README.md)
- [Known issues](docs/knowProblems.md)

---

<br/>

{{A template for creating ...}}

### Integrated features

Production-ready Next.js template with everything you need:

#### 🚀 **Core Framework**

- **[Next.js 15](https://nextjs.org/)** - App Router, React 19, optimized for performance
- **[TypeScript 5.7](https://www.typescriptlang.org/)** - Strict mode with [`ts-reset`](https://github.com/total-typescript/ts-reset)

#### 🎨 **UI & Styling**

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[CVA](http://cva.style/)** - Class Variance Authority for component variants
- **[Radix UI](https://www.radix-ui.com/)** - Headless accessible components
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark/light mode support
- **Absolute imports** - Clean import paths with path aliases

#### 🧪 **Testing Suite**

- **[Jest](https://jestjs.io/)** + **[React Testing Library](https://testing-library.com/react)** - Unit & integration tests
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[Storybook](https://storybook.js.org/)** - Component development & testing
- **Smoke Testing** - Automated component validation

#### 🔧 **Code Quality**

- **[ESLint](https://eslint.org/)** - Dual config (standard/strict) for progressive quality
- **[Prettier](https://prettier.io/)** - Code formatting with import sorting
- **[Stylelint](https://stylelint.io/)** - CSS/SCSS linting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks with multi-stage validation

#### 🛠️ **Developer Tools**

- **[Coupling Graph](https://github.com/pahen/madge)** - Visualize module dependencies
- **[Knip](https://knip.dev/)** - Detect unused code and dependencies
- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Monitor bundle size
- **[ngrok](https://ngrok.com/)** - Local development with remote services
- **[T3 Env](https://env.t3.gg/)** - Type-safe environment variables
- **[s-update-manager](https://github.com/SebastianWesolowski/s-update-manager)** - Centralized dependency management
- **[s-customize](https://github.com/SebastianWesolowski/s-template/tools/customize)** - Template personalization

#### 🔄 **Workflow & Automation**

- **[Linear Integration](https://linear.app/)** - Automated issue tracking with GitHub
- **[Semantic Release](https://github.com/semantic-release/semantic-release)** - Automatic versioning & changelog
- **[Renovate Bot](https://www.whitesourcesoftware.com/free-developer-tools/renovate)** - Auto-updating dependencies
- **[Patch-package](https://www.npmjs.com/package/patch-package)** - Fix external dependencies

#### 📚 **Documentation & AI**

- **[Memory Bank System](memory-bank/README.md)** - AI-powered documentation for seamless development

#### 🚀 **Performance & Security**

- **Perfect Lighthouse score** - Optimized for Core Web Vitals
- **Security headers** - Pre-configured security policies
- **Health checks** - Kubernetes-compatible for robust deployments

## Table of Contents

- [Integrated features](#integrated-features)
- [Table of Contents](#table-of-contents)
- [Getting Started](#-getting-started)
- [Template Customization](#-template-customization)
- [Memory Bank System](#-memory-bank-system)
- [Linear Integration](#-linear-integration)
- [Developer Tools](#-developer-tools)
- [Architecture Patterns](#-architecture-patterns)
- [Quality Monitoring](#-quality-monitoring)
- [Deployment](#-deployment)
- [Scripts Overview](#-scripts-overview)
- [Coupling Graph](#-coupling-graph)
- [Testing](#-testing)
  - [Running Tests](#running-tests)
  - [Acceptance Tests](#acceptance-tests)
  - [Smoke Testing](#smoke-testing)
- [Styling and Design System](#-styling-and-design-system)
  - [CVA - A New Approach to Variants](#cva---a-new-approach-to-variants)
- [State Management](#-state-management)
  - [Zustand](#zustand)
  - [Jotai](#jotai)
  - [Recoil](#recoil)
- [Environment Variables handling](#-environment-variables-handling)
- [Documentation Index](#-documentation-index)
- [Contribution](#-contribution)
- [Support](#support)
- [License](#-license)
- [Contributors](#contributors)

## 🎯 Getting Started

> [!NOTE] Wystąpienie tematu
> To jest skrót lub odniesienie. Pełne Źródło: [`docs/domains/1-getting-started/overview.md`](docs/domains/1-getting-started/overview.md#project-overview)

Quick setup in 6 steps:

```bash
# 1. Install dependencies
yarn install

# 2. Update template
yarn s-update-manager

# 3. Configure customization
# Edit tools/customize/customize.config.ts
# See: docs/domains/customization/technical.md

# 4. Customize project
yarn customize

# 5. Start development
yarn dev

# 6. Open http://localhost:3000
```

**Important**: Configure `tools/customize/customize.config.ts` before running `yarn customize`

**Optional Setup:**

- [Ngrok Integration](./docs/domains/workflow/technical.md#ngrok-integration) - Expose local server to internet
- [Local Preview](./docs/domains/workflow/technical.md#local-preview) - Test production build locally

> **Detailed Guide**: See [Getting Started Technical Guide](docs/domains/1-getting-started/technical.md) for complete installation process

## 🎨 Template Customization

> [!NOTE] Wystąpienie tematu
> To jest skrót lub odniesienie. Pełne Źródło: [`docs/domains/customization/overview.md`](docs/domains/customization/overview.md#overview)

This template requires personalization before use. The `yarn customize` command automatically replaces placeholders with your project details:

- **Project Identity**: Repository name, GitHub user, author info
- **Technical Details**: Node version, current year, descriptions
- **URLs**: Repository URLs, author pages, documentation links
- **Validation**: Build-time verification of all placeholders
- **Cleanup**: Automatic removal of customization files after completion

> **Required**: Run `yarn customize` before first use - see [Template Customization Guide](docs/domains/customization/README.md)

## 🧠 Memory Bank System

AI-powered documentation system for seamless development continuity:

- **Core Files**: Project brief, system patterns, tech context, active context
- **AI Integration**: Cursor AI uses Memory Bank for project understanding
- **Documentation Strategy**: Memory Bank (AI-focused) + Docs (developer-focused)
- **Auto-updates**: Documentation evolves with project changes

> **Learn More**: [Memory Bank Documentation](docs/domains/memory-bank/README.md) | [Memory Bank Structure](memory-bank/README.md)

## 🔗 Linear Integration

Automated issue tracking and project management:

- **Auto-linking**: PRs automatically link with Linear issues
- **Status Automation**: PR states update Linear issue status
- **Commit Formatting**: Husky auto-adds issue references [SC-XXX]
- **Changelog Generation**: Semantic Release includes Linear issue links
- **Traceability**: Complete tracking from issue → commit → PR → changelog

> **Setup Guide**: [Linear + GitHub Workflow](docs/domains/issue-tracking/README.md)

## 🛠️ Developer Tools

Advanced development and code quality tools:

- **Coupling Graph**: Visualize module dependencies with [Madge](https://github.com/pahen/madge)
- **Unused Code Detection**: [Knip](https://knip.dev/) finds dead code and dependencies
- **Patch-Package**: Fix external dependencies without forking
- **Dual ESLint Config**: Standard (warnings) + Strict (errors) for progressive quality
- **Bundle Analysis**: Monitor bundle size with interactive reports

> **Tools Guide**: [Developer Experience](docs/domains/developer-experience/README.md) | [Code Quality](docs/domains/code-quality/README.md)
>
> [!NOTE] Wystąpienie tematu
> To jest skrót lub odniesienie. Pełne Źródło: [`docs/domains/developer-experience/overview.md`](docs/domains/developer-experience/overview.md#overview)

## 🏗️ Architecture Patterns

Proven design patterns and architectural decisions:

- **Component Structure**: Consistent folder organization with tests, stories, docs
- **CVA Variants**: Type-safe component variants with Class Variance Authority
- **Multi-Stage Git Hooks**: 4-hook system for quality enforcement
- **Configuration Management**: Centralized configs with T3 Env validation
- **Provider Pattern**: Theme management and context sharing

> **Architecture Guide**: [System Patterns](memory-bank/systemPatterns.md) | [Architecture Documentation](docs/domains/7-architecture/README.md)

## 📊 Quality Monitoring

Comprehensive quality assurance and monitoring:

- **Bundle Size Tracking**: CI fails on >10% increase
- **Security Headers**: Pre-configured security policies
- **Test Coverage**: Jest + Playwright + Storybook integration
- **Performance Monitoring**: Lighthouse scores and Core Web Vitals
- **Dependency Management**: Renovate Bot + s-update-manager

> **Quality Guide**: [Performance Optimization](docs/domains/performance/README.md) | [Security Guide](docs/domains/performance/tech-security.md)

## 🔗 Detailed Documentation

For detailed instructions and advanced options, please refer to [How to Work with Template](./docs/WayToWrok.md):

## 🚀 Deployment

Easily deploy your Next.js app with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js) by clicking the button below:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url={{PLACEHOLDER_REPO_URL}})

### GitFlow

- [Development Workflow](./docs/WayToWrok.md#-development-and-setup) - Complete setup instructions
- [Pre-release Process](./docs/WayToWrok.md#pre-release) - From feature and dev branches
- [Pre-production Setup](./docs/WayToWrok.md#pre-production) - Via pull requests to main
- [Release Workflow](./docs/WayToWrok.md#release) - Automated with GitHub Actions

## 📃 Scripts Overview

Essential commands organized by category:

### 🚀 **Development**

```bash
yarn dev              # Next.js dev server with Turbopack
yarn dev:storybook    # Dev server + Storybook (parallel)
yarn dev:tunnel       # Dev server + ngrok tunnel
yarn dev:build        # Production build + local preview
```

### 🏗️ **Building**

```bash
yarn build            # Standard build
yarn build:prod       # Full production build (4-stage)
yarn build:analyze    # Build with bundle analysis
```

### 🧪 **Testing**

```bash
yarn test             # All tests (unit, integration, e2e)
yarn test:unit        # Jest unit tests
yarn test:e2e         # Playwright E2E tests
yarn test:smoke       # Storybook smoke tests
```

### 🔍 **Code Quality**

```bash
yarn lint:check       # Standard linting (warnings)
yarn lint:fix         # Auto-fix issues
yarn lint:eslint:check:strict  # Strict linting (errors)
yarn quality:knip     # Find unused code
yarn quality:coverage # Test coverage report
```

### 📚 **Storybook**

```bash
yarn storybook        # Storybook server
yarn storybook:build  # Static Storybook build
```

### 🛠️ **Tools**

```bash
yarn customize        # Template personalization
yarn ngrok            # Expose local server
```

## 🔗 Coupling Graph

Visualize module dependencies and component relationships:

```bash
yarn quality:coupling:graph  # Alternative command
```

**Output**: `graph.svg` - Interactive visualization of module connections

![graph](.github/assets/couplingGraph-react.png)

> **Built with**: [Madge](https://github.com/pahen/madge) - Module dependency analysis

## 🧪 Testing

Comprehensive testing suite for reliable applications:

### **Test Types**

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright (headless + UI mode)
- **Component Tests**: Storybook with interaction testing
- **Smoke Tests**: Automated component validation

### **Running Tests**

```bash
yarn test             # All tests
yarn test:unit        # Unit tests only
yarn test:e2e         # E2E tests (headless)
yarn test:e2e:ui      # E2E tests (UI mode)
yarn test:smoke       # Smoke tests
```

### **Acceptance Testing**

Use Storybook's [`play` function](https://storybook.js.org/docs/react/writing-stories/play-function) for interaction testing:

```ts
export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText('email', { selector: 'input' });
    await userEvent.type(emailInput, 'example@email.com');
    // ... more interactions
  },
};
```

> **Note**: Write stories in JSX/TSX format only - MDX stories don't work well with smoke testing

![graph](.github/assets/runningTests.png)

## 🎨 Styling and Design System

Modern styling with Tailwind CSS and CVA for type-safe component variants:

### **Core Styling**

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[CVA](http://cva.style/)** - Class Variance Authority for component variants
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark/light mode support
- **Absolute imports** - Clean import paths

### **CVA - Type-Safe Variants**

CVA provides an easy, type-safe way to create component variants without compromising CSS flexibility:

```ts
const buttonVariants = cva(
  'base-classes', // Always applied
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

> **Learn More**: [Vercel's CVA Tutorial](https://www.youtube.com/watch?v=T-Zv73yZ_QI) | [Styling Guide](docs/styling-guide.md)

## 💾 State Management

Choose the state management solution that best fits your project:

### **Recommended Libraries**

#### **[Zustand](https://github.com/pmndrs/zustand)**

- Small, fast, and scalable
- Simple and intuitive API
- Optimized for bundle size
- Great for small to medium projects

#### **[Jotai](https://github.com/pmndrs/jotai)**

- Atom-based state management
- Minimal and straightforward API
- Granular state management
- Highly optimized for bundle size

#### **[Recoil](https://recoiljs.org/)**

- Facebook-developed for React
- Atoms and selectors pattern
- Efficient derived state management
- Built-in debugging tools

> **Note**: No state management library is included by default - choose based on your project needs

## 💻 Environment Variables

Type-safe environment variable management with [T3 Env](https://env.t3.gg/):

### **Features**

- **Build-time validation** - Catch errors before deployment
- **Type safety** - TypeScript integration with Zod schemas
- **Client/Server separation** - Clear distinction between environments
- **Runtime validation** - Ensure correct variable types

### **Configuration**

Define variables in `env.mjs`:

```ts
export const env = createEnv({
  server: {
    SECRET_KEY: z.string(),
  },
  client: {
    API_URL: z.string().url(),
  },
  runtimeEnv: {
    SECRET_KEY: process.env.SECRET_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
```

### **Usage**

```ts
import { env } from '@/env.mjs';
// Type-safe access to environment variables
const apiUrl = env.API_URL;
```

> **Error Handling**: Missing variables show clear error messages at build time

## 📚 Documentation Index

Complete project documentation organized by domain:

### Core Documentation

- **[Complete Documentation Index](docs/INDEX.md)** - Full project documentation navigation
- **[Memory Bank System](memory-bank/README.md)** - AI-focused documentation structure
- **[Getting Started Guide](docs/domains/1-getting-started/README.md)** - Extended setup instructions

### Development & Architecture

- **[Developer Experience](docs/domains/developer-experience/README.md)** - Tools, workflows, and DX optimization
- **[Architecture Guide](docs/domains/7-architecture/README.md)** - System patterns and design decisions
- **[Component Development](docs/domains/7-architecture/technical.md)** - Component structure and patterns
- **[Code Quality](docs/domains/code-quality/README.md)** - Linting, formatting, and quality enforcement

### Configuration & Environment

- **[Environment Configuration](docs/domains/3-environment/README.md)** - T3 Env setup and management
- **[Configuration Guide](docs/domains/3-environment/technical.md)** - Config patterns and best practices
- **[Dependency Management](docs/domains/4-dependencies/README.md)** - s-update-manager, Renovate, patches

### Testing & Quality

- **[Testing Guide](docs/domains/testing/README.md)** - Jest, Playwright, Storybook testing strategies
- **[Performance Optimization](docs/domains/performance/README.md)** - Bundle analysis and optimization
- **[Security Guide](docs/domains/performance/tech-security.md)** - Security headers and best practices

### Workflow & Deployment

- **[Linear + GitHub Workflow](docs/domains/issue-tracking/README.md)** - Issue tracking integration
- **[Deployment Guide](docs/domains/15-deployment/README.md)** - CI/CD and deployment strategies
- **[Maintenance Guide](docs/domains/16-maintenance/README.md)** - Long-term project maintenance

### Styling & UI

- **[Styling Guide](docs/domains/styling/README.md)** - Tailwind CSS, CVA, and design system
- **[Template Customization](docs/domains/customization/README.md)** - Project personalization

## Badges

[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]
[![GitHub License][github-license-badge]][github-license-badge-link]

[build-img]: https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/{{PLACEHOLDER_REPO_NAME}}
[downloads-url]: https://www.npmtrends.com/{{PLACEHOLDER_REPO_NAME}}
[npm-img]: https://img.shields.io/npm/v/{{PLACEHOLDER_REPO_NAME}}
[npm-url]: https://www.npmjs.com/package/{{PLACEHOLDER_REPO_NAME}}
[issues-img]: https://img.shields.io/github/issues/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}
[issues-url]: https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}/issues
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
[github-license-badge]: https://img.shields.io/github/license/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}
[github-license-badge-link]: https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}/blob/main/LICENSE
[github-contributors-badge]: https://img.shields.io/github/contributors/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}
[github-contributors-badge]: https://img.shields.io/github/contributors/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}
[github-contributors-badge-link]: https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_REPO_NAME}}/graphs/contributors
