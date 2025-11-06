# Performance Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Next.js Performance Configuration API

### next.config.ts Performance Options

[next.config.ts](../../../next.config.ts) linie 35-100

#### Image Optimization

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

**Parametry:**

- `formats: string[]` - Formaty obrazów do automatycznej konwersji (AVIF, WebP)
- `remotePatterns: Array<{protocol: string, hostname: string}>` - Wzorce dozwolonych zewnętrznych obrazów

#### Compression

```typescript
compress: true;
```

**Funkcjonalność:** Włącza automatyczną kompresję gzip dla wszystkich odpowiedzi HTTP.

#### Bundle Analyzer Configuration

```typescript
export default env.ANALYZE ? withBundleAnalyzer({ enabled: true, openAnalyzer: false })(config) : config;
```

**Parametry:**

- `enabled: boolean` - Włącza bundle analyzer
- `openAnalyzer: boolean` - Automatycznie otwiera przeglądarkę z raportem

**Szczegóły:** [tech-bundle-analyzer.md](tech-bundle-analyzer.md)

#### Webpack Configuration

```typescript
webpack: (config, { isServer }) => {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          typescript: true,
          icon: true,
        },
      },
    ],
  });
  return config;
};
```

**Funkcjonalność:** Konfiguracja SVG jako React components dla zmniejszenia bundle size.

## Bundle Analyzer API

### Package Reference

