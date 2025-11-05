# Next.js App Router

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

### 1. File-based Routing System

```
src/app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page (/)
├── loading.tsx             # Loading UI
├── error.tsx               # Error UI
├── not-found.tsx           # 404 page
├── globals.css             # Global styles
├── api/                    # API routes
│   ├── health/
│   │   └── route.ts        # GET /api/health
│   └── users/
│       ├── route.ts        # GET/POST /api/users
│       └── [id]/
│           └── route.ts    # GET/PUT/DELETE /api/users/[id]
├── (dashboard)/            # Route groups
│   ├── layout.tsx          # Dashboard layout
│   ├── page.tsx            # /dashboard
│   └── settings/
│       └── page.tsx        # /dashboard/settings
└── blog/
    ├── page.tsx            # /blog
    └── [slug]/
        └── page.tsx        # /blog/[slug]
```

### 2. Special Files

#### layout.tsx

```typescript
// src/app/layout.tsx
import { AppProvider, Analytics } from '@components';
import config from '@configs';
import '@styles/global.scss';
import '@styles/tailwind.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={config.SEO.locale} suppressHydrationWarning>
      <body className='flex h-full flex-col'>
        <AppProvider>
          <Analytics />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

#### page.tsx

```typescript
// src/app/page.tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Next.js 15</h1>
      <Card className="p-6">
        <p className="text-gray-600 mb-4">
          This is a modern Next.js template with best practices.
        </p>
        <Button>Get Started</Button>
      </Card>
    </main>
  );
}
```

#### loading.tsx

```typescript
// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

#### error.tsx

```typescript
// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
```

## API Routes

### 1. Basic API Route

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
```

### 2. CRUD API Route

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function GET() {
  try {
    // Fetch users from database
    const users = await fetchUsers();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = createUserSchema.parse(body);

    // Create user in database
    const user = await createUser({ name, email });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

async function fetchUsers() {
  // Database query
  return [];
}

async function createUser(data: { name: string; email: string }) {
  // Database insert
  return { id: '1', ...data };
}
```

### 3. Dynamic API Route

```typescript
// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await fetchUserById(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();
    const user = await updateUser(params.id, body);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await deleteUser(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

async function fetchUserById(id: string) {
  // Database query
  return null;
}

async function updateUser(id: string, data: any) {
  // Database update
  return { id, ...data };
}

async function deleteUser(id: string) {
  // Database delete
}
```

## Server Components vs Client Components

### 1. Server Components (Default)

```typescript
// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

async function getDashboardData() {
  // This runs on the server
  const response = await fetch('https://api.example.com/dashboard', {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  return response.json();
}

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const data = await getDashboardData();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <DashboardStats data={data} />
    </div>
  );
}
```

### 2. Client Components

```typescript
// src/components/dashboard/UserList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user: any) => (
        <div key={user.id} className="p-4 border rounded">
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

## Middleware

> [!NOTE] Wzorzec referencyjny
> Middleware nie jest obecnie zaimplementowany w projekcie. Poniższe przykłady to wzorce do użycia w przyszłości.

### 1. Authentication Middleware (Wzorzec)

```typescript
// src/middleware.ts (wzorzec do implementacji)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Przykład: ochrona tras z autentykacją
  // const protectedRoutes = ['/dashboard'];
  // if (isProtected && !isAuthenticated) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## Data Fetching Patterns

### 1. Server-side Data Fetching

```typescript
// src/app/blog/page.tsx
async function getPosts() {
  const response = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <article key={post.id} className="border rounded p-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### 2. Client-side Data Fetching with SWR

```typescript
// src/components/BlogPost.tsx
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BlogPost({ slug }: { slug: string }) {
  const { data, error, isLoading } = useSWR(
    `/api/posts/${slug}`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!data) return <div>Post not found</div>;

  return (
    <article className="prose max-w-none">
      <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
}
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Next.js App Router
- [`technical.md`](technical.md) — implementacja i wzorce
- [`src/app/`](../../../src/app/) — struktura App Router (reference)
- [`next.config.ts`](../../../next.config.ts) — konfiguracja Next.js (reference)
