# Performance Optimization

> [!NOTE] Wystąpienie tematu Performance Optimization
> Szczegółowy przewodnik po optymalizacji performance w Next.js 15 Template.
> Źródło koncepcji: [overview.md](overview.md)

## Konfiguracja Next.js

[next.config.ts](../../../next.config.ts) — konfiguracja performance (linie 35-100)

### Image Optimization

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
```

> [!WARNING] Security Risk
> `hostname: '**'` pozwala na ładowanie obrazów z dowolnych domen HTTPS. W produkcji zastąp konkretnymi domenami dla bezpieczeństwa.

**Funkcjonalność:**

- Automatyczna konwersja do AVIF i WebP
- Responsive image sizes dla różnych urządzeń
- Cache TTL: 60 sekund
- Remote images support z pattern matching
- Wbudowana optymalizacja przez Next.js Image component

**Oficjalna dokumentacja:** [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)

### Compression

```typescript
compress: true,
```

**Funkcjonalność:**

- Automatyczna kompresja gzip dla wszystkich odpowiedzi
- Zmniejsza rozmiar transferowanych danych

### Security Headers (Performance Impact)

```typescript
{
  key: 'X-DNS-Prefetch-Control',
  value: 'on',
},
```

**Funkcjonalność:**

- DNS prefetching przyspiesza ładowanie zewnętrznych zasobów
- Wpływa na performance poprzez szybsze DNS resolution

**Szczegóły:** [../13-security/tech-security-headers.md](../13-security/tech-security-headers.md) — pełna konfiguracja security headers

### SVG Optimization

[next.config.ts](../../../next.config.ts) linie 81-97 — webpack config

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
},
```

**Funkcjonalność:**

- SVG jako React components
- Zmniejsza bundle size (SVG inline zamiast osobnych plików)
- TypeScript support

> [!NOTE] Dependency
> `@svgr/webpack` jest używany w konfiguracji webpack, ale nie jest wymieniony jako dependency w package.json. Może być wymagana instalacja: `yarn add -D @svgr/webpack`

### Bundle Analyzer

[next.config.ts](../../../next.config.ts) linia 100 — conditional bundle analyzer

```typescript
export default env.ANALYZE ? withBundleAnalyzer({ enabled: true, openAnalyzer: false })(config) : config;
```

**Szczegóły:** [tech-bundle-analyzer.md](tech-bundle-analyzer.md) — pełna konfiguracja bundle analyzer

## Next.js Built-in Optimizations

### Automatic Code Splitting

Next.js automatycznie dzieli kod na:

- Route-based chunks — każda route ma osobny chunk
- Shared chunks — wspólne moduły w osobnych chunkach

