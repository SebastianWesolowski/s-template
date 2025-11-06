# Przewodnik techniczny wydajności

> [!NOTE] Wystąpienie tematu
> To jest skrót lub odniesienie. Pełne Źródło: [`overview.md`](overview.md)

## Performance Optimization

### 1. Next.js Configuration

```javascript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components', '@/utils'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },

  // Compression
  compress: true,

  // Bundle analyzer
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
```

### 2. Bundle Analysis

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
      openAnalyzer: false,
    }),
  ],
};
```

### 3. Performance Monitoring

```typescript
// src/lib/performance.ts
export class PerformanceMonitor {
  static measurePageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
        };

        console.log('Performance metrics:', metrics);
        this.sendMetrics(metrics);
      });
    }
  }

  static measureCoreWebVitals() {
    if (typeof window !== 'undefined') {
      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  private static sendMetrics(metrics: any) {
    // Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metrics', {
        custom_parameter: metrics,
      });
    }
  }
}
```

## Caching Strategies

### 1. HTTP Caching

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await fetchUsers();

  const response = NextResponse.json(users);

  // Cache for 5 minutes
  response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  response.headers.set('ETag', `"${Date.now()}"`);

  return response;
}
```

### 2. Redis Caching

```typescript
// src/lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export class CacheManager {
  static async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  static async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}
```

### 3. CDN Configuration

```typescript
// src/lib/cdn.ts
export class CDNManager {
  static getImageUrl(path: string, width?: number, height?: number): string {
    const baseUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
    const params = new URLSearchParams();

    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());

    return `${baseUrl}${path}?${params.toString()}`;
  }

  static preloadImage(src: string): void {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  }
}
```

## Monitoring & Alerting

### 1. Performance Monitoring

```typescript
// src/lib/monitoring.ts
export class PerformanceMonitor {
  static trackPageView(url: string) {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
          page_path: url,
        });
      }

      // Custom analytics
      this.sendEvent('page_view', { url });
    }
  }

  static trackError(error: Error, context: string) {
    console.error('Error tracked:', error, context);

    // Send to error tracking service
    this.sendEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  static trackPerformance(metric: string, value: number) {
    // Send performance metric
    console.log('Performance metric:', metric, value);
  }

  private static sendEvent(event: string, data: any) {
    // Send to analytics service
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, data }),
      }).catch(console.error);
    }
  }
}
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja i filozofia performance
- [`tech-performance.md`](tech-performance.md) — szczegóły performance optimization
- [`tech-bundle-analyzer.md`](tech-bundle-analyzer.md) — szczegóły bundle analyzer
- [`../10-testing/`](../10-testing/) — kontekst w testing strategy
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`next.config.ts`](../../../next.config.ts) — Next.js config (reference)
