# Styling Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Core Configuration Files

### Tailwind CSS Configuration

**Location:** [`tailwind.config.ts`](../../../tailwind.config.ts)

**Key Properties:**
- `darkMode`: `'class'` - enables dark mode via class toggle
- `content`: Array of paths for purging unused styles
- `theme.extend.colors`: CSS custom properties for theming
- `theme.extend.borderRadius`: Consistent radius tokens
- `plugins`: Array of Tailwind plugins

**Example Configuration:**
```typescript
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        // ... other color definitions
      }
    }
  }
}
```

### Global Styles

**Location:** [`src/styles/global.scss`](../../../src/styles/global.scss)

**Contents:**
- CSS custom properties for colors
- Base styles and resets
- Tailwind imports
- Font definitions

### VSCode Colors Sync

**Location:** [`tools/updateVSCodeColors.js`](../../../tools/updateVSCodeColors.js)

**Purpose:** Automatically syncs Tailwind primary color with VSCode theme

**Usage:**
```bash
yarn update:vscode-colors
```

## Component API Reference

### Class Variance Authority (CVA)

**Import:** `import { cva } from 'class-variance-authority'`

**Usage:**
```typescript
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: 'bg-blue-500', secondary: 'bg-gray-500' },
    size: { sm: 'text-sm', lg: 'text-lg' }
  },
  defaultVariants: { variant: 'primary', size: 'sm' }
})

// Usage: buttonVariants({ variant: 'secondary', size: 'lg' })
```

### Utility Function: cn()

**Import:** `import { cn } from '@/utils/utils'`

**Purpose:** Merges Tailwind classes safely

**Implementation:**
```typescript
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

## Theme Variables Reference

### CSS Custom Properties

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | Blue (222.2 47.4% 11.2%) | Blue (210 40% 98%) | Primary actions |
| `--secondary` | Gray (210 40% 96%) | Gray (217.2 32.6% 17.5%) | Secondary elements |
| `--accent` | Gray (210 40% 96%) | Gray (217.2 32.6% 17.5%) | Accents |

## Build Configuration

### PostCSS Configuration

**Location:** [`postcss.config.js`](../../../postcss.config.js)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### CSS Imports

**Location:** [`src/styles/index.css`](../../../src/styles/index.css)

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import './global.scss';
```

## CLI Commands Reference

| Command | Purpose | Location |
|---------|---------|----------|
| `yarn update:vscode-colors` | Sync VSCode theme colors | `tools/updateVSCodeColors.js` |
| `yarn storybook` | Start Storybook dev server | `package.json` scripts |
| `yarn build:storybook` | Build Storybook | `package.json` scripts |

## Component Structure Reference

### Standard Component Layout

```
ComponentName/
├── ComponentName.tsx       # Main component with CVA variants
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx    # Unit tests
├── index.ts                 # Exports
└── types.ts                 # TypeScript interfaces (optional)
```

## See Also (Deep Dives)

- [tech-tailwind.md](tech-tailwind.md) — konfiguracja i praktyki Tailwind
- [tech-cva.md](tech-cva.md) — warianty komponentów i conventions
- [tech-shadcn.md](tech-shadcn.md) — integracja i customizacje shadcn/ui

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia stylowania
- [technical.md](technical.md) — praktyczny workflow i integracje
- [tech-tailwind.md](tech-tailwind.md) — konfiguracja Tailwind CSS
- [tech-cva.md](tech-cva.md) — warianty komponentów i conventions
- [tech-shadcn.md](tech-shadcn.md) — integracja shadcn/ui
