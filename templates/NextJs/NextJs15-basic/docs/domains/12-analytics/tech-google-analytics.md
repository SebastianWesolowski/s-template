# Google Analytics 4 Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

### 1. Basic Configuration

```typescript
// src/lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

### 2. GA4 Component

```typescript
// src/components/GoogleAnalytics.tsx
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

### 3. Enhanced Ecommerce

```typescript
// src/lib/ecommerce.ts
export const trackPurchase = (transactionId: string, value: number, currency: string, items: any[]) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
};

export const trackAddToCart = (itemId: string, itemName: string, category: string, quantity: number, price: number) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: quantity,
          price: price,
        },
      ],
    });
  }
};

export const trackBeginCheckout = (value: number, currency: string, items: any[]) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};
```

## Custom Events

### 1. Event Tracking

```typescript
// src/lib/events.ts
export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
};

// Common events
export const trackButtonClick = (buttonName: string, location: string) => {
  trackCustomEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackCustomEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackCustomEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};
```

### 2. User Properties

```typescript
// src/lib/user-properties.ts
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      user_properties: properties,
    });
  }
};

export const setUserId = (userId: string) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      user_id: userId,
    });
  }
};
```

## Conversion Tracking

### 1. Goals Setup

```typescript
// src/lib/conversions.ts
export const trackConversion = (conversionId: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency,
    });
  }
};

// Lead generation
export const trackLead = (leadType: string, value?: number) => {
  trackCustomEvent('generate_lead', {
    lead_type: leadType,
    value: value,
  });
};

// Sign up
export const trackSignUp = (method: string) => {
  trackCustomEvent('sign_up', {
    method: method,
  });
};

// Login
export const trackLogin = (method: string) => {
  trackCustomEvent('login', {
    method: method,
  });
};
```

### 2. Enhanced Conversions

```typescript
// src/lib/enhanced-conversions.ts
export const trackEnhancedConversion = (email: string, phone?: string, address?: any) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
      user_data: {
        email_address: email,
        phone_number: phone,
        address: address,
      },
    });
  }
};
```

## Privacy & GDPR

### 1. Consent Mode

```typescript
// src/lib/consent-mode.ts
export const initializeConsentMode = () => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    });
  }
};

export const updateConsent = (analytics: boolean, ads: boolean) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: ads ? 'granted' : 'denied',
    });
  }
};
```

### 2. Data Retention

```typescript
// src/lib/data-retention.ts
export const configureDataRetention = () => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      // Data retention settings
      custom_map: {
        custom_parameter_1: 'user_type',
        custom_parameter_2: 'subscription_status',
      },
      // Anonymize IP
      anonymize_ip: true,
      // Cookie settings
      cookie_flags: 'SameSite=None;Secure',
    });
  }
};
```

## Debugging & Testing

### 1. Debug Mode

```typescript
// src/lib/debug.ts
export const enableDebugMode = () => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      debug_mode: true,
    });
  }
};

export const logEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('GA Event:', eventName, parameters);
  }
};
```

### 2. Testing Events

```typescript
// src/lib/testing.ts
export const testGA4Events = () => {
  if (process.env.NODE_ENV === 'development') {
    // Test page view
    pageview('/test-page');

    // Test custom event
    trackCustomEvent('test_event', {
      test_parameter: 'test_value',
    });

    // Test conversion
    trackConversion('test_conversion_id', 100, 'USD');
  }
};
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja Google Analytics
- [`technical.md`](technical.md) — ogólna implementacja analytics
- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md) — skrót Google Analytics dla AI
- [`../11-performance/`](../11-performance/) — kontekst w performance monitoring
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`src/lib/gtag.ts`](../../../src/lib/gtag.ts) — GA4 utilities (reference)
- [`package.json`](../../../package.json) — GA4 dependencies (reference)