**Dokumentacja:** [Next.js Automatic Code Splitting](https://nextjs.org/docs/app/building-your-application/optimizing)

### Tree Shaking

Automatyczne usuwanie nieużywanego kodu podczas build:

- ES modules są tree-shakeable
- Named exports są preferowane
- Default exports mogą ograniczać tree shaking

### Server Components

App Router używa Server Components domyślnie:

- Redukcja client-side JavaScript
- Lepsze performance przez renderowanie na serwerze
- Streaming support

**Szczegóły:** [../7-architecture/tech-nextjs.md](../7-architecture/tech-nextjs.md#server-components) — Server Components patterns

### Static Generation

Next.js automatycznie generuje statyczne strony gdy to możliwe:

- SSG (Static Site Generation) dla statycznych content
- ISR (Incremental Static Regeneration) dla dynamic content

## Priority Guide

**Must Have (Krytyczne):**

- Image optimization (AVIF/WebP)
- Code splitting (automatyczne)
- Compression (gzip)
- Bundle size monitoring

**Should Have (Ważne):**

- Font optimization
- CSS optimization
- Caching strategies
- Performance monitoring

**Nice to Have (Opcjonalne):**

- Bundle analyzer (development)
- Advanced webpack config
- CDN configuration

## Font Optimization

[src/app/layout.tsx](../../../src/app/layout.tsx) linie 4-10

```typescript
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
```

**Funkcjonalność:**

- Font loading przez `@fontsource` packages
- Tylko potrzebne weighty są ładowane
- Font Size standard: < 100KB

**Dependencies:** [package.json](../../../package.json) linie 78-79

**ESLint Rules:**

- `@next/next/google-font-display` — wymusza proper font display
- `@next/next/no-page-custom-font` — zapobiega custom font loading

[eslint.config.mjs](../../../eslint.config.mjs) linie 101-102

## Development Performance

### Turbopack

[package.json](../../../package.json) linia 11

```json
{
  "scripts": {
    "next:dev": "next dev --turbo"
  }
}
```

**Funkcjonalność:**

- ~10x szybszy niż Webpack
- Fast refresh <200ms
- Hot reload optimization

### Incremental TypeScript Compilation

[tsconfig.json](../../../tsconfig.json) — incremental compilation włączone

**Funkcjonalność:**

- Szybsze kompilowanie dzięki cache
- Tylko zmienione pliki są rekompilowane

### ESLint Cache

[package.json](../../../package.json) linia 41

```json
{
  "lint:eslint:check": "eslint ... --cache --cache-strategy content --cache-location .eslintcache/"
}
```

**Funkcjonalność:**

- Cache ESLint results w `.eslintcache/`
- Szybsze linting dla unchanged files

### Prettier Cache

[package.json](../../../package.json) linie 39-40

```json
{
  "lint:prettier:check": "prettier --check --cache",
  "lint:prettier:fix": "prettier --write --cache"
}
```

**Funkcjonalność:**

- Cache Prettier results
- Szybsze formatowanie

## Build Performance

### Build Time Optimization

**Metrics:**

> [!NOTE] Context
> Metryki z testów na lokalnym środowisku (Node 18+, macOS, standardowy laptop). Twoje wyniki mogą się różnić w zależności od sprzętu i środowiska.

- Cold build: ~45s (bez cache)
- Cached build: ~15s (z cache)

**Optimizations:**

- TypeScript conditional config — `tsconfigPath` w next.config.ts (linia 63)
- Build scripts — `build:prebuild`, `build:postbuild` w package.json

### Parallel Scripts

[package.json](../../../package.json) — używa `npm-run-all` dla concurrent tasks

**Funkcjonalność:**

- `run-p` — parallel execution
- `run-s` — sequential execution
- Optymalizacja build workflow

## CSS Optimization

### Tailwind CSS

Automatyczna puryfikacja nieużywanego CSS:

- PurgeCSS via Tailwind
- Minimalny output CSS

### CSSnano

[package.json](../../../package.json) linie 106-107

```json
{
  "cssnano": "^7.0.6",
  "cssnano-preset-advanced": "^7.0.6"
}
```

**Funkcjonalność:**

- Production CSS minification
- Advanced optimizations

### PostCSS Optimization

[package.json](../../../package.json) linie 113-116

**Plugins:**

- `postcss-preset-env` — modern CSS features
- `postcss-discard-comments` — removes comments
- `postcss-import` — CSS imports

## Performance Standards

**Bundle Size Standards** (z [overview.md](overview.md#performance-standards)):

- Initial Bundle Size — < 250KB
- Chunk Size — < 100KB

**Core Web Vitals Standards** (z [overview.md](overview.md#performance-standards)):

- LCP (Largest Contentful Paint) — < 2.5s
- FID (First Input Delay) — < 100ms
- CLS (Cumulative Layout Shift) — < 0.1
- FCP (First Contentful Paint) — < 1.8s

**Asset Standards:**

- Image Size — < 500KB
- Font Size — < 100KB

**Szczegóły:** [overview.md#performance-standards](overview.md#performance-standards) — pełne standardy performance

## Architecture Performance Patterns

### Streaming & Suspense

Next.js App Router wspiera:

- Streaming dla progressive rendering
- Suspense boundaries dla lepszego UX

**Szczegóły:** [../7-architecture/tech-nextjs.md](../7-architecture/tech-nextjs.md) — Next.js App Router patterns

### Automatic Route-based Splitting

Next.js automatycznie dzieli kod per route:

- Każdy route ma osobny chunk
- Shared dependencies w osobnych chunkach

**Szczegóły:** Patrz sekcję [Server Components](#server-components) powyżej — Server Components patterns

## Performance Tooling

### Bundle Analyzer

**Szczegóły:** [tech-bundle-analyzer.md](tech-bundle-analyzer.md) — pełna konfiguracja i użycie

### Code Analysis Tools

- **Knip** — unused code detection (`quality:knip` w package.json)
- **Madge** — coupling analysis (`quality:coupling:graph` w package.json)

**Szczegóły:**

- [../9-code-quality/tech-knip.md](../9-code-quality/tech-knip.md) — Knip setup
- [../9-code-quality/tech-madge.md](../9-code-quality/tech-madge.md) — Madge analysis

## Wystąpienia

- [overview.md](overview.md) — koncepcja performance i filozofia
- [technical.md](technical.md) — ogólna implementacja performance
- [tech-bundle-analyzer.md](tech-bundle-analyzer.md) — bundle size optimization
- [../7-architecture/tech-nextjs.md](../7-architecture/tech-nextjs.md) — Server Components i App Router patterns
- [../9-code-quality/tech-knip.md](../9-code-quality/tech-knip.md) — unused code detection
- [../9-code-quality/tech-madge.md](../9-code-quality/tech-madge.md) — coupling analysis
- [next.config.ts](../../../next.config.ts) — Next.js performance config
- [package.json](../../../package.json) — scripts i dependencies
- [src/app/layout.tsx](../../../src/app/layout.tsx) — font loading
