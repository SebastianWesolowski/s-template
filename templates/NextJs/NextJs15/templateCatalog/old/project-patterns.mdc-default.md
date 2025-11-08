---
description: Project-specific patterns and conventions for Next.js template
globs:
alwaysApply: true
---

# Project Patterns - Next.js Template

## Component Structure Pattern

### Folder Structure

```
src/components/ComponentName/
├── ComponentName.tsx          # Main component
├── index.ts                   # Named exports
├── README.md                  # Component documentation
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit/integration tests
└── __snapshots__/             # Snapshot test files
```

### Component File Pattern

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import { type PropsWithChildren } from 'react';

const componentVariants = cva(
  "base-classes", // Base classes
  {
    variants: {
      variant: {
        primary: "primary-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        md: "medium-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ComponentProps
  extends PropsWithChildren,
          VariantProps<typeof componentVariants> {
  className?: string;
}

export function Component({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps) {
  return (
    <element
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </element>
  );
}
```

## Import/Export Patterns

### Absolute Imports

```typescript
// ✅ Correct
import { Component } from '@components/Component';
import { config } from '@configs';
import { cn } from '@/utils/utils';

// ❌ Avoid
import { Component } from '../../../components/Component';
```

### Export Pattern

```typescript
// index.ts
export { Component } from './Component';
export type { ComponentProps } from './Component';
```

## TypeScript Patterns

### Interface Naming

```typescript
// Component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// Configuration interfaces
export interface IAppConfig {
  url: string;
  seo: ISEOConfig;
}

// Utility types
export type ComponentVariant = 'primary' | 'secondary';
```

### Type Safety

- Use `ts-reset` for better defaults
- Strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use `PropsWithChildren` for components with children

## Styling Patterns

### CVA (Class Variance Authority) Pattern

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center', // Base
  {
    variants: {
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);
```

### Utility Functions

```typescript
// src/utils/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## Testing Patterns

### Storybook Stories

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Configuration Patterns

### Central Configuration

```typescript
// src/configs/config.tsx
import basicConfig from './configBasic';
import seoConfig from './configSEO';
import analyticsConfig from './configAnalytics';

const appConfig: IAppConfig = {
  url: basicConfig.url,
  SEO: seoConfig,
  analytics: analyticsConfig,
};

export default appConfig;
```

### Type Definitions

```typescript
// src/configs/type.ts
export interface IAppConfig {
  url: { test: string; production: string };
  SEO: ISEOConfig;
  analytics: IAnalyticsConfig;
}
```

## Layout Patterns

### App Structure

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Analytics />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

### Component Composition

```typescript
// Layout composition pattern
<AppProvider>           // Theme context
  <Analytics />         // Analytics tracking
    <BasicLayout>       // Layout wrapper
      <Header />        // Navigation
      <main>            // Main content
        {children}
      </main>
      <Footer />        // Footer
    </BasicLayout>
</AppProvider>
```

## Analytics Pattern

### Multi-provider Setup

```typescript
// Analytics component with multiple providers
export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <HotJar />
      <Umami />
    </>
  );
}
```

## Path Aliases

### Configured Aliases

- `@components` → `src/components`
- `@configs` → `src/configs`
- `@styles` → `src/styles`
- `@utils` → `src/utils`
- `@assets` → `src/assets`

## Known Patterns from Codebase

### Theme Management

- `next-themes` with system detection
- Dark/light mode support
- CSS variables for theming

### Component Variants

- CVA for variant management
- Tailwind classes for styling
- `cn()` utility for conditional classes

### Testing Strategy

- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests
- Storybook for component documentation
- Snapshot testing for UI consistency

### Build & Deployment

- Next.js 15 with App Router
- TypeScript strict mode
- ESLint + Prettier for code quality
- GitHub Actions for CI/CD
- Semantic Release for versioning
