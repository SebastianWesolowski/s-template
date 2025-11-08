# State Management — Deep Dive

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
> `Zustand` nie jest aktualnie używany w repozytorium. Sekcja z `Zustand` poniżej ma charakter wzorca referencyjnego/do adopcji. Aktualny stan globalny zapewnia `AppProvider` (realny kod w repo).

## What i Why (krótko)

Zarządzanie stanem zapewnia spójność danych i przewidywalność UI w miarę wzrostu funkcji. W projekcie preferujemy proste rozwiązania i minimalne modyfikacje.

## Konfiguracja i struktura

- Centralny provider aplikacji dostarcza konteksty globalne (np. motyw):

```typescript
// src/components/AppProvider/AppProvider.tsx
import { ThemeProvider } from 'next-themes'
import { type FC, type PropsWithChildren } from 'react'

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    {children}
  </ThemeProvider>
)
```

- Integracja providera w layout aplikacji:

```typescript
// src/app/layout.tsx
import { AppProvider } from '@components'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
```

## Wzorce i opcje

- Context API: prosty, wbudowany w React — dobra baza dla lekkiego stanu UI
- Zustand (opcjonalnie): lokalne sklepy ze wsparciem persist — przydatny dla izolowanych feature'ów

### Przykład: Context Pattern (wzorzec do użycia)

```typescript
// Przykład: src/contexts/MyContext.tsx
'use client'
import { createContext, useContext, useState } from 'react'

type MyContextType = { state: any, setState: (v: any) => void }
const MyContext = createContext<MyContextType | undefined>(undefined)

export function MyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState()
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  )
}

export function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

### Przykład: Zustand (wzorzec do użycia)

```typescript
// Przykład: src/stores/myStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MyState = { data: any; updateData: (d: any) => void };

export const useMyStore = create<MyState>()(
  persist(
    (set) => ({
      data: null,
      updateData: (data) => set({ data }),
    }),
    { name: 'my-storage' }
  )
);
```

## Rekomendacje (minimalne modyfikacje)

- Zacznij od Context API w obrębie komponentów feature'owych
- Używaj Zustand dla izolowanych, lokalnych sklepów wymagających persystencji
- Unikaj globalnego, monolitycznego stanu — preferuj składanie mniejszych kontekstów/sklepów

## Troubleshooting

- Hydration mismatch po stronie motywu: upewnij się, że `suppressHydrationWarning` jest ustawione w `html` oraz `ThemeProvider` ma `attribute='class'`
- Zbyt rozbudowany kontekst: podziel na mniejsze konteksty lub przenieś część logiki do Zustand

## Wystąpienia

- [`overview.md`](overview.md) — kontekst „WHY/WHAT”
- [`technical.md`](technical.md) — przegląd i nawigacja
