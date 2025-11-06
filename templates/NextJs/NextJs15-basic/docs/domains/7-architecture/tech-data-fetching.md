# Data Fetching — Deep Dive

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
> Poniższe przykłady (Dashboard, SWR listy) to wzorce referencyjne i nie odzwierciedlają aktualnych plików w repozytorium. W tym szablonie preferujemy linkowanie do oficjalnej dokumentacji Next.js (App Router, fetch, cache/rewalidacja) i użycie tylko tego, co dodaje unikalną wartość szablonu.

## What i Why (krótko)

Celem jest stabilny i przewidywalny przepływ danych dla widoków serwerowych i klienckich, z kontrolą cache i rewalidacji.

## Server Components (SSR-first)

- Pobieranie danych po stronie serwera zapewnia lepszą wydajność i SEO
- Przykład strony z danymi i kontrolą dostępu:

```typescript
// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { DashboardStats } from '@/components/dashboard/DashboardStats'

async function getDashboardData() {
  const response = await fetch('https://api.example.com/dashboard', {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
    next: { revalidate: 3600 }, // Rewalidacja co godzinę
  })

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data')
  }

  return response.json()
}

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const data = await getDashboardData()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <DashboardStats data={data} />
    </div>
  )
}
```

## Client Components z SWR

- SWR upraszcza cache, rewalidację i odświeżanie

```typescript
// src/components/dashboard/UserList.tsx
'use client'

import useSWR from 'swr'
import { UserCard } from './UserCard'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function UserList() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher, {
    refreshInterval: 30000, // Odświeżanie co 30s
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.users?.map((user: any) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## Rekomendacje (minimalne modyfikacje)

- Domyślnie preferuj Server Components i kontrolowaną rewalidację
- Używaj SWR tam, gdzie wymagane jest odświeżanie na żywo po stronie klienta
- Standaryzuj obsługę błędów i stany ładowania

## Troubleshooting

- Błąd autoryzacji w SSR: zweryfikuj nagłówki i pochodzenie tokena
- Nadmiarowe żądania w SWR: wyłącz lub wydłuż `refreshInterval`, użyj `dedupingInterval`

## Wystąpienia

- [`overview.md`](overview.md) — kontekst „WHY/WHAT”
- [`technical.md`](technical.md) — przegląd i nawigacja
