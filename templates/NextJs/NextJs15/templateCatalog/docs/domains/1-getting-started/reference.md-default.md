# Getting Started Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Prerequisites API

### Node.js Requirements

| Wersja | Status          | Zalecenia                |
| ------ | --------------- | ------------------------ |
| 18.17+ | Minimum         | Wymagana dla Next.js 15  |
| 20.x   | Zalecana        | LTS, najlepsza wydajność |
| 22.x   | Eksperymentalna | Najnowsze features       |

### Package Managers

| Manager | Wersja | Zalecenia         |
| ------- | ------ | ----------------- |
| yarn    | 1.22+  | Zalecany, szybszy |
| npm     | 9.x+   | Alternatywa       |
| pnpm    | 8.x+   | Eksperymentalny   |

### IDE Requirements

| IDE      | Rozszerzenia | Konfiguracja        |
| -------- | ------------ | ------------------- |
| Cursor   | AI Assistant | Zalecane            |
| VS Code  | Auto-install | `yarn setup:vscode` |
| WebStorm | TypeScript   | Manual setup        |

## Installation Commands

### Basic Setup

```bash
# Clone repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
yarn install

# Update dependencies
yarn s-update-manager

# Customize template
yarn customize
```

### Development Commands

```bash
# Development server
yarn dev                 # http://localhost:3000
yarn dev:tunnel         # ngrok tunnel

# Component development
yarn storybook          # http://localhost:6006

# Testing
yarn test               # Unit tests
yarn test:watch         # Watch mode
yarn test:e2e           # E2E tests
yarn test:coverage      # Coverage report

# Code quality
yarn lint               # ESLint
yarn lint:fix           # Auto-fix
yarn type-check         # TypeScript
yarn format             # Prettier

# Analysis
yarn analyze            # Bundle analysis
yarn knip               # Unused code
yarn madge              # Circular deps
```

### Build Commands

```bash
# Production build
yarn build              # Next.js build
yarn build:storybook    # Storybook build

# Deployment
yarn start              # Production server
yarn export             # Static export
```

## Configuration Files

### Core Configuration

| Plik                   | Opis                  | Wymagany |
| ---------------------- | --------------------- | -------- |
| `package.json`         | Dependencies, scripts | ✅       |
| `next.config.ts`       | Next.js configuration | ✅       |
| `tsconfig.json`        | TypeScript config     | ✅       |
| `tailwind.config.ts`   | Tailwind CSS          | ✅       |
| `jest.config.js`       | Jest testing          | ✅       |
| `playwright.config.ts` | E2E testing           | ✅       |

### Environment Files

| Plik              | Opis               | Wymagany |
| ----------------- | ------------------ | -------- |
| `.env.example`    | Template variables | ✅       |
| `.env.local`      | Local development  | ❌       |
| `.env.production` | Production         | ❌       |

### Customization Files

| Plik                                          | Opis                 | Wymagany |
| --------------------------------------------- | -------------------- | -------- |
| `tools/customize/customize.config.ts`         | Customization config | ✅       |
| `tools/customize/customize.example.config.ts` | Example config       | ❌       |

## Project Structure API

### Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── api/            # API routes
├── components/          # Feature components
│   ├── Button/         # Component with docs
│   └── index.ts        # Exports
├── ui/                 # UI primitives
│   ├── button.tsx      # shadcn/ui components
│   └── button.stories.tsx
├── configs/            # Configuration
│   ├── config.tsx      # App config
│   └── configAnalytics.ts
├── utils/              # Utilities
│   ├── utils.ts        # Helper functions
│   └── formatPrice/    # Feature utils
├── styles/             # Global styles
│   ├── global.scss     # Global CSS
│   └── tailwind.css    # Tailwind imports
└── assets/             # Static assets
    ├── favicon/        # Favicons
    ├── image/          # Images
    └── svg/             # SVG icons
```

### Component Structure

```
ComponentName/
├── ComponentName.tsx   # Main component
├── ComponentName.stories.tsx  # Storybook
├── ComponentName.test.tsx       # Tests
├── ComponentName.md             # Documentation
├── index.ts                     # Exports
└── types.ts                     # Types (optional)
```

## Environment Variables

### Development Variables

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_APP_DESCRIPTION=My App Description

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXXXXX
NEXT_PUBLIC_UMAMI_URL=https://analytics.example.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Development tools (optional)
NGROK_AUTH_TOKEN=your-ngrok-token
```

### Production Variables

```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://myapp.com
NEXT_PUBLIC_APP_NAME=My Production App
NEXT_PUBLIC_APP_DESCRIPTION=Production App Description

# Analytics
NEXT_PUBLIC_GA_ID=G-PRODUCTION-ID
NEXT_PUBLIC_HOTJAR_ID=PRODUCTION-ID
NEXT_PUBLIC_UMAMI_URL=https://analytics.myapp.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=production-website-id
```

## Port Configuration

| Port | Service      | Command                |
| ---- | ------------ | ---------------------- |
| 3000 | Next.js dev  | `yarn dev`             |
| 6006 | Storybook    | `yarn storybook`       |
| 3001 | Next.js alt  | `yarn dev --port 3001` |
| 8080 | ngrok tunnel | `yarn dev:tunnel`      |

## Troubleshooting Commands

### Port Issues

```bash
# Check port usage
lsof -i :3000
lsof -i :6006

# Kill process
kill -9 <PID>

# Alternative ports
yarn dev --port 3001
yarn storybook --port 6007
```

### Cache Issues

```bash
# Clear Next.js cache
rm -rf .next
yarn dev

# Clear node_modules
rm -rf node_modules yarn.lock
yarn install

# Clear TypeScript cache
rm -rf .tsbuildinfo
yarn type-check
```

### Build Issues

```bash
# TypeScript errors
yarn tsc --noEmit

# ESLint errors
yarn lint

# Build verification
yarn build
yarn start
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia projektu
- [`technical.md`](technical.md) — szczegółowy przewodnik instalacji
- [`../2-customization/reference.md`](../2-customization/reference.md) — customization API
- [`../2-developer-experience/`](../2-developer-experience/) — narzędzia deweloperskie
- [`../7-architecture/`](../7-architecture/) — architektura projektu
- [`package.json`](../../../package.json) — dependencies i skrypty
- [`../../INDEX.md#1-zapoznanie-z-szablonem`](../../INDEX.md#1-zapoznanie-z-szablonem) — centralna nawigacja
