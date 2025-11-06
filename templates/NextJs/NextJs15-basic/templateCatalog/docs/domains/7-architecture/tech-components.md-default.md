# Component Development

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

Komponenty w Next.js 15 Template opierają się na **modularnym, type-safe systemie** wykorzystującym React functional components, TypeScript i CVA (Class Variance Authority) dla zarządzania wariantami stylów.

## Filozofia Komponentów

### 1. Colocation Principle

**Dlaczego?** Wszystkie pliki związane z komponentem w jednym miejscu

- **Łatwiejsze utrzymanie** - wszystko w jednym folderze
- **Szybsze usuwanie** - usunięcie folderu = usunięcie feature
- **Lepsza kohezja** - powiązane pliki razem
- **Jasne ownership** - kto odpowiada za komponent

### 2. Type Safety First

**Dlaczego?** TypeScript zapewnia bezpieczeństwo i lepsze DX

- **Compile-time errors** - błędy wykrywane przed runtime
- **IntelliSense** - lepsze podpowiedzi w IDE
- **Refactoring safety** - bezpieczne zmiany w kodzie
- **Documentation** - typy jako dokumentacja

### 3. Composition over Configuration

**Dlaczego?** Elastyczność i reużywalność

- **CVA variants** - konfigurowalne style
- **Props composition** - łączenie różnych właściwości
- **Extensibility** - łatwe rozszerzanie funkcjonalności

## Folder Structure Pattern

### Standardowa Struktura

```javascript
ComponentName/
├── ComponentName.tsx          # Główny komponent
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
├── index.ts                   # Public API (exports)
└── README.md                  # Dokumentacja komponentu
```

### Przykład: Button Component

```javascript
Button/
├── Button.tsx                 # Button component + CVA variants
├── Button.stories.tsx         # Storybook stories
├── Button.test.tsx            # Jest tests
├── index.ts                   # export { Button } from './Button'
└── README.md                  # Button documentation
```

## React Patterns w Projekcie

### 1. Functional Components

**Wzorzec**: Functional components z TypeScript

```typescript
// ✅ Functional component
export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {children}
    </button>
  );
}

// ❌ Class component (nie używamy)
class Button extends React.Component<ButtonProps> {
  render() {
    return <button>{this.props.children}</button>;
  }
}
```

### 2. TypeScript Interfaces

**Wzorzec**: Interface naming i extends

```typescript
// Component props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Configuration interfaces
export interface IButtonConfig {
  variants: Record<string, string>;
  defaultVariants: Record<string, string>;
}
```

### 3. PropsWithChildren Pattern

**Wzorzec**: Explicit children handling

```typescript
import { type PropsWithChildren } from 'react';

export interface CardProps extends PropsWithChildren {
  variant?: 'default' | 'outlined';
  className?: string;
}

export function Card({ children, variant, className }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, className }))}>
      {children}
    </div>
  );
}
```

### 4. forwardRef (gdzie potrzebne)

**Wzorzec**: forwardRef dla komponentów wymagających ref

```typescript
import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
```

## CVA Integration

### 1. Wzorzec cva()

**Struktura**: Base classes + variants + defaultVariants

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes - zawsze aplikowane
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
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
);
```

### 2. VariantProps<typeof>

**Wzorzec**: Type-safe variant props

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

### 3. defaultVariants

**Wzorzec**: Sensowne domyślne wartości

```typescript
defaultVariants: {
  variant: 'default',  // Najczęściej używany wariant
  size: 'default',     // Standardowy rozmiar
}
```

## TypeScript Patterns

### 1. Interface Naming

**Konwencja**: ComponentName + Props

```typescript
// ✅ Poprawne nazewnictwo
export interface ButtonProps {}
export interface CardProps {}
export interface InputProps {}

// ❌ Unikaj
export interface IButton {}
export interface ButtonInterface {}
```

### 2. extends React.HTMLAttributes

**Wzorzec**: Rozszerzanie natywnych HTML attributes

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Dodatkowe props specyficzne dla komponentu
  asChild?: boolean;
}
```

### 3. Type Safety z VariantProps

**Wzorzec**: Pełna type safety dla wariantów

```typescript
// TypeScript sprawdzi czy variant istnieje
<Button variant="primary" size="lg" />  // ✅ OK
<Button variant="invalid" />            // ❌ TypeScript error
```

## Przykłady Implementacji

### Podstawowy Komponent z CVA

```typescript
// src/components/MyComponent/MyComponent.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import { type PropsWithChildren } from 'react';

const myComponentVariants = cva(
  'rounded-lg p-4', // Base classes
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-900',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-200 text-gray-900',
      },
      size: {
        sm: 'p-2 text-sm',
        md: 'p-4 text-base',
        lg: 'p-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface MyComponentProps
  extends PropsWithChildren,
          VariantProps<typeof myComponentVariants> {
  className?: string;
}

export function MyComponent({
  className,
  variant,
  size,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Zaawansowane Wzorce

#### 1. Compound Components

```typescript
// Card compound component
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ className }))} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

// Usage
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

#### 2. Conditional Rendering

```typescript
export function Alert({ variant, children, className, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant, className }))} {...props}>
      {variant === 'destructive' && <AlertCircle className="h-4 w-4" />}
      {variant === 'warning' && <AlertTriangle className="h-4 w-4" />}
      {children}
    </div>
  );
}
```

#### 3. cn() Utility Usage

```typescript
// Podstawowe użycie
<button className={cn(buttonVariants({ variant: 'primary' }))}>

// Z dodatkowymi klasami
<button className={cn(
  buttonVariants({ variant: 'primary', size: 'lg' }),
  'w-full mt-4'
)}>

// Z warunkowymi klasami
<button className={cn(
  buttonVariants({ variant: 'primary' }),
  {
    'opacity-50 cursor-not-allowed': disabled,
    'hover:scale-105': !disabled,
  }
)}>

// Z props className
<button
  className={cn(buttonVariants({ variant: 'primary' }), className)}
  {...props}
>
```

## Best Practices

### 1. Component Design

- **Single Responsibility** - jeden komponent = jedna funkcjonalność
- **Composition** - łącz proste komponenty w złożone
- **Props Interface** - zawsze definiuj TypeScript interface
- **Default Props** - używaj defaultVariants w CVA

### 2. File Organization

- **Colocation** - wszystkie pliki komponentu w jednym folderze
- **index.ts** - eksportuj tylko public API
- **README.md** - dokumentuj użycie komponentu
- **Stories** - przykłady użycia w Storybook

### 3. Performance

- **React.memo** - dla komponentów z ciężkimi renderami
- **useMemo/useCallback** - dla kosztownych obliczeń
- **Lazy loading** - dla dużych komponentów

### 4. Accessibility

- **Semantic HTML** - używaj odpowiednich tagów
- **ARIA attributes** - dodawaj gdzie potrzebne
- **Keyboard navigation** - obsługuj klawiaturę
- **Screen readers** - testuj z czytnikami ekranu

## Wystąpienia

- [`../8-styling/tech-cva.md`](tech-cva.md) — szczegóły CVA patterns
- [`../1-getting-started/technical.md`](../1-getting-started/technical.md) — quick start z komponentami
- [`../../memory-bank/systemPatterns.md`](../../memory-bank/systemPatterns.md) — skrót wzorców komponentów
- [`../8-styling/overview.md`](../8-styling/overview.md) — kontekst systemu stylowania
- [`../2-developer-experience/`](../2-developer-experience/) — narzędzia deweloperskie dla komponentów
