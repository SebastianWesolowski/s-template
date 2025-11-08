# Umami Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

### 1. Basic Integration

```typescript
// src/lib/umami.ts
export const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL;
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const initializeUmami = () => {
  if (typeof window !== 'undefined' && UMAMI_URL && UMAMI_WEBSITE_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${UMAMI_URL}/script.js`;
    script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
    document.head.appendChild(script);
  }
};
```

### 2. Umami Component

```typescript
// src/components/Umami.tsx
import { useEffect } from 'react';
import { initializeUmami } from '@/lib/umami';

export function Umami() {
  useEffect(() => {
    initializeUmami();
  }, []);

  return null;
}
```

### 3. Advanced Configuration

```typescript
// src/lib/umami-advanced.ts
export const configureUmami = () => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    // Configure Umami settings
    (window as any).umami.config = {
      // Website settings
      website: {
        id: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
        domain: window.location.hostname,
      },

      // Tracking settings
      tracking: {
        enabled: true,
        respectDNT: true, // Respect Do Not Track
        ignoreLocalhost: true,
      },

      // Privacy settings
      privacy: {
        anonymizeIP: true,
        hashUserId: true,
        respectGDPR: true,
      },
    };
  }
};
```

## Event Tracking

### 1. Custom Events

```typescript
// src/lib/umami-events.ts
export const trackUmamiEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, properties);
  }
};

// Common events
export const trackPageView = (page: string, title?: string) => {
  trackUmamiEvent('pageview', {
    page: page,
    title: title || document.title,
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackUmamiEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackUmamiEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};
```

### 2. User Identification

```typescript
// src/lib/umami-user.ts
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.identify(userId, properties);
  }
};

export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.setUserProperties(properties);
  }
};
```

## Privacy & GDPR

### 1. Privacy Settings

```typescript
// src/lib/umami-privacy.ts
export const configurePrivacy = () => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    // Configure privacy settings
    (window as any).umami.privacy = {
      // Anonymize IP addresses
      anonymizeIP: true,

      // Hash user IDs
      hashUserId: true,

      // Respect Do Not Track
      respectDNT: true,

      // GDPR compliance
      gdpr: {
        enabled: true,
        consentRequired: true,
        dataRetention: 365, // days
      },
    };
  }
};
```

### 2. Consent Management

```typescript
// src/lib/umami-consent.ts
export const setUmamiConsent = (consent: boolean) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    if (consent) {
      // Enable Umami
      (window as any).umami.consent = 'granted';
    } else {
      // Disable Umami
      (window as any).umami.consent = 'denied';
    }
  }
};

export const checkUmamiConsent = (): boolean => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    return (window as any).umami.consent === 'granted';
  }
  return false;
};
```

## Performance Monitoring

### 1. Core Web Vitals

```typescript
// src/lib/umami-vitals.ts
export const trackWebVitals = (metric: any) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    trackUmamiEvent('web_vital', {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
    });
  }
};

export const trackPageLoad = (loadTime: number) => {
  trackUmamiEvent('page_load', {
    load_time: loadTime,
    page: window.location.pathname,
  });
};
```

### 2. Error Tracking

```typescript
// src/lib/umami-errors.ts
export const trackError = (error: Error, context?: string) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    trackUmamiEvent('error', {
      message: error.message,
      stack: error.stack,
      context: context || 'unknown',
      url: window.location.href,
    });
  }
};

// Global error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    trackError(event.error, 'global_error');
  });
}
```

## Custom Metrics

### 1. Business Metrics

```typescript
// src/lib/umami-metrics.ts
export const trackBusinessMetric = (metricName: string, value: number, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    trackUmamiEvent('business_metric', {
      metric_name: metricName,
      value: value,
      ...properties,
    });
  }
};

// Revenue tracking
export const trackRevenue = (amount: number, currency: string, source: string) => {
  trackBusinessMetric('revenue', amount, {
    currency: currency,
    source: source,
  });
};

// User engagement
export const trackEngagement = (action: string, duration: number) => {
  trackBusinessMetric('engagement', duration, {
    action: action,
  });
};
```

### 2. Custom Dimensions

```typescript
// src/lib/umami-dimensions.ts
export const setCustomDimension = (name: string, value: string) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.setDimension(name, value);
  }
};

export const trackWithDimensions = (eventName: string, properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    // Add custom dimensions
    const dimensions = {
      user_type: properties.userType || 'anonymous',
      subscription: properties.subscription || 'none',
      feature_flag: properties.featureFlag || 'default',
    };

    trackUmamiEvent(eventName, {
      ...properties,
      ...dimensions,
    });
  }
};
```

## Self-Hosted Setup

### 1. Docker Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      DATABASE_TYPE: postgresql
      HASH_SALT: your-hash-salt
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### 2. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_UMAMI_URL=https://analytics.yourdomain.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Umami
- [`technical.md`](technical.md) — ogólna implementacja analytics
- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md) — skrót Umami dla AI
- [`../11-performance/`](../11-performance/) — kontekst w performance monitoring
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`src/lib/umami.ts`](../../../src/lib/umami.ts) — Umami utilities (reference)
- [`package.json`](../../../package.json) — Umami dependencies (reference)
