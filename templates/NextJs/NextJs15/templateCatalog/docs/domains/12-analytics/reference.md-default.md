# Analytics Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Configuration Files

### Analytics Configuration

**Interface:** [`IAnalyticsConfig`](../../../src/configs/type.ts) linie 37-43

**Implementation:** [`configAnalytics.ts`](../../../src/configs/configAnalytics.ts)

**Environment Variables:**
- `NEXT_PUBLIC_GA_ID` - Google Analytics 4 ID
- `NEXT_PUBLIC_HOTJAR_ID` - HotJar Site ID
- `NEXT_PUBLIC_UMAMI_URL` - Umami instance URL
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` - Umami Website ID

## Component Structure

### Analytics Component

**Location:** [`src/components/Analytics/Analytics.tsx`](../../../src/components/Analytics/Analytics.tsx)

**Purpose:** Main analytics component that loads all tracking scripts

### Provider Components

- **Google Analytics:** [`src/components/Analytics/GoogleAnalytics.tsx`](../../../src/components/Analytics/GoogleAnalytics.tsx)
- **HotJar:** [`src/components/Analytics/HotJar.tsx`](../../../src/components/Analytics/HotJar.tsx)
- **Umami:** [`src/components/Analytics/Umami.tsx`](../../../src/components/Analytics/Umami.tsx)

## Key Functions

### Event Tracking

```typescript
// Google Analytics
logEvent(eventName: string, parameters?: object)

// HotJar
logHotjarEvent(eventName: string, properties?: object)

// Umami
logUmamiEvent(eventName: string, data?: object)
```

### Utility Functions

**Location:** [`src/utils/analytics.ts`](../../../src/utils/analytics.ts)

- `trackPageView()` - Track page views
- `trackEvent()` - Track custom events
- `identifyUser()` - User identification

## Event Types

### Standard Events

- `page_view` - Page view tracking
- `click` - Button/link clicks
- `form_submit` - Form submissions
- `search` - Search interactions
- `share` - Social sharing

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia analytics
- [technical.md](technical.md) — szczegóły implementacji i konfiguracji
- [tech-google-analytics.md](tech-google-analytics.md) — szczegóły Google Analytics
- [tech-hotjar.md](tech-hotjar.md) — szczegóły HotJar
- [tech-umami.md](tech-umami.md) — szczegóły Umami
- [src/components/Analytics/Analytics.tsx](../../../src/components/Analytics/Analytics.tsx) — Analytics component (reference)
- [src/configs/type.ts](../../../src/configs/type.ts) — IAnalyticsConfig interface (reference)
- [src/configs/configAnalytics.ts](../../../src/configs/configAnalytics.ts) — Analytics configuration (reference)
- [../11-performance/](../11-performance/) — kontekst w performance monitoring
- [../14-workflow/](../14-workflow/) — kontekst w development workflow
