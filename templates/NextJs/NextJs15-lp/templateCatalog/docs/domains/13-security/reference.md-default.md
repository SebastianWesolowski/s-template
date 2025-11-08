# Security Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Lokalizacje konfiguracji

- [`next.config.ts`](../../../next.config.ts) linie 7-33, 39, 45-53, 54, 55, 73-80 — Security headers, React Strict Mode, HTTPS-only images, compression, poweredByHeader
- [`eslint.config.mjs`](../../../eslint.config.mjs) linie 7, 65, 108-112, 132-135 — ESLint security plugin i reguły security
- [`env.mjs`](../../../env.mjs) — Environment variables validation (T3 Env + Zod)

## Security Headers API

Security headers są zdefiniowane jako tablica obiektów w `next.config.ts` i aplikowane przez funkcję `headers()`:

```typescript
const securityHeaders: Array<{ key: string; value: string }> = [
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

### Referrer-Policy

**Wartość:** `strict-origin-when-cross-origin`

**Dostępne opcje:**
- `no-referrer` — nie wysyła żadnych danych referrer
- `no-referrer-when-downgrade` — domyślne zachowanie przeglądarki
- `origin` — wysyła tylko origin (scheme + host)
- `origin-when-cross-origin` — wysyła pełny URL dla samego origin, tylko origin dla cross-origin
- `strict-origin` — wysyła tylko origin, nie wysyła dla downgrade
- `strict-origin-when-cross-origin` — wysyła pełny URL dla samego origin, tylko origin dla cross-origin HTTPS, nic dla HTTP
- `unsafe-url` — zawsze wysyła pełny URL

### X-Frame-Options

**Wartość:** `DENY`

**Dostępne opcje:**
- `DENY` — całkowicie blokuje osadzanie w iframe
- `SAMEORIGIN` — pozwala osadzanie tylko dla samego origin
- `ALLOW-FROM uri` — deprecated, nie używać

### X-Content-Type-Options

**Wartość:** `nosniff`

**Dostępne opcje:**
- `nosniff` — wymusza użycie deklarowanego Content-Type, blokuje MIME type sniffing

### X-DNS-Prefetch-Control

**Wartość:** `on`

**Dostępne opcje:**
- `on` — zezwala na DNS prefetching
- `off` — wyłącza DNS prefetching

### Strict-Transport-Security (HSTS)

**Wartość:** `max-age=31536000; includeSubDomains`

**Składnia:**
- `max-age=<seconds>` — czas w sekundach, przez który przeglądarka będzie wymuszać HTTPS
- `includeSubDomains` (opcjonalne) — dotyczy również wszystkich subdomen
- `preload` (opcjonalne) — dodaje domenę do HSTS preload list

**Uwaga:** Działa tylko dla HTTPS. W development (HTTP) header nie ma efektu.

### Permissions-Policy

**Wartość:** `camera=(), microphone=(), geolocation=()`

**Składnia:**
- `<feature>=()` — całkowite wyłączenie
- `<feature>=(self)` — tylko dla samego origin
- `<feature>=(self "https://example.com")` — self + dozwolone origins
- `*` — pozwala dla wszystkich origins

**Dostępne features:**
- `camera`, `microphone`, `geolocation`, `payment`, `usb`, `magnetometer`, `gyroscope`, `accelerometer`, i inne

## Next.js Security Configuration

### reactStrictMode

**Lokalizacja:** [`next.config.ts`](../../../next.config.ts) linia 39

**Wartość:** `true`

**Typ:** `boolean`

**Efekt:** Włącza React Strict Mode, które wykrywa problemy bezpieczeństwa i niebezpieczne wzorce w React.

### poweredByHeader

**Lokalizacja:** [`next.config.ts`](../../../next.config.ts) linia 55

**Wartość:** `false`

**Typ:** `boolean`

**Efekt:** Ukrywa nagłówek `X-Powered-By: Next.js` w odpowiedziach HTTP.

### images.remotePatterns

**Lokalizacja:** [`next.config.ts`](../../../next.config.ts) linie 45-53

**Konfiguracja:**
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

**Opcje:**
- `protocol: 'https'` — wymusza HTTPS dla wszystkich zewnętrznych obrazów
- `hostname: '**'` — pozwala wszystkie hostname'y (wildcard)
- `hostname: 'example.com'` — konkretna domena
- `pathname: '/images/**'` — konkretna ścieżka

**Security effect:** Zapobiega mixed content (HTTP + HTTPS na tej samej stronie).

### compress

**Lokalizacja:** [`next.config.ts`](../../../next.config.ts) linia 54

**Wartość:** `true`

**Typ:** `boolean`

**Efekt:** Włącza kompresję odpowiedzi HTTP przez Next.js (gzip/brotli).

## ESLint Security Rules

### Plugin Import

**Lokalizacja:** [`eslint.config.mjs`](../../../eslint.config.mjs) linie 7, 65

```javascript
import eslintPluginSecurity from 'eslint-plugin-security';
// ...
security: eslintPluginSecurity,
```

### Aktywne Security Rules

**Lokalizacja:** [`eslint.config.mjs`](../../../eslint.config.mjs) linie 108-112

```javascript
'security/detect-eval-with-expression': 'warn',
'security/detect-no-csrf-before-method-override': 'warn',
'security/detect-possible-timing-attacks': 'warn',
'security/detect-non-literal-regexp': 'warn',
```

**Dostępne poziomy:**
- `'off'` — wyłączona
- `'warn'` — ostrzeżenie (obecna konfiguracja)
- `'error'` — błąd

### Dodatkowe Security Rules

**Lokalizacja:** [`eslint.config.mjs`](../../../eslint.config.mjs) linie 132-135

```javascript
'no-eval': 'warn',
'no-implied-eval': 'warn',
'no-new-func': 'warn',
```

**Dostępne poziomy:**
- `'off'` — wyłączona
- `'warn'` — ostrzeżenie (obecna konfiguracja)
- `'error'` — błąd

## Environment Variables Validation

**Lokalizacja:** [`env.mjs`](../../../env.mjs)

**Technologia:** T3 Env + Zod

**Funkcje:**
- Type-safe environment variables (TypeScript types)
- Runtime validation przy starcie aplikacji
- Server/client separation (NEXT_PUBLIC_* dla client-side)

**Szczegóły:** [`../3-environment/reference.md`](../3-environment/reference.md)

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia security
- [`technical.md`](technical.md) — implementacja i konfiguracja security
- [`tech-security-headers.md`](tech-security-headers.md) — szczegóły security headers
- [`../3-environment/`](../3-environment/) — environment variables validation
- [`../9-code-quality/`](../9-code-quality/) — ESLint security rules
