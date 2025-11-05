# Error Handling — Deep Dive

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
> Poniższe przykłady `ErrorBoundary` i globalnej strony błędów są wzorcami referencyjnymi; w repozytorium mogą jeszcze nie występować. Jeżeli zostaną przyjęte, aktualizacje trafią do kodu oraz `INPROGRESS.md`.

## What i Why (krótko)

Spójna obsługa błędów poprawia jakość doświadczenia użytkownika i ułatwia diagnozowanie problemów.

## Error Boundary (komponent kliencki)

```typescript
// src/components/ErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

## Global Error Page (Next.js)

```typescript
// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
```

## Rekomendacje (minimalne modyfikacje)

- Stosuj `ErrorBoundary` wokół krytycznych komponentów klienckich
- W globalnej stronie błędów loguj szczegóły i umożliwiaj szybkie „try again”

## Troubleshooting

- Błędy nieprzechwycone w Server Components: używaj mechanizmów Next.js (error.tsx) oraz logowania na serwerze
- Powtarzające się błędy klienckie: dodaj granularne `ErrorBoundary` w wąskich miejscach

## Wystąpienia

- [`overview.md`](overview.md) — kontekst „WHY/WHAT”
- [`technical.md`](technical.md) — przegląd i nawigacja
