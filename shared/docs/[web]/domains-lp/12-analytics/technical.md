# Przewodnik techniczny analytics

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

## Analytics Setup Overview

Projekt używa wielodostawcowej architektury analytics z obsługą Google Analytics 4, HotJar i Umami. Wszystkie narzędzia są skonfigurowane w [src/components/Analytics/](../../../src/components/Analytics/) i [src/configs/configAnalytics.ts](../../../src/configs/configAnalytics.ts).

## Provider Integration

Każdy provider analytics jest skonfigurowany jako osobny komponent:

### Google Analytics 4

```typescript
// Ładowanie skryptu GA4
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```

### HotJar

```typescript
// Heatmaps i session recordings
<HotJar hjid={process.env.NEXT_PUBLIC_HOTJAR_ID} />
```

### Umami

```typescript
// Privacy-friendly analytics
<Umami websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} />
```

## Event Tracking

### Standard Events

```typescript
import { trackEvent } from '@/utils/analytics';

// Page views (automatic)
useEffect(() => {
  trackEvent('page_view', { page: router.pathname });
}, [router.pathname]);

// Custom events
trackEvent('button_click', {
  button_name: 'hero_cta',
  page: 'homepage',
});
```

## Environment Variables Setup

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXXXXX
NEXT_PUBLIC_UMAMI_URL=https://analytics.example.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Troubleshooting

### Analytics nie działają

**Sprawdź konfigurację:**

```typescript
// src/configs/configAnalytics.ts
console.log('Analytics config:', configAnalytics);
```

**Sprawdź czy komponenty są załadowane:**

```typescript
// Sprawdź w DevTools Console czy skrypty GA4/HotJar są obecne
console.log('GA4:', window.gtag);
console.log('HotJar:', window.hj);
console.log('Umami:', window.umami);
```

### Wydajność - duże bundle

**Optymalizacja ładowania:**

```typescript
// Lazy loading dla analytics
const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
});
```

### GDPR/Privacy Compliance

**Cookie consent integration:**

```typescript
// Z consent manager
const [consent, setConsent] = useState(false);

useEffect(() => {
  if (consent) {
    // Load analytics after consent
    loadAnalytics();
  }
}, [consent]);
```

## Best Practices

- **Minimal tracking:** Śledź tylko niezbędne eventy
- **Privacy first:** Zawsze pytaj o zgodę przed trackingiem
- **Performance:** Lazy load analytics scripts
- **Testing:** Sprawdzaj czy eventy są wysyłane w development

---

## Wystąpienia

- [overview.md](overview.md) — koncepcja i filozofia analytics
- [tech-google-analytics.md](tech-google-analytics.md) — szczegóły Google Analytics
- [tech-hotjar.md](tech-hotjar.md) — szczegóły HotJar
- [tech-umami.md](tech-umami.md) — szczegóły Umami
- [src/components/Analytics/](../../../src/components/Analytics/) — komponenty analytics
- [src/configs/configAnalytics.ts](../../../src/configs/configAnalytics.ts) — konfiguracja
- [src/utils/analytics.ts](../../../src/utils/analytics.ts) — utility functions
- [../11-performance/](../11-performance/) — kontekst w performance monitoring