[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - `^15.1.6`

[package.json](../../../package.json) linia 81

### Scripts

[package.json](../../../package.json) linia 12

```json
{
  "scripts": {
    "build:analyze": "cross-env ANALYZE=true run-s build"
  }
}
```

**Komendy:**

- `yarn build:analyze` - Uruchamia build z włączonym bundle analyzer

### Environment Variable

[env.mjs](../../../env.mjs) linie 6-9, 32

```typescript
server: {
  ANALYZE: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => value === 'true'),
}
```

**Typ:** `boolean | undefined`
**Wartość:** `true` włącza bundle analyzer, `false` lub brak wyłącza

## Performance Monitoring API

### PerformanceMonitor Class

[technical.md](technical.md) linie 78-136

#### Static Methods

**measurePageLoad()**

```typescript
static measurePageLoad(): void
```

**Funkcjonalność:** Mierzy czas ładowania strony i loguje metryki:

- `domContentLoaded` - czas DOMContentLoaded event
- `loadComplete` - czas load event
- `totalTime` - całkowity czas ładowania

**measureCoreWebVitals()**

```typescript
static measureCoreWebVitals(): void
```

**Funkcjonalność:** Mierzy Core Web Vitals:

- **LCP (Largest Contentful Paint)** - największy element contentu
- **FID (First Input Delay)** - opóźnienie pierwszego interakcji użytkownika
- **CLS (Cumulative Layout Shift)** - suma layout shifts

**sendMetrics(metrics: any): void** (private)

```typescript
private static sendMetrics(metrics: any): void
```

**Funkcjonalność:** Wysyła metryki do analytics service (gtag).

### Core Web Vitals Metrics

**LCP (Largest Contentful Paint)**

- **Entry Type:** `largest-contentful-paint`
- **Threshold:** < 2.5s (good)
- **API:** `PerformanceObserver` z `entryTypes: ['largest-contentful-paint']`

**FID (First Input Delay)**

- **Entry Type:** `first-input`
- **Threshold:** < 100ms (good)
- **API:** `PerformanceObserver` z `entryTypes: ['first-input']`

**CLS (Cumulative Layout Shift)**

- **Entry Type:** `layout-shift`
- **Threshold:** < 0.1 (good)
- **API:** `PerformanceObserver` z `entryTypes: ['layout-shift']`

**FCP (First Contentful Paint)**

- **Entry Type:** `paint`
- **Threshold:** < 1.8s (good)
- **API:** `performance.getEntriesByType('paint')`

**TTFB (Time to First Byte)**

- **Entry Type:** `navigation`
- **Threshold:** < 800ms (good)
- **API:** `PerformanceNavigationTiming`

### Performance Navigation Timing API

```typescript
const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
```

**Dostępne właściwości:**

- `domContentLoadedEventStart` - Start DOMContentLoaded event
- `domContentLoadedEventEnd` - End DOMContentLoaded event
- `loadEventStart` - Start load event
- `loadEventEnd` - End load event
- `fetchStart` - Start fetch request

## Caching APIs

### CacheManager Class

[technical.md](technical.md) linie 163-194

#### Methods

**get<T>(key: string): Promise<T | null>**

```typescript
static async get<T>(key: string): Promise<T | null>
```

**Funkcjonalność:** Pobiera wartość z Redis cache.

**Parametry:**

- `key: string` - Klucz cache
- **Returns:** `Promise<T | null>` - Wartość lub null jeśli brak

**set(key: string, value: any, ttl?: number): Promise<void>**

```typescript
static async set(key: string, value: any, ttl: number = 3600): Promise<void>
```

**Funkcjonalność:** Zapisuje wartość do Redis cache z TTL.

**Parametry:**

- `key: string` - Klucz cache
- `value: any` - Wartość do zapisania (JSON serializowane)
- `ttl: number` - Time to live w sekundach (domyślnie 3600)

**del(key: string): Promise<void>**

```typescript
static async del(key: string): Promise<void>
```

**Funkcjonalność:** Usuwa wartość z Redis cache.

### CDNManager Class

[technical.md](technical.md) linie 200-221

#### Methods

**getImageUrl(path: string, width?: number, height?: number): string**

```typescript
static getImageUrl(path: string, width?: number, height?: number): string
```

**Funkcjonalność:** Generuje URL obrazu z CDN z parametrami width/height.

**Parametry:**

- `path: string` - Ścieżka do obrazu
- `width?: number` - Szerokość obrazu (opcjonalne)
- `height?: number` - Wysokość obrazu (opcjonalne)
- **Returns:** `string` - URL obrazu z parametrami query

**preloadImage(src: string): void**

```typescript
static preloadImage(src: string): void
```

**Funkcjonalność:** Dodaje `<link rel="preload">` dla obrazu w `<head>`.

**Parametry:**

- `src: string` - URL obrazu do preload

### HTTP Caching Headers

[technical.md](technical.md) linie 143-157

```typescript
response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
response.headers.set('ETag', `"${Date.now()}"`);
```

**Cache-Control Options:**

- `public` - Cache może być przechowywany przez shared cache (CDN)
- `max-age=300` - Cache ważny przez 300 sekund (5 minut)
- `s-maxage=300` - Shared cache ważny przez 300 sekund

**ETag:** Header do walidacji cache (conditional requests).

## Performance Standards Reference

### Core Web Vitals Thresholds

[overview.md](overview.md#performance-standards)

| Metric                             | Good    | Needs Improvement | Poor    |
| ---------------------------------- | ------- | ----------------- | ------- |
| **LCP** (Largest Contentful Paint) | < 2.5s  | 2.5s - 4.0s       | > 4.0s  |
| **FID** (First Input Delay)        | < 100ms | 100ms - 300ms     | > 300ms |
| **CLS** (Cumulative Layout Shift)  | < 0.1   | 0.1 - 0.25        | > 0.25  |
| **FCP** (First Contentful Paint)   | < 1.8s  | 1.8s - 3.0s       | > 3.0s  |
| **TTFB** (Time to First Byte)      | < 800ms | 800ms - 1.8s      | > 1.8s  |

### Bundle Size Limits

[overview.md](overview.md#performance-standards)

| Type                    | Limit   | Description                                        |
| ----------------------- | ------- | -------------------------------------------------- |
| **Initial Bundle Size** | < 250KB | Rozmiar głównego bundle przy pierwszym załadowaniu |
| **Chunk Size**          | < 100KB | Rozmiar pojedynczego code chunk                    |
| **Image Size**          | < 500KB | Maksymalny rozmiar pojedynczego obrazu             |
| **Font Size**           | < 100KB | Maksymalny rozmiar wszystkich fontów               |

### Caching TTL Standards

[overview.md](overview.md#performance-standards)

| Resource Type     | TTL       | Description               |
| ----------------- | --------- | ------------------------- |
| **Static Assets** | 1 year    | CSS, JS, obrazy statyczne |
| **API Responses** | 5 minutes | Cache dla API responses   |
| **HTML Pages**    | 1 hour    | Cache dla stron HTML      |
| **Images**        | 1 month   | Cache dla obrazów z CDN   |

## Performance Monitoring Tools

### PerformanceMonitor (Analytics)

[technical.md](technical.md) linie 224-271

#### Methods

**trackPageView(url: string): void**

```typescript
static trackPageView(url: string): void
```

**Funkcjonalność:** Śledzi wyświetlenie strony w Google Analytics i custom analytics.

**trackError(error: Error, context: string): void**

```typescript
static trackError(error: Error, context: string): void
```

**Funkcjonalność:** Śledzi błędy w error tracking service.

**trackPerformance(metric: string, value: number): void**

```typescript
static trackPerformance(metric: string, value: number): void
```

**Funkcjonalność:** Śledzi metryki wydajności.

## Development Performance Tools

### Turbopack

[package.json](../../../package.json) linia 11

```json
{
  "scripts": {
    "next:dev": "next dev --turbo"
  }
}
```

**Funkcjonalność:** ~10x szybszy niż Webpack, fast refresh <200ms.

### TypeScript Incremental Compilation

[tsconfig.json](../../../tsconfig.json)

**Funkcjonalność:** Szybsze kompilowanie dzięki cache, tylko zmienione pliki są rekompilowane.

### ESLint Cache

[package.json](../../../package.json) linia 41

```json
{
  "lint:eslint:check": "eslint ... --cache --cache-strategy content --cache-location .eslintcache/"
}
```

**Funkcjonalność:** Cache ESLint results w `.eslintcache/` dla szybszego linting.

### Prettier Cache

[package.json](../../../package.json) linie 39-40

```json
{
  "lint:prettier:check": "prettier --check --cache",
  "lint:prettier:fix": "prettier --write --cache"
}
```

**Funkcjonalność:** Cache Prettier results dla szybszego formatowania.

## Build Performance Metrics

[tech-performance.md](tech-performance.md#build-performance)

**Metrics:**

- **Cold build:** ~45s (bez cache)
- **Cached build:** ~15s (z cache)

**Optimizations:**

- TypeScript conditional config - `tsconfigPath` w next.config.ts
- Build scripts - `build:prebuild`, `build:postbuild` w package.json

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia performance
- [technical.md](technical.md) — implementacja i setup
- [tech-performance.md](tech-performance.md) — szczegóły performance optimization
- [tech-bundle-analyzer.md](tech-bundle-analyzer.md) — szczegóły bundle analyzer
- [next.config.ts](../../../next.config.ts) — Next.js performance config
- [package.json](../../../package.json) — scripts i dependencies
- [env.mjs](../../../env.mjs) — ANALYZE environment variable
