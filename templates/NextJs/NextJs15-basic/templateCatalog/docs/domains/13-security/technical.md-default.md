# Przewodnik techniczny bezpieczeństwa

> [!NOTE] Wystąpienie tematu
> To jest szczegółowy przewodnik techniczny. Źródło koncepcji: [overview.md](overview.md)

## Security Headers Configuration

Security headers są konfigurowane bezpośrednio w `next.config.ts` przez funkcję `headers()`.

### Implementacja w next.config.ts

```7:33:next.config.ts
// Security headers configuration
const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
```

```73:80:next.config.ts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
```

### Opis Security Headers

#### 1. Referrer-Policy

```typescript
'Referrer-Policy': 'strict-origin-when-cross-origin'
```

**Cel:** Kontrola jakich danych referrer są wysyłane w żądaniach HTTP.

**Wartość:** `strict-origin-when-cross-origin` - wysyła pełny URL dla samego origin, tylko origin dla cross-origin HTTPS, nic dla HTTP.

#### 2. X-Frame-Options

```typescript
'X-Frame-Options': 'DENY'
```

**Cel:** Ochrona przed clickjacking - zapobiega osadzaniu strony w iframe.

**Wartość:** `DENY` - całkowicie blokuje osadzanie.

#### 3. X-Content-Type-Options

```typescript
'X-Content-Type-Options': 'nosniff'
```

**Cel:** Zapobiega MIME type sniffing - przeglądarka nie będzie próbować odgadnąć typu pliku.

**Wartość:** `nosniff` - wymusza użycie deklarowanego Content-Type.

#### 4. X-DNS-Prefetch-Control

```typescript
'X-DNS-Prefetch-Control': 'on'
```

**Cel:** Kontrola DNS prefetching dla optymalizacji performance i bezpieczeństwa.

#### 5. Strict-Transport-Security (HSTS)

```typescript
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
```

**Cel:** Wymuszenie HTTPS na wszystkie przyszłe żądania.

**Parametry:**
- `max-age=31536000` - 1 rok (w sekundach)
- `includeSubDomains` - dotyczy również subdomen

#### 6. Permissions-Policy

```typescript
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
```

**Cel:** Kontrola dostępu do API przeglądarki (kamera, mikrofon, geolokalizacja).

**Wartość:** Puste nawiasy `()` oznaczają całkowite wyłączenie.

### Ukrycie X-Powered-By Header

```55:55:next.config.ts
  poweredByHeader: false,
```

**Cel:** Ukrycie informacji o technologii (Next.js) w nagłówkach HTTP.

**Security benefit:** Mniejsze ujawnianie informacji o stacku technologicznym.

### React Strict Mode

```39:39:next.config.ts
  reactStrictMode: true,
```

**Cel:** Wykrywanie problemów bezpieczeństwa i błędów w React.

**Security benefits:**
- Wykrywanie niebezpiecznych wzorców
- Ostrzeżenia o deprecated APIs
- Lepsze error boundaries

### HTTPS-only Images

```45:53:next.config.ts
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
```

**Cel:** Wymuszenie HTTPS dla wszystkich zewnętrznych obrazów.

**Security benefit:** Zapobiega mixed content (HTTP + HTTPS na tej samej stronie).

### Compression

```54:54:next.config.ts
  compress: true,
```

**Cel:** Kompresja odpowiedzi HTTP przez Next.js.

**Security benefit:** Mniejsze ryzyko ataków wykorzystujących rozmiar odpowiedzi.

## ESLint Security Rules

ESLint security plugin jest skonfigurowany w `eslint.config.mjs`:

```7:7:eslint.config.mjs
import eslintPluginSecurity from 'eslint-plugin-security';
```

```65:65:eslint.config.mjs
  security: eslintPluginSecurity,
```

### Aktywne Security Rules

```108:112:eslint.config.mjs
      // Security rules - keeping only basic ones
      'security/detect-eval-with-expression': 'warn',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-non-literal-regexp': 'warn',
```

**Opis reguł:**
- `detect-eval-with-expression` - wykrywa użycie `eval()` z dynamicznymi wyrażeniami
- `detect-no-csrf-before-method-override` - sprawdza kolejność CSRF protection
- `detect-possible-timing-attacks` - wykrywa potencjalne timing attacks
- `detect-non-literal-regexp` - wykrywa niebezpieczne regex z dynamicznymi wartościami

### Dodatkowe Security Rules

```132:135:eslint.config.mjs
      // Basic security rules
      'no-eval': 'warn',
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',
```

## Environment Variables Security

Walidacja zmiennych środowiskowych przez T3 Env + Zod zapewnia:

- **Type safety** - TypeScript types dla env variables
- **Runtime validation** - walidacja przy starcie aplikacji
- **Server/client separation** - bezpieczne oddzielenie zmiennych serwerowych od klienckich

Szczegóły: [`../3-environment/technical.md`](../3-environment/technical.md)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia security
- [`tech-security-headers.md`](tech-security-headers.md) — szczegóły security headers
- [`../3-environment/`](../3-environment/) — environment variables validation
- [`../9-code-quality/`](../9-code-quality/) — ESLint security rules
- [`next.config.ts`](../../../next.config.ts) — Security configuration (reference)
- [`eslint.config.mjs`](../../../eslint.config.mjs) — ESLint security rules (reference)
