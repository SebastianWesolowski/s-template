# HotJar Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

### 1. Basic Integration

```typescript
// src/lib/hotjar.ts
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;

export const initializeHotJar = () => {
  if (typeof window !== 'undefined' && HOTJAR_ID) {
    (function (h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }
};
```

### 2. HotJar Component

```typescript
// src/components/HotJar.tsx
import { useEffect } from 'react';
import { initializeHotJar } from '@/lib/hotjar';

export function HotJar() {
  useEffect(() => {
    initializeHotJar();
  }, []);

  return null;
}
```

### 3. Advanced Configuration

```typescript
// src/lib/hotjar-advanced.ts
export const configureHotJar = () => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    // Configure HotJar settings
    (window as any).hj('settings', {
      // Recording settings
      recording: {
        enabled: true,
        maxDuration: 300000, // 5 minutes
        minDuration: 10000, // 10 seconds
      },
      // Heatmap settings
      heatmaps: {
        enabled: true,
        sensitivity: 0.5,
      },
      // Feedback settings
      feedback: {
        enabled: true,
        position: 'bottom-right',
      },
      // Surveys settings
      surveys: {
        enabled: true,
        frequency: 'once_per_session',
      },
    });
  }
};
```

## Heatmaps

### 1. Heatmap Configuration

```typescript
// src/lib/heatmaps.ts
export const configureHeatmaps = () => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    // Configure heatmap settings
    (window as any).hj('heatmaps', {
      // Click heatmaps
      clicks: {
        enabled: true,
        sensitivity: 0.5,
      },
      // Move heatmaps
      moves: {
        enabled: true,
        sensitivity: 0.3,
      },
      // Scroll heatmaps
      scrolls: {
        enabled: true,
        sensitivity: 0.4,
      },
    });
  }
};
```

### 2. Custom Heatmap Events

```typescript
// src/lib/heatmap-events.ts
export const trackHeatmapEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    (window as any).hj('event', eventName, properties);
  }
};

// Common heatmap events
export const trackButtonHover = (buttonId: string, duration: number) => {
  trackHeatmapEvent('button_hover', {
    button_id: buttonId,
    duration: duration,
  });
};

export const trackFormFocus = (formField: string) => {
  trackHeatmapEvent('form_focus', {
    field: formField,
  });
};

export const trackScrollDepth = (depth: number, page: string) => {
  trackHeatmapEvent('scroll_depth', {
    depth: depth,
    page: page,
  });
};
```

## Session Recordings

### 1. Recording Configuration

```typescript
// src/lib/recordings.ts
export const configureRecordings = () => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    // Configure recording settings
    (window as any).hj('recordings', {
      // Recording duration
      maxDuration: 300000, // 5 minutes
      minDuration: 10000, // 10 seconds

      // Recording triggers
      triggers: {
        // Record on specific events
        events: ['click', 'scroll', 'form_submit'],
        // Record on specific pages
        pages: ['/checkout', '/signup', '/pricing'],
      },

      // Privacy settings
      privacy: {
        // Mask sensitive data
        maskText: true,
        maskInputs: true,
        // Exclude specific elements
        excludeSelectors: ['.sensitive-data', '.private-info'],
      },
    });
  }
};
```

### 2. Recording Events

```typescript
// src/lib/recording-events.ts
export const trackRecordingEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    (window as any).hj('event', eventName, properties);
  }
};

// User journey events
export const trackUserJourney = (step: string, page: string) => {
  trackRecordingEvent('user_journey', {
    step: step,
    page: page,
    timestamp: Date.now(),
  });
};

// Error events
export const trackError = (error: string, context: string) => {
  trackRecordingEvent('error', {
    error: error,
    context: context,
    timestamp: Date.now(),
  });
};
```

## Feedback & Surveys

### 1. Feedback Widget

```typescript
// src/lib/feedback.ts
export const configureFeedback = () => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    // Configure feedback widget
    (window as any).hj('feedback', {
      // Widget position
      position: 'bottom-right',

      // Widget settings
      settings: {
        enabled: true,
        autoShow: false,
        showOnPages: ['/checkout', '/signup'],
      },

      // Custom styling
      styling: {
        primaryColor: '#007bff',
        textColor: '#ffffff',
        backgroundColor: '#f8f9fa',
      },
    });
  }
};
```

### 2. Survey Configuration

```typescript
// src/lib/surveys.ts
export const configureSurveys = () => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    // Configure surveys
    (window as any).hj('surveys', {
      // Survey settings
      settings: {
        enabled: true,
        frequency: 'once_per_session',
        showOnPages: ['/thank-you', '/pricing'],
      },

      // Survey questions
      questions: [
        {
          id: 'satisfaction',
          type: 'rating',
          text: 'How satisfied are you with our service?',
          options: [1, 2, 3, 4, 5],
        },
        {
          id: 'improvement',
          type: 'text',
          text: 'What could we improve?',
          required: false,
        },
      ],
    });
  }
};
```

## Privacy & GDPR

### 1. Privacy Settings

```typescript
// src/lib/hotjar-privacy.ts
export const configurePrivacy = () => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    // Configure privacy settings
    (window as any).hj('privacy', {
      // Data masking
      maskText: true,
      maskInputs: true,
      maskImages: false,

      // Exclude elements
      excludeSelectors: ['.sensitive-data', '.private-info', '.credit-card', '.password'],

      // GDPR compliance
      gdpr: {
        enabled: true,
        consentRequired: true,
        dataRetention: 365, // days
      },
    });
  }
};
```

### 2. Consent Management

```typescript
// src/lib/hotjar-consent.ts
export const setHotJarConsent = (consent: boolean) => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    if (consent) {
      // Enable HotJar
      (window as any).hj('consent', 'granted');
    } else {
      // Disable HotJar
      (window as any).hj('consent', 'denied');
    }
  }
};

export const checkHotJarConsent = (): boolean => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    return (window as any).hj('consent') === 'granted';
  }
  return false;
};
```

## Performance Optimization

### 1. Lazy Loading

```typescript
// src/lib/hotjar-lazy.ts
export const lazyLoadHotJar = () => {
  if (typeof window !== 'undefined') {
    // Load HotJar only when needed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initializeHotJar();
          observer.disconnect();
        }
      });
    });

    // Observe a trigger element
    const trigger = document.querySelector('[data-hotjar-trigger]');
    if (trigger) {
      observer.observe(trigger);
    }
  }
};
```

### 2. Conditional Loading

```typescript
// src/lib/hotjar-conditional.ts
export const loadHotJarConditionally = () => {
  if (typeof window !== 'undefined') {
    // Load only on specific pages
    const allowedPages = ['/checkout', '/signup', '/pricing'];
    const currentPage = window.location.pathname;

    if (allowedPages.includes(currentPage)) {
      initializeHotJar();
    }
  }
};
```

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja HotJar
- [`technical.md`](technical.md) — ogólna implementacja analytics
- [`memory-bank/techContext.md`](../../../memory-bank/techContext.md) — skrót HotJar dla AI
- [`../11-performance/`](../11-performance/) — kontekst w performance monitoring
- [`../14-workflow/`](../14-workflow/) — kontekst w development workflow
- [`src/lib/hotjar.ts`](../../../src/lib/hotjar.ts) — HotJar utilities (reference)
- [`package.json`](../../../package.json) — HotJar dependencies (reference)
