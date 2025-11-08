# CVA (Class Variance Authority)

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

## Konwencje

- Warianty zawsze w osobnym module obok komponentu (np. `button-variants.ts`)
- Łączenie klas tylko przez `cn()` — [src/utils/utils.ts](../../../src/utils/utils.ts)
- Tokeny kolorów z Tailwind; brak twardych kolorów w wariantach

## See also

- [tech-tailwind.md](tech-tailwind.md) — tokeny i theme
- [../8-styling/technical.md](../8-styling/technical.md) — workflow

## Wystąpienia

- [`src/utils/utils.ts`](../../../src/utils/utils.ts) — cn() utility
- **Brak komponentów z CVA w produkcji** (pattern gotowy w tym pliku)
