# Przewodnik techniczny stylowania

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

---

## Minimalistyczny workflow stylowania

- **Utility-first via Tailwind** – modyfikuj wyłącznie [tailwind.config.ts](../../../tailwind.config.ts) i [src/styles/](../../../src/styles/)
- **Warianty przez CVA** – patterny w [tech-cva.md](tech-cva.md)
- **Domyślne komponenty z shadcn/ui** – niestandardowe zmiany i forki opisuj tylko, jeśli odbiegają od standardu [tech-shadcn.md](tech-shadcn.md)
- **Unikaj custom CSS, Sass tylko przy szczególnych przypadkach** – wzorce w [Component styling patterns](#component-styling-patterns)

---

## Synchronizacja kolorów VSC → Tailwind (custom)

> Kolory z palety Tailwind `primary.500` są automatycznie podpinane pod kolor panelu VSC za pomocą [updateVSCodeColors.js](../../../tools/updateVSCodeColors.js) — skrypt parsuje tailwind.config.ts i generuje właściwy kolor do .vscode/settings.json.

**Nie zmieniaj ręcznie tych ustawień!**

---

## Implementacja komponentów z wariantami

```typescript
// src/components/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

**Szczegóły**: [tech-cva.md](tech-cva.md) — pełna dokumentacja wzorców CVA

---

## Integracja z Storybook

```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}
```

**Szczegóły**: [tech-storybook.md](../10-testing/tech-storybook.md) — konfiguracja Storybook

---

## Customowe workflow w Storybook

- Dla każdego komponentu możesz stosować własne klasy, konwencje i customowe tematy – [przykład: src/components/]
- Integracja theme i dark mode poprzez [ThemeProvider z next-themes](tech-tailwind.md#dark-mode)
- Zalecane, by testy stylistyczne uruchamiać równolegle ze Storybook– nie wymagamy osobnych plików CSS
- SASS/CSS modules tylko gdy utility-first nie wystarcza, zawsze dokumentuj wyjątek w kodzie

---

## Konfiguracja Tailwind dla projektu

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... inne kolory
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // ... inne rozszerzenia
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

**Szczegóły**: [tech-tailwind.md](tech-tailwind.md) — pełna konfiguracja i najlepsze praktyki

---

## Troubleshooting

### Problem: Style nie aplikują się w Storybook

**Objawy:**
- Komponenty wyglądają inaczej w Storybook niż w aplikacji
- Brak theme provider w Storybook

**Rozwiązanie:**
```typescript
// .storybook/preview.ts
import '../src/styles/global.scss'
import { ThemeProvider } from 'next-themes'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Story />
      </ThemeProvider>
    ),
  ],
}
```

### Problem: Dark mode nie działa

**Objawy:**
- Przycisk toggle nie zmienia theme
- Style dark mode nie aplikują się

**Rozwiązanie:**
```typescript
// src/components/ThemeToggle.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

---

## Rekomendacje

- **Zacznij od utility-first**: Używaj klas Tailwind zamiast custom CSS
- **Używaj CVA dla wariantów**: Zapewnia type safety i spójność
- **Testuj wizualnie**: Korzystaj ze Storybook do sprawdzania wszystkich stanów
- **Dokumentuj wyjątki**: Jeśli używasz custom CSS/SASS, wyjaśnij dlaczego
- **Synchronizuj kolory**: Nie zmieniaj ręcznie ustawień VSCode - używaj skryptu

---

## Najczęstsze nietypowe przypadki projektowe

- Automatyczna synchronizacja kolorów — [updateVSCodeColors.js](../../../tools/updateVSCodeColors.js)
- Spójność theme (`primary`, tła, accent) — zarządzaj centralnie w tailwind.config.ts
- Zarządzanie wariantami (np. Button, Card) — używaj patternu CVA ze [src/components/]

---

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia stylowania
- [tech-tailwind.md](tech-tailwind.md) — szczegóły konfiguracji Tailwind
- [tech-cva.md](tech-cva.md) — wzorce CVA
- [tech-shadcn.md](tech-shadcn.md) — integracja shadcn/ui
- [reference.md](reference.md) — techniczna referencja domeny
- [updateVSCodeColors.js](../../../tools/updateVSCodeColors.js) — sync kolorów VSCode
- [tailwind.config.ts](../../../tailwind.config.ts) — produkcyjny config
- [src/styles/](../../../src/styles/) — globalne style
- [../7-architecture/](../7-architecture/) — kontekst architektury komponentów
