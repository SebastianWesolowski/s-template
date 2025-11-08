# Przewodnik techniczny architektury

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Next.js App Router Architecture

> [!NOTE] Wystąpienie tematu
> Pełna struktura projektu: [`overview.md#struktura-projektu`](overview.md#struktura-projektu)

### 1. File-based Routing

> [!NOTE] Wystąpienie tematu
> Pełne źródło: [`tech-nextjs.md`](tech-nextjs.md)

Next.js App Router używa file-based routing, gdzie struktura folderów w `src/app/` determinuje routing aplikacji.

**Podstawowe zasady (odniesienie do App Router):**

- `page.tsx` - definiuje stronę dla danego route
- `layout.tsx` - definiuje layout dla segmentu i jego dzieci
- `error.tsx` - UI error handling dla segmentu (patrz oficjalna dokumentacja)
- `not-found.tsx` - UI dla 404 (patrz oficjalna dokumentacja)

> [!NOTE] Wystąpienie tematu
> Szczegóły App Router znajdują się w dokumentacji Next.js — ten szablon korzysta z frameworka bez duplikowania treści oficjalnych. Zobacz: [`tech-nextjs.md`](tech-nextjs.md)

**Przykład struktury:**

```
src/app/
├── page.tsx              # / (homepage)
├── layout.tsx            # Root layout
├── about/
│   └── page.tsx          # /about
├── blog/
│   ├── page.tsx          # /blog
│   ├── [slug]/
│   │   └── page.tsx      # /blog/[slug]
│   └── layout.tsx        # Layout dla /blog/*
└── api/
    └── users/
        └── route.ts      # /api/users
```

**Szczegóły**: Zobacz [Next.js App Router](tech-nextjs.md) - pełna dokumentacja routing i API routes

### 2. Layout System

```typescript
// src/app/layout.tsx - Root Layout
import { AppProvider } from '@components';
import '@styles/global.scss';
import '@styles/tailwind.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className='flex h-full flex-col'>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

### 3. API Routes

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { env } from '../../../env.mjs';

export async function GET() {
  try {
    // Health check logic
    const isHealthy = await checkDatabaseConnection();

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: isHealthy ? 'connected' : 'disconnected',
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Health check failed' }, { status: 500 });
  }
}

async function checkDatabaseConnection(): Promise<boolean> {
  // Database connection check
  return true;
}
```

## Component Architecture

> [!NOTE] Wystąpienie tematu
> Wzorce przycisków, CVA i barrel exports są częścią domeny stylowania. Zobacz:
>
> - [`../8-styling/technical.md`](../8-styling/technical.md)
> - [`../8-styling/tech-cva.md`](../8-styling/tech-cva.md)
> - [`../8-styling/tech-shadcn.md`](../8-styling/tech-shadcn.md)
> - [`../8-styling/tech-tailwind.md`](../8-styling/tech-tailwind.md)

Architektura komponentów w tej domenie koncentruje się na rozmieszczeniu i relacjach (kolokacja, podział na feature/UI), a nie na szczegółach stylowania. Implementacyjne szczegóły UI zostały przeniesione do domeny stylowania, aby uniknąć duplikacji i zachować Single Source of Truth.

## State Management Architecture

> [!NOTE] Topic Occurrence: State Management
> Szczegółowy deep-dive: [`tech-state-management.md`](tech-state-management.md)

Obecnie wdrożony: globalne konteksty przez `AppProvider`. Dalsza adopcja lekkich sklepów (np. Zustand) jest w toku oceny — status i decyzje: [`INPROGRESS.md`](INPROGRESS.md). Szczegóły wzorców i opcji: zobacz plik deep-dive.

## Data Fetching Architecture

> [!NOTE] Topic Occurrence: Data Fetching
> Szczegółowy deep-dive: [`tech-data-fetching.md`](tech-data-fetching.md)

W projekcie preferujemy SSR-first (Server Components) z kontrolą rewalidacji oraz SWR dla klientów wymagających odświeżania. Instrukcje, przykłady i rekomendacje znajdują się w pliku deep-dive.

## Middleware Architecture

> [!NOTE] Wystąpienie tematu
> Middleware nie jest zaimplementowany w tym szablonie. Status oraz wzorce referencyjne znajdziesz w: [`INPROGRESS.md`](INPROGRESS.md)

## Error Handling Architecture

> [!NOTE] Topic Occurrence: Error Handling
> Szczegółowy deep-dive: [`tech-error-handling.md`](tech-error-handling.md)

Obsługa błędów obejmuje komponent `ErrorBoundary` oraz globalną stronę błędów Next.js. Implementacje, zalecenia i troubleshooting znajdują się w pliku deep-dive.

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia architektury
- [`tech-nextjs.md`](tech-nextjs.md) — szczegóły Next.js App Router
- [`../component-development/`](../component-development/) — szczegóły komponentów
- [`../8-styling/`](../8-styling/) — kontekst systemu stylowania
- [`src/app/`](../../../src/app/) — struktura App Router (reference)
- [`src/components/`](../../../src/components/) — przykłady komponentów (reference)
